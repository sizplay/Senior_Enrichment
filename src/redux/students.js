import axios from 'axios';

const SET_STUDENTS = 'SET_STUDENTS';
const CREATE_STUDENT = 'CREATE_STUDENT';
const UPDATE_STUDENT = 'UPDATE_STUDENT';
const DELETE_STUDENT = 'DELETE_STUDENT';

const studentReducer = (state = [], action) => {
  switch (action.type) {
    case SET_STUDENTS:
      state = action.students;
      break;
    case CREATE_STUDENT:
      state = [...state, action.student];
      break;
    case UPDATE_STUDENT:
      state = state.map(student => action.student.id === student.id ? action.student : student
      );
      break;
    case DELETE_STUDENT:
      state = state.filter(student => student.id !== action.student.id);
      break;
  }
  return state;
}

const fetchStudents = () => {
  return (dispatch) => {
    return axios.get('/api/students')
      .then(result => result.data)
      .then(students => dispatch({
        type: SET_STUDENTS,
        students
      }))
  }
};

const createStudent = (student, history) => {
  return (dispatch) => {
    return axios.post('/api/students', student)
      .then(result => result.data)
      .then(student => dispatch({
        type: CREATE_STUDENT,
        student
      }))
      .then(result => {
        history.push(`/students/${result.student.id}`);
      })
  };
};

const updateStudent = (student, history) => {
  return (dispatch) => {
    return axios.put(`/api/students/${student.id}`, student)
      .then(result => result.data)
      .then(student => dispatch({
        type: UPDATE_STUDENT,
        student
      }))
      .then(result => {
        history.push(`/students/${result.student.id}`);
      });
  };
};

const deleteStudent = (student, history) => {
  return (dispatch) => {
    return axios.delete(`/api/students/${student.id}`)
      .then(() => dispatch({
        type: DELETE_STUDENT,
        student
      }))
      .then(() => {
        history.push('/students');
      })
  }
}

export default studentReducer;

export { fetchStudents, createStudent, deleteStudent, updateStudent };
