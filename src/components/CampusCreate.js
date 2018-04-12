import React from 'react';
import { connect } from 'react-redux';
import { createCampus } from '../redux/campuses';

const chance = require('chance')(123);
const coolimages = require('cool-images');

class CampusCreate extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      errors: {}
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.validators = {
      name: (value) => {
        if (!value) {
          return 'name is required';
        }
      }
    }
  }

  onChange(ev) {
    this.setState({ name: ev.target.value });
  }

  randCampus() {
    return {
      name: this.state.name,
      imageUrl: coolimages.many().pop(),
      description: chance.paragraph()
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

    const campus = this.randCampus();
    if (campus) {
      this.props.createCampus(campus);
    }
  }

  render() {
    const { onChange, onSubmit } = this;
    const { name, errors } = this.state;
    return (
      <div className='container panel panel-default'>
        <h3>Create a Campus</h3>
        <form onSubmit={onSubmit}>
          <input
            className='form-control'
            onChange={onChange}
            value={name}
          />
          <h3 className='text-danger'>{errors.name}</h3>
          <button>Create Campus</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, {history}) => {
  return {
    createCampus: (campus) => dispatch(createCampus(campus, history))
  }
}

export default connect(null, mapDispatchToProps)(CampusCreate);
