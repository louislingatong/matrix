import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {Form, Button, Container} from 'react-bootstrap';
import _ from 'lodash';
import Loader from '../../../components/loader/Loader';

function ProfileForm({handleSubmitForm, error, isLoading, profile}) {
  const {register, errors, handleSubmit, setError, reset} = useForm();
  const [mode, setMode] = useState('view');

  useEffect(() => {
    if (!_.isEmpty(error)) {
      setError(error.name, error.value);
    }
  }, [error])

  const onSubmitForm = (data) => {
    reset({
      code: '',
      email: '',
      username: '',
      firstName: '',
      lastName: '',
    });
    handleSubmitForm(data)
  };

  return (
    <Container>
      <Form>
        <Form.Group controlId="formCode">
          <Form.Label>Code</Form.Label>
          <Form.Control name="code"
                        isInvalid={!!errors.code}
                        ref={
                          register()
                        }
                        defaultValue={profile.code}
                        readOnly={
                          (mode === 'view')
                        }/>
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
          <Form.Control type="email"
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
                        defaultValue={profile.email}
                        readOnly={
                          mode === 'view'
                        }/>
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
          <Form.Control name="username"
                        isInvalid={!!errors.username}
                        ref={
                          register({
                            required: 'Username is required.'
                          })
                        }
                        defaultValue={profile.username}
                        readOnly={
                          mode === 'view'
                        }/>
          {
            errors.username &&
            <Form.Text className="text-danger">
              {errors.username.message}
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
                        defaultValue={profile.profile.firstName}
                        readOnly={
                          mode === 'view'
                        }/>
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
                        defaultValue={profile.profile.lastName}
                        readOnly={
                          mode === 'view'
                        }/>
          {
            errors.lastName &&
            <Form.Text className="text-danger">
              {errors.lastName.message}
            </Form.Text>
          }
        </Form.Group>
      </Form>
      {
        mode === 'update' &&
        <Button variant="secondary" onClick={handleSubmit(onSubmitForm)} disabled={isLoading}>
          {isLoading ? <Loader type="beat" color="light"/> : 'Register' }
        </Button>
      }
    </Container>
  );
}

export default ProfileForm;