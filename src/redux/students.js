import axios from 'axios';

const SET_STUDENTS = 'SET_STUDENTS';

export const reducer = (state = [], action) => {
  switch (action.type) {
    case SET_STUDENTS:
      state = action.students;
      break;
  }
  return state
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


export { fetchStudents };
