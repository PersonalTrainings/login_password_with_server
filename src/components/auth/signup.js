import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm} from 'redux-form';
import { ReduxField } from '../reduxField';
import * as actions from '../../actions';

class Signup extends Component {
  constructor(props) {
    super(props)

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit (formProps) {
    // Call action creator to sign up ther user!
    this.props.signupUser(formProps);
  }

  renderAlert () {
    if (this.props.errorMessage) {
      return (
        <div className='alert alert-danger'>
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      )
    }
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        <ReduxField
          name='email'
          type='email'
          label='Email'
        />
        <ReduxField
          name='password'
          type='password'
          label='Password'
        />
        <ReduxField
          name='passwordConfirm'
          type='password'
          label='Password Confirm'
        />
        {this.renderAlert()}
        <button action='submit' className='btn btn-primary'>Sign up</button>
      </form>
    )
  }
}

function validate(formProps) {
  const errors = {};
  const fields = ['email', 'password', 'passwordConfirm'];

  fields.forEach(field => {
    if (!formProps[field]) {
      errors[field] = `Please enter an ${field}`
    }
  });
 
  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match';
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

Signup = connect(mapStateToProps, actions)(Signup);

export default reduxForm({
  form: 'signup',
  validate
})(Signup);
