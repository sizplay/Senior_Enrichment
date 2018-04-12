import React from 'react';
import { connect } from 'react-redux';
import { createStudent } from '../../redux/students';

const toonAvatar = require('cartoon-avatar');
const chance = require('chance')(123);


class StudentCreate extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      errors: {}
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.validators = {
      firstName: (value) => {
        if (!value) {
          return 'first name is required';
        }
      },
      lastName: (value) => {
        if (!value) {
          return 'last name is required';
        }
      }
    };
  }

  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  randStudent() {
    const photo = () => toonAvatar.generate_avatar();
    const email = () => chance.email();
    const gpa = () => (Math.random() * 4).toString().slice(0, 3);
    return {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      photo: photo(),
      email: email(),
      gpa: gpa()*1,
    };
  }

  onSubmit(ev) {
    ev.preventDefault();

    const errors = Object.keys(this.validators).reduce((result, key) => {
      const validator = this.validators[key];
      const value = this.state[key];
      const error = validator(value);
      if (error) {
        result[key] = error;
      }
      return result;
    }, {});

    this.setState({ errors });
    if (Object.keys(errors).length) {
      return;
    }

    const student = this.randStudent();
    if (student) {
      this.props.createStudent(student);
    }
  }

  render() {
    const { onChange, onSubmit } = this;
    const { firstName, lastName, errors } = this.state;
    return (
      <div className='container panel panel-default'>
        <h3 className='text-center'>Create a Student</h3>
        <form onSubmit={onSubmit}>
          <h4>First Name</h4>
          <input
            className='form-control'
            onChange={onChange}
            name='firstName'
            value={firstName}
          />
          <h3 className='text-danger'>{errors.firstName}</h3>
          <h4>Last Name</h4>
          <input
            className='form-control'
            onChange={onChange}
            name='lastName'
            value={lastName}
          />
          <h3 className='text-danger'>{errors.lastName}</h3>
          <button className='btn btn-primary btn-lg' id='submitBtn'>Create Student</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    createStudent: (student) => dispatch(createStudent(student, history))
  }
}

export default connect(null, mapDispatchToProps)(StudentCreate);
