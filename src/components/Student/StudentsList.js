import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStudent } from '../../store';

const toonAvatar = require('cartoon-avatar');
const chance = require('chance')(123);

const StudentsList = ({ students, createStudent }) => {
  return (
    <div className='container-fluid'>
      <div className='row'>
        <h2 className='page-header'>All Students
          <button onClick={createStudent} className='btn btn-lg btn-primary' id='allStudent_btn'> Add student</button>
        </h2>
      </div>
      <div className='thumbnails'>
        {
          students && students.map(student => {
            if (!student) {
              return null;
            }
            return (
              <div className='row col-sm-2' key={student.id}>
                <div className='span4'>
                  <div className='thumbnail'>
                    <Link to={`/students/${student.id}`}>
                      <img src={student.photo} />
                      <h4 className='text-center'>
                        <span>{student.fullName}</span>
                      </h4>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

const mapStateToProps = ({ students }) => {
  return {
    students
  }
}

const mapDispatchToProps = (dispatch) => {
  const firstName = () => chance.first();
  const lastName = () => chance.last();
  const photo = () => toonAvatar.generate_avatar();
  const email = () => chance.email();
  const gpa = () => (Math.random() * 4).toString().slice(0, 3);
  const campus_id = () => Math.floor((Math.random() * 4) + 1);
  return {
    createStudent: () => {
      return dispatch(createStudent({
        firstName: firstName(),
        lastName: lastName(),
        photo: photo(),
        email: email(),
        gpa: gpa(),
        campus_id: campus_id()
      }))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentsList);

/**import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStudent } from '../../store';

const toonAvatar = require('cartoon-avatar');
const chance = require('chance')(123);

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
    const { students, createStudent } = this.props;
    return (
      <div className='container-fluid'>
        <div className='row'>
          <h2 className='page-header'>All Students
          <button onClick={createStudent} className='btn btn-lg btn-primary' id='allStudent_btn'> Add student</button>
          </h2>
        </div>
        <div className='thumbnails'>
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
      <div className='row col-sm-2' key={student.id}>
        <div className='span4'>
          <div className='thumbnail'>
            <Link to={`/students/${student.id}`}>
              <img src={student.photo} />
              <h4 className='text-center'>
                <span>{student.fullName}</span>
              </h4>
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
  const firstName = () => chance.first();
  const lastName = () => chance.last();
  const photo = () => toonAvatar.generate_avatar();
  const email = () => chance.email();
  const gpa = () => (Math.random() * 4).toString().slice(0, 3);
  const campus_id = () => Math.floor((Math.random() * 4) + 1);
  return {
    createStudent: () => {
      return dispatch(createStudent({
        firstName: firstName(),
        lastName: lastName(),
        photo: photo(),
        email: email(),
        gpa: gpa(),
        campus_id: campus_id()
      }))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentsList);
 */
