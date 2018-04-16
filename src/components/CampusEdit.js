import React from 'react';
import { connect } from 'react-redux';
import { updateStudent } from '../redux/students';
import { updateCampus } from '../redux/campuses'

class CampusEdit extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.campusState(this.props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmitStudent = this.onSubmitStudent.bind(this);

    this.validators = {
      name: (value) => {
        if(!value) {
          return 'name is required';
        }
      },
      imageUrl: (value) => {
        if(!value){
          return 'imageUrl is required';
        }
      },
      description: (value) => {
        if (!value) {
          return 'description is required';
        }
      }
    };
  }

  campusState(props) {
    return {
      name: props.campus ? props.campus.name : '',
      imageUrl: props.campus ? props.campus.imageUrl : '',
      description: props.campus ? props.campus.description : '',
      errors: {}
    }
  }

  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  onSubmit(ev) {
    ev.preventDefault();

    const errors = Object.keys(this.validators).reduce( (result, key) => {
      const validator = this.validators[key];
      const value = this.state[key];
      const error = validator(value);
      if(error){
        result[key] = error;
      }
      return result;
    }, {});

    this.setState( { errors });
    if(Object.keys(errors).length){
      return;
    }

    const campus = {
      id: this.props.id,
      name: this.state.name,
      imageUrl: this.state.imageUrl,
      description: this.state.description
    }
    if (campus) {
      this.props.updateCampus(campus)
    }
  }

  onSubmitStudent(ev) {
    ev.preventDefault();
    const student = { campus_id: this.props.id, id: this.state.studentId*1 };
    if (student) {
      this.props.updateStudent(student);
    }
  }

  onDeleteStudent(ev, id) {
    ev.preventDefault();
    const student = { campus_id: '', id: id };
    if (student) {
      this.props.updateStudent(student);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.campusState(nextProps));
  }

  render() {
    const { campus, students, filteredStudents } = this.props;
    const { name, imageUrl, description, errors } = this.state;
    const { onChange, onSubmit } = this;

    return (
      <div className='container'>
        <div className='panel panel-default'>
          <form className='form-group' onSubmit={onSubmit}>
            <h3>Campus Name</h3>
            <input
              name='name'
              className='form-control'
              onChange={onChange}
              value={name}
            />
            <h3 className='text-danger'>{errors.name}</h3>
            <h3>Campus Image Url</h3>
            <input
              name='imageUrl'
              className='form-control'
              onChange={onChange}
              value={imageUrl}
            />
            <h3 className='text-danger'>{errors.imageUrl}</h3>
            <h3>Campus Description</h3>
            <textarea
              name='description'
              className='form-control'
              onChange={onChange}
              value={description}
              rows='7'
            />
            <h3 className='text-danger'>{errors.description}</h3>
            <button id='submitBtn' className='btn btn-primary btn-lg'>Save Change</button>
          </form>
        </div>
        <div className='panel panel-default col-sm-12'>
          {this.renderSelect(students, campus)}
          <div className='d-flex flex-row'>
            {this.renderStudent(filteredStudents)}
          </div>
        </div>
      </div>
    );
  }

  renderSelect(students, campus) {
    if (campus) {
      const otherStudents = students.filter(student => student.campus_id !== campus.id);

      if (!otherStudents) {
        return (
          <h4>no more students</h4>
        );
      }
      return (
        <div className='col-sm-12'>
          <h3 className='text-center'>Students on Campus</h3>
          <select className='form-control' name='studentId' onChange={this.onChange}>
            <option>--choose--</option>
            {
              otherStudents.map(student => {
                return (
                  <option value={student.id} key={student.id}>{student.fullName}</option>
                );
              })
            }
          </select>
          <button className='btn btn-primary btn-lg' onClick={this.onSubmitStudent}>Add to Campus</button>
        </div>
      );
    }
  }

  renderStudent(filteredStudents) {
    if (!filteredStudents) {
      return (
        <h4>there are no students currently registered to this campus.</h4>
      );
    }
    return (
      filteredStudents.map(student => {
        return (
          <div className='p-2 col-sm-3' key={student.id}>
            <div className='panel panel-default'>
                <img id='studentsImg' src={student.photo} />
                <h4 className='text-center'>
                  <span>{student.fullName}</span>
                </h4>
              <button className='btn btn-danger' id='submitBtn' onClick={ ()=> this.onDeleteStudent(student.id) }>delete</button>
            </div>
          </div>
        );
      })
    );
  }

}


const mapStateToProps = ({ campuses, students }, { id }) => {
  const campus = campuses.find(campus => campus.id === id);
  const filteredStudents = students.filter(student => student.campus_id === id);
  return {
    campus,
    students,
    filteredStudents
  }
}

const mapDispatchToProps = (dispatch, { history, id }) => {
  return {
    updateCampus: (campus) => dispatch(updateCampus(campus, history, id)),
    updateStudent: (student) => dispatch(updateStudent(student))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CampusEdit);

