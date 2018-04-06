import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class StudentsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      gpa: '',
      photo: '',
    }
    this.renderStudent = this.renderStudent.bind(this);
  }

  render() {
    const { students } = this.props;
    return (
      <div className="container">
        <div className="user-query">
          All Students
        </div>
        <br />
        <br />
        <div className="user-list">
          {
            students && students.map(student => {
              return this.renderStudent(student)
            })
          }
        </div>
      </div>
    );
  }

  renderStudent(student) {
    if (!student) {
      return null;
    }
    return (
      <div key={student.id}>
        <div className='list-group-item min-content user-item'>
          <div className='media'>
            <div className='media-left media-middle icon-container'>
              <img className='media-object img-circle' src={student.photo} />
            </div>
            <Link className='media-body' to={`/students/${student.id}`}>
              <h4 className='media-heading tucked'>
                <span>{student.firstName} </span>
                <span>{student.lastName}</span>
              </h4>
              <h5 className='tucked'>
                <span>{student.email}</span>
              </h5>
            </Link>
          </div>
        </div>
      </div>
    );
  }

}

const mapStateToProps = ({ students }) => {
  return {
    students
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentsList);
