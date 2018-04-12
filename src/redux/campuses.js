import axios from 'axios';

const SET_CAMPUSES = 'SET_CAMPUSES';
const CREATE_CAMPUS = 'CREATE_CAMPUS';
const DELETE_CAMPUS = 'DELETE_CAMPUS';
const UPDATE_CAMPUS = 'UPDATE_CAMPUS';

const campusReducer = (state = [], action) => {
  switch (action.type) {
    case SET_CAMPUSES:
      state = action.campuses;
      break;
    case CREATE_CAMPUS:
      state = [...state, action.campus];
      break;
    case DELETE_CAMPUS:
      state = state.filter(campus => campus.id !== action.campus.id);
      break;
    case UPDATE_CAMPUS:
      state = state.map(campus => action.campus.id === campus.id ? action.campus : campus);
      break;
  }
  return state;
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

const createCampus = (campus, history) => {
  return (dispatch) => {
    return axios.post('/api/campuses', campus)
      .then(result => result.data)
      .then(campus => dispatch({
        type: CREATE_CAMPUS,
        campus
      }))
      .then(result => {
        history.push(`/campuses/${result.campus.id}`);
      })
  };
};

const deleteCampus = (campus, history) => {
  return (dispatch) => {
    return axios.delete(`/api/campuses/${campus.id}`)
      .then(() => dispatch({
        type: DELETE_CAMPUS,
        campus
      }))
      .then(() => {
        history.push('/campuses');
      })
  }
}

const updateCampus = (campus, history, id) => {
  return (dispatch) => {
    return axios.put(`/api/campuses/${campus.id}`, campus)
      .then(result => result.data)
      .then(campus => dispatch({
        type: UPDATE_CAMPUS,
        campus
      }))
      .then(() => {
        history.push(`/campuses/${id}`);
      })
  }
}

export default campusReducer;

export { fetchCampuses, createCampus, deleteCampus, updateCampus };
