import React from 'react';
import { connect } from 'react-redux';
import { updateStudent, deleteStudent } from '../../store';

class Student extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: this.props.student ? this.props.student.firstName : '',
      lastName: this.props.student ? this.props.student.lastName : '',
      email: this.props.student ? this.props.student.email : '',
      gpa: this.props.student ? this.props.student.gpa : '',
      campus_id: this.props.student ? this.props.student.campus_id : '',
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  onDelete(ev) {
    this.props.deleteStudent({ id: this.props.id});
  }

  onSubmit(ev) {
    ev.preventDefault();
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
    this.setState({
      firstName: nextProps.student ? nextProps.student.firstName : '',
      lastName: nextProps.student ? nextProps.student.lastName : '',
      email: nextProps.student ? nextProps.student.email : '',
      gpa: nextProps.student ? nextProps.student.gpa : '',
      campus_id: nextProps.student ? nextProps.student.campus_id : '',
    });
  }

  render() {
    const { student, campus, campuses } = this.props;
    const { onChange, onSubmit, onDelete } = this;
    const { firstName, lastName, gpa, email } = this.state;

    const renderCampus = (student, campuses) => {
      const campus = campuses.find(campus => campus.id === student.campus_id);
      if (!campus) {
        return null;
      }
      return (
        <div className='panel panel-default'>
          <div className='media'>
            <h4>{campus.imageUrl}</h4>
          </div>
          <h4>{campus.name} campus</h4>

        </div>
      );
    }

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
          <div className='col-sm-7 ho' id='studentFullName'>
            <h1 className='text-center'>{student.fullName}</h1>
            <form className='form-group' onSubmit={onSubmit}>
              <h4>First Name</h4>
              <input
                name='firstName'
                className='form-control'
                onChange={onChange}
                value={firstName}
              />
              <h4>Last Name</h4>
              <input
                name='lastName'
                className='form-control'
                onChange={onChange}
                value={lastName}
              />
              <h4>Email</h4>
              <input
                name='email'
                className='form-control'
                onChange={onChange}
                value={email}
              />
              <h4>GPA</h4>
              <input
                name='gpa'
                className='form-control'
                onChange={onChange}
                value={gpa}
              />
              <button className='btn btn-primary btn-lg' id='submitBtn'>Update</button>
              <button className='btn btn-danger btn-lg' id='submitBtn' onClick={onDelete}>Delete</button>
            </form>
          </div>
        </div>
        <div>
          <h3>{student.fullName} is registered to a campus</h3>
        </div>
        <div className='row'>
          <div className='col-sm-4'>
          <br />
          <br />
            {renderCampus(student, campuses)}
          </div>
        </div>
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
    updateStudent: (student) => dispatch(updateStudent(student)),
    deleteStudent: (student) => dispatch(deleteStudent(student, history))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Student);
