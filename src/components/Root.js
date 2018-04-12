import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { fetchStudents } from '../redux/students';
import { fetchCampuses } from '../redux/campuses';

import Nav from './Nav';
import Home from './Home';

import Students from './Student/Students';
import Student from './Student/Student';
import StudentCreate from './Student/StudentCreate';
import StudentEdit from './Student/StudentEdit';

import Campuses from './Campuses';
import CampusCreate from './CampusCreate';
import Campus from './Campus';
import CampusEdit from './CampusEdit';

class Root extends Component {


  componentDidMount() {
    this.props.fetchStudents();
    this.props.fetchCampuses();
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Nav />
            <Route exact path='/' component={Home} />
            <Route exact path='/students' component={Students} />
            <Route path='/students/create' render={({ history }) => <StudentCreate history={history} />} />
            <Route exact path='/students/:id/edit' render={({ match, history }) => <StudentEdit id={match.params.id * 1} history={history} />} />
            <Route exact path='/students/:id' render={({ match, history }) => <Student id={match.params.id * 1} history={history} />} />

            <Route exact path='/campuses' component={Campuses} />
            <Switch>
              <Route path='/campuses/create' render={({ history }) => <CampusCreate history={history} />} />
              <Route path='/campuses/:id/edit' render={({ match, history }) => <CampusEdit id={match.params.id * 1} history={history} />} />
              <Route path='/campuses/:id' render={({ match, history }) => <Campus id={match.params.id * 1} history={history} />} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStudents: () => dispatch(fetchStudents()),
    fetchCampuses: () => dispatch(fetchCampuses())
  }
}

export default connect(null, mapDispatchToProps)(Root);

