import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { ReduxField } from '../reduxField';
import * as actions from '../../actions';

class Signin extends Component {
  constructor (props) {
    super(props)

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit({email, password}) {
    this.props.signinUser({ email, password })
  }

  renderAlert() {
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
        {this.renderAlert()} 
        <button action='submit' className='btn btn-primary'>Sign in</button>
      </form>
    )
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

Signin = connect(mapStateToProps, actions)(Signin);

export default reduxForm({
  form: 'signin'
})(Signin);
