import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateStudent } from '../redux/students';
import { deleteCampus } from '../redux/campuses';

class Campus extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.campusState(this.props);
    this.onDelete = this.onDelete.bind(this);
  }

  campusState(props) {
    return {
      name: props.campus ? props.campus.name : '',
      imageUrl: props.campus ? props.campus.imageUrl : '',
      description: props.campus ? props.campus.description : '',
    }
  }

  onDelete() {
    this.props.deleteCampus({ id: this.props.id })
  }


  componentWillReceiveProps(nextProps) {
    this.setState(this.campusState(nextProps));
  }

  render() {
    const { campus, filteredStudents } = this.props;
    const { onDelete } = this;

    if(!campus) {
      return null;
    }
    return (
      <div className='panel panel-default container'>
        <div className='col-sm-6'>
          <img src={ campus.imageUrl } />
        </div>
        <div className='col-sm-6'>
          <h3>{campus.name} Campus</h3>
          <h5>{campus.description}</h5>
        </div>
        <button className='btn btn-primary btn-lg' id='submitBtn'>
          <Link id='link' to={`/campuses/${campus.id}/edit`}>Edit campus</Link>
        </button>
        <button className='btn btn-danger btn-lg' id='submitBtn' onClick={onDelete}>Delete campus</button>
        <br />
        <br />
        <div className='d-flex flex-row col-md-12'>
          {
            !filteredStudents.length ? this.noStudent() : this.student()
          }
          {this.studentsRender(filteredStudents)}
        </div>
      </div>
    );
  }

  noStudent() {
    return (
      <div className='col-lg-12'>
        <h2>No student is in this campus</h2>
      </div>
    );
  }

  student() {
    return (
      <div className='col-lg-12'>
        <h2>Students are in this campus</h2>
      </div>
    );
  }

  studentsRender(filteredStudents) {
    if (!filteredStudents) {
      return null;
    }
    return (
      filteredStudents.map(student => {
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
    );
  }

}

const mapStateToProps = ({ campuses, students }, { id }) => {
  const campus = campuses.find( campus => campus.id === id);
  const filteredStudents = students.filter( student => student.campus_id === id);
  return {
    campus,
    filteredStudents
  }
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    updateStudent: (student) => dispatch(updateStudent(student)),
    deleteCampus: (campus) => dispatch(deleteCampus(campus, history))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Campus);
