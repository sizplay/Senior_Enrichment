import { createStore, applyMiddleware, combineReducers } from 'redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';

//import rootReducer from './redux';

const SET_STUDENTS = 'SET_STUDENTS';
const CREATE_STUDENT = 'CREATE_STUDENT';
const UPDATE_STUDENT = 'UPDATE_STUDENT';
const DELETE_STUDENT = 'DELETE_STUDENT';

const SET_CAMPUSES = 'SET_CAMPUSES';

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

const campusReducer = (state = [], action) => {
  switch (action.type) {
    case SET_CAMPUSES:
      state = action.campuses;
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

const createStudent = (student) => {
  return (dispatch) => {
    return axios.post('/api/students', student)
      .then(result => result.data)
      .then(student => dispatch({
        type: CREATE_STUDENT,
        student
      }))
  };
};

const updateStudent = (student) => {
  return (dispatch) => {
    return axios.put(`/api/students/${student.id}`, student)
      .then(result => result.data)
      .then(student => dispatch({
        type: UPDATE_STUDENT,
        student
      }))
  }
}

const deleteStudent = (student, history) => {
  return (dispatch) => {
    return axios.delete(`/api/students/${student.id}`)
      .then( () => dispatch({
        type: DELETE_STUDENT,
        student
      }))
      .then( ()=> {
        history.push('/students');
      })
  }
}

const fetchCampuses = () => {
  return (dispatch) => {
    return axios.get('/api/campuses')
      .then(result => result.data)
      .then(campuses => dispatch({
        type: SET_CAMPUSES,
        campuses
      }))
  }
}

const reducer = combineReducers({
  students: studentReducer,
  campuses: campusReducer
});

const store = createStore(reducer, applyMiddleware(thunkMiddleware, loggerMiddleware));


export default store;

export { fetchStudents, fetchCampuses, createStudent, updateStudent, deleteStudent };

