import React, { PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import isEmail from 'validator/lib/isEmail'

const validate = values => {
    const errors = {}
    const requiredFields = ['email', 'password' ]
    requiredFields.forEach(field => {
        if ( ! values[ field ]) {
            errors[ field ] = 'Required'
        }
    })
    if (values.email && ! isEmail(values.email)) {
        errors.email = 'Invalid email address'
    }
    return errors
}

const renderField = field => (
    <div>
        <label>{field.input.label}</label>
        <div>
            <input {...field.input}/>
            {field.touched && field.error && <span>{field.error}</span>}
        </div>
    </div>
)

const LoginForm = props => {
    const { handleSubmit, handleForgotPassword, pristine, reset, submitting } = props
    return (
        <form onSubmit={handleSubmit}>
            {/*
                what the hell. this is the only working solution to disable chrome's autofill as for june of 2016
                idea is to duplicate field names and hide these "fake" fields so chrome will autofill them instead of our real fields
                see: http://stackoverflow.com/a/37549660/1221082
            */}
            <input type='email' name='email' readOnly style={{display: 'none'}} />
            <input type='password' name='password' readOnly style={{display: 'none'}} />
            
            <Field
                name='email'
                id='emailField'
                type='text'
                component={renderField}
                placeholder='Enter Email'
                label='Email'
                />

            <Field
                name='password'
                id='passwordField'
                type='password'
                component={renderField}
                placeholder='Enter Password'
                label='Password'
                />

            <div>
                <button type='button' onClick={handleForgotPassword}>Я пароль забыл</button>
                <button type='submit' disabled={pristine || submitting}>Submit</button>
                <button type='button' disabled={pristine || submitting} onClick={reset}>Clear Values</button>
            </div>
        </form>
    )
}

LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired
}

export default reduxForm({
    form: 'LoginForm',
    validate
})(LoginForm)
