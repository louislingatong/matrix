import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {Form, Button, Container} from 'react-bootstrap';
import {useSelector} from 'react-redux';
import _ from 'lodash';
import {loaderStatus} from '../../../store/loaderSlice';
import Loader from '../../../components/common/loader/Loader';

function RegisterForm({handleSubmitForm, error}) {
  const isLoading = useSelector(loaderStatus);
  const {register, errors, handleSubmit, setValue, setError, watch} = useForm();

  useEffect(() => {
    if (!_.isEmpty(error)) {
      setError(error.name, error.value);
    }
  }, [error])

  const handleOnChange = (e) => {
    e.preventDefault();
    const {name, value} = e.target;
    setValue(name, value);
  };

  const onSubmitForm = (data) => {
    handleSubmitForm(data)
  };

  return (
    <Container>
      {isLoading && <Loader type="circular"/>}
      <h3>Register</h3>
      <Form>
        <Form.Group controlId="formCode">
          <Form.Label>Code</Form.Label>
          <Form.Control placeholder="Enter code"
                        name="code"
                        isInvalid={!!errors.code}
                        ref={
                          register()
                        }
                        onChange={handleOnChange}/>
          {
            errors.code &&
            <Form.Text className="text-danger">
              {errors.code.message}
            </Form.Text>
          }
        </Form.Group>
      </Form>
      <Form>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email"
                        name="email"
                        isInvalid={!!errors.email}
                        ref={
                          register({
                            required: 'Email is required.',
                            pattern: {
                              value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                              message: 'Incorrect email format.'
                            }
                          })
                        }
                        onChange={handleOnChange}/>
          {
            errors.email &&
            <Form.Text className="text-danger">
              {errors.email.message}
            </Form.Text>
          }
        </Form.Group>
      </Form>
      <Form>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control placeholder="Enter username"
                        name="username"
                        isInvalid={!!errors.username}
                        ref={
                          register({
                            required: 'Username is required.'
                          })
                        }
                        onChange={handleOnChange}/>
          {
            errors.username &&
            <Form.Text className="text-danger">
              {errors.username.message}
            </Form.Text>
          }
        </Form.Group>
      </Form>
      <Form>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter password"
                        name="password"
                        isInvalid={!!errors.password}
                        ref={
                          register({
                            required: 'Password is required.'
                          })
                        }/>
          {
            errors.password &&
            <Form.Text className="text-danger">
              {errors.password.message}
            </Form.Text>
          }
        </Form.Group>
      </Form>
      <Form>
        <Form.Group controlId="formConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Enter confirm password"
                        name="confirmPassword"
                        isInvalid={!!errors.confirmPassword}
                        ref={
                          register({
                            required: 'Confirm Password is required',
                            validate: (value) => value === watch('password') || 'Passwords don\'t match.'
                          })
                        }/>
          {
            errors.confirmPassword &&
            <Form.Text className="text-danger">
              {errors.confirmPassword.message}
            </Form.Text>
          }
        </Form.Group>
      </Form>
      <Form>
        <Form.Group controlId="formFirsName">
          <Form.Label>First Name</Form.Label>
          <Form.Control placeholder="Enter first name"
                        name="firstName"
                        isInvalid={!!errors.firstName}
                        ref={
                          register({
                            required: 'First Name is required.'
                          })
                        }
                        onChange={handleOnChange}/>
          {
            errors.username &&
            <Form.Text className="text-danger">
              {errors.firstName.message}
            </Form.Text>
          }
        </Form.Group>
      </Form>
      <Form>
        <Form.Group controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control placeholder="Enter last name"
                        name="lastName"
                        isInvalid={!!errors.lastName}
                        ref={
                          register({
                            required: 'Last Name is required.'
                          })
                        }

                        onChange={handleOnChange}/>
          {
            errors.lastName &&
            <Form.Text className="text-danger">
              {errors.lastName.message}
            </Form.Text>
          }
        </Form.Group>
      </Form>
      <Button variant="secondary" onClick={handleSubmit(onSubmitForm)} disabled={isLoading}>Register</Button>
    </Container>
  );
}

export default RegisterForm;