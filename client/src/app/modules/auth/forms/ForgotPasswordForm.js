import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {Form, Button, Container} from 'react-bootstrap';
import {useSelector} from 'react-redux';
import _ from 'lodash';
import {loaderStatus} from '../../../store/loaderSlice';
import Loader from '../../../components/common/loader/Loader';

function ForgotPasswordForm({handleSubmitForm, error}) {
  const isLoading = useSelector(loaderStatus);
  const {register, errors, handleSubmit, setValue, setError} = useForm();

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
      <h3>Forgot Password</h3>
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
      <Button variant="secondary" onClick={handleSubmit(onSubmitForm)} disabled={isLoading}>Send</Button>
    </Container>
  );
}

export default ForgotPasswordForm;