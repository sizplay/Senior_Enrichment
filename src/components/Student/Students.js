import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Students = ({ students }) => {
  if(!students.length) {
    return (
      <div>
      <p>there is no student, please add student</p>
        <button className='btn btn-primary btn-lg' id='submitBtn'><Link id='link' to='/students/create'>Add student</Link></button>
      </div>
    );
  }
  return (
    <div className='container'>
      <h2 className='page-header'>All Students
        <button className='btn btn-primary btn-lg' id='submitBtn'><Link id='link' to='/students/create'>Add student</Link></button>
      </h2>
      <div className='d-flex flex-row'>
        {
          students.map(student => {
            if (!student) {
              return null;
            }
            return (
              <div className='p-2 col-sm-3' key={student.id}>
                <div className='panel panel-default'>
                  <Link to={`/students/${student.id}`}>
                    <img id='studentsImg' src={student.photo} />
                    <h4 className='text-center'>
                      <span>{student.fullName}</span>
                    </h4>
                  </Link>
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

export default connect(mapStateToProps)(Students);
