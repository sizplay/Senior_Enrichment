import { createStore, applyMiddleware, combineReducers } from 'redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import axios from 'axios';

//import rootReducer from './redux';

const SET_STUDENTS = 'SET_STUDENTS';
const SET_CAMPUSES = 'SET_CAMPUSES'

const studentReducer = (state = [], action) => {
  switch (action.type) {
    case SET_STUDENTS:
      state = action.students;
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

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunkMiddleware, loggerMiddleware)));


export default store;

export { fetchStudents, fetchCampuses };

