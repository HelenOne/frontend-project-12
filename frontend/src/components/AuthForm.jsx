import { Formik, Form, Field, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';

const AuthForm = ({ initialValues, validationSchema, onSubmit, title, buttonText, fields, footer }) => (
  <div className="login-wrapper">
    <div className="login-form-box">
      <h2 className="login-title">{title}</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors }) => (
          <Form className="login-form">
            {fields.map(({ name, label, type = 'text', placeholder }) => (
              <React.Fragment key={name}>
                <label className="login-label" htmlFor={name}>{label}</label>
                  <Field
                    className="login-input"
                    id={name}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                  />
                  <ErrorMessage name={name} component="div" className="login-error" />
              </React.Fragment>
            ))}
            <button type="submit" className="login-button">{buttonText}</button>
          </Form>
        )}
      </Formik>
      {footer}
    </div>
  </div>
);

AuthForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  validationSchema: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string,
  })).isRequired,
  footer: PropTypes.node,
};

export default AuthForm;
