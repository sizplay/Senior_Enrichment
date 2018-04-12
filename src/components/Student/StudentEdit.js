import React from 'react';
import { connect } from 'react-redux';
import { updateStudent, deleteStudent } from '../../redux/students';

class StudentEdit extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.studentState(this.props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onSubmitCampus = this.onSubmitCampus.bind(this);

    this.validators = {
      firstName: (value) => {
        if (!value) {
          return 'first name is required';
        }
      },
      lastName: (value) => {
        if (!value) {
          return 'last name is required';
        }
      },
      email: (value) => {
        if (!value) {
          return 'email is required';
        }
      },
      gpa: (value) => {
        if (!value) {
          return 'gpa is required';
        }
      }
    };
  }

  studentState(props) {
    return {
      firstName: props.student ? props.student.firstName : '',
      lastName: props.student ? props.student.lastName : '',
      email: props.student ? props.student.email : '',
      gpa: props.student ? props.student.gpa * 1 : '',
      campus_id: props.student ? props.student.campus_id : '',
      errors: {}
    }
  }

  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  onDelete() {
    this.props.deleteStudent({ id: this.props.id });
  }

  onSubmitCampus(ev) {
    ev.preventDefault();
    const student = { campus_id: this.state.campus_id * 1, id: this.props.id };
    if (student) {
      this.props.updateStudent(student);
    }
  }

  onSubmit(ev) {
    ev.preventDefault();

    const errors = Object.keys(this.validators).reduce((result, key) => {
      const validator = this.validators[key];
      const value = this.state[key];
      const error = validator(value);
      if (error) {
        result[key] = error;
      }
      return result;
    }, {});

    this.setState({ errors });
    if (Object.keys(errors).length) {
      return;
    }


    const student = {
      id: this.props.id,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      gpa: this.state.gpa
    }
    if (student) {
      this.props.updateStudent(student);
    }
  }

  //after refresh input field, data still be there.!!!
  componentWillReceiveProps(nextProps) {
    this.setState(this.studentState(nextProps));
  }

  render() {
    const { student, campuses } = this.props;

    /* Main render() */
    if (!student) {
      return null;
    }
    return (
      <div className='container'>
        <div className='page-header'>
          <h2>Student</h2>
        </div>
        <div className='row'>
          <div className='col-sm-5'>
            <img id='studentImg' src={student.photo} />
          </div>
          {this.renderForm(student)}
        </div>
        <div className='row'>
          <div className='col-sm-5'>
            <br />
            <br />
            {this.renderCampus(student, campuses)}
          </div>
          <div className='col-sm-7'>
            {this.renderCampuses(campuses)}
          </div>
        </div>
      </div>
    );
  }

  renderForm(student) {
    return (
      <div className='col-sm-7 ho' id='studentFullName'>
        <h1 className='text-center'>{student.fullName}</h1>
        <form className='form-group' onSubmit={this.onSubmit}>
          <h4>First Name</h4>
          <input
            name='firstName'
            className='form-control'
            onChange={this.onChange}
            value={this.state.firstName}
          />
          <h3 className='text-danger'>{this.state.errors.firstName}</h3>
          <h4>Last Name</h4>
          <input
            name='lastName'
            className='form-control'
            onChange={this.onChange}
            value={this.state.lastName}
          />
          <h3 className='text-danger'>{this.state.errors.lastName}</h3>
          <h4>Email</h4>
          <input
            name='email'
            className='form-control'
            onChange={this.onChange}
            value={this.state.email}
          />
          <h3 className='text-danger'>{this.state.errors.email}</h3>
          <h4>GPA</h4>
          <input
            name='gpa'
            className='form-control'
            onChange={this.onChange}
            value={this.state.gpa}
          />
          <h3 className='text-danger'>{this.state.errors.gpa}</h3>
          <button className='btn btn-primary btn-lg' id='submitBtn'>Update</button>
          <button className='btn btn-danger btn-lg' id='submitBtn' onClick={this.onDelete}>Delete</button>
        </form>
      </div>
    );
  }

  renderCampus(student, campuses) {
    const campus = campuses.find(campus => campus.id === student.campus_id);
    if (!campus) {
      return (
        <div>
          <h2>the student has no campus. <br />
            Please register a campus</h2>
        </div>
      );
    }
    return (
      <div>
        <h3>{student.fullName} is registered to <br /> {campus.name} campus</h3>
        <div className='media'>
          <img className='mr-3' src={campus.imageUrl} id='campusImg' />
        </div>
      </div>
    );
  }

  renderCampuses(campuses) {
    if (!campuses) {
      return (
        <div>
          <h4>there is no campus</h4>
        </div>
      );
    }
    return (
      <div className='panel panel-default'>
        <select className='form-control' name='campus_id' onChange={this.onChange}>
          <option>--choose--</option>
          {
            campuses.map(campus => {
              return (
                <option value={campus.id} key={campus.id}>{campus.name}</option>
              );
            })
          }
        </select>
        <button className='btn btn-primary btn-lg' id='submitBtn' onClick={this.onSubmitCampus}>Change Campus</button>
      </div>
    );
  }
}

const mapStateToProps = ({ students, campuses }, { id }) => {
  const student = students.find(student => student.id === id);
  return {
    student,
    campuses
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    updateStudent: (student) => dispatch(updateStudent(student, history)),
    deleteStudent: (student) => dispatch(deleteStudent(student, history))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentEdit);
