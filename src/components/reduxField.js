import React from 'react';
import { Field } from 'redux-form';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <fieldset className='form-group'>
    <label className={`text${touched && error ? '-danger' : ''} login-password-title`}>{label}:</label>
    <input {...input} type={type} className='form-control' />
    {touched && error && <div className='text-danger error-message'>{error}</div>}
  </fieldset>
);

export const ReduxField = props => {
  return (
    <Field
      name={props.name}
      component={renderField}
      type={props.type}
      label={props.label}
    />
  )
};