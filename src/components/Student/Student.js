import React from 'react';
import { connect } from 'react-redux';
import { updateStudent, deleteStudent } from '../../redux/students';
import { Link } from 'react-router-dom';

class Student extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.studentState(this.props);
    this.onChange = this.onChange.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onSubmitCampus = this.onSubmitCampus.bind(this);
  }

  studentState(props) {
    return {
      firstName: props.student ? props.student.firstName : '',
      lastName: props.student ? props.student.lastName : '',
      email: props.student ? props.student.email : '',
      gpa: props.student ? props.student.gpa*1 : '',
      campus_id: props.student ? props.student.campus_id : '',
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
          <h4>First Name</h4>
          <h4>{student.firstName}</h4>
          <h4>Last Name</h4>
          <h4>{student.lastName}</h4>
          <h4>Email</h4>
          <h4>{student.email}</h4>
          <h4>GPA</h4>
          <h4>{student.gpa}</h4>
          <button className='btn btn-primary btn-lg' id='submitBtn'><Link id='Link' to={`/students/${student.id}/edit`}>Update</Link></button>
          <button className='btn btn-danger btn-lg' id='submitBtn' onClick={this.onDelete}>Delete</button>
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
    updateStudent: (student) => dispatch(updateStudent(student)),
    deleteStudent: (student) => dispatch(deleteStudent(student, history)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Student);
