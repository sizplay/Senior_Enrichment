import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';
import { fetchCampuses, fetchStudents } from '../store';

import Nav from './Nav';
import StudentsList from './Student/StudentsList';
import Student from './Student/Student';

class Home extends Component {
  componentDidMount() {
    this.props.fetchStudents();
    this.props.fetchCampuses();
  }

  render() {
    return (
      <div className='container-fluid'>
        <Router>
          <div>
            <Nav />
            <Route exact path='/students' render={({ history }) => <StudentsList history ={history} />} />
            <Route exact path='/students/:id' render={({ match, history }) => <Student id={match.params.id*1} history={history} />} />
          </div>
        </Router>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch)=> {
    return {
      fetchStudents: () => dispatch(fetchStudents()),
      fetchCampuses: () => dispatch(fetchCampuses())
    }
}

export default connect(null, mapDispatchToProps)(Home);

