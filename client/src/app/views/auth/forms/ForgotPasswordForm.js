import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {Form, Button, Container} from 'react-bootstrap';
import _ from 'lodash';
import Loader from '../../../components/loader/Loader';

function ForgotPasswordForm({handleSubmitForm, error, isLoading}) {
  const {register, errors, handleSubmit, setError, reset} = useForm();

  useEffect(() => {
    if (!_.isEmpty(error)) {
      setError(error.name, error.value);
    }
  }, [error])

  const onSubmitForm = (data) => {
    reset({
      email: ''
    });
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
                        }/>
          {
            errors.email &&
            <Form.Text className="text-danger">
              {errors.email.message}
            </Form.Text>
          }
        </Form.Group>
      </Form>
      <Button variant="secondary" onClick={handleSubmit(onSubmitForm)} disabled={isLoading}>
        {isLoading ? <Loader type="beat" color="light"/> : 'Send' }
      </Button>
    </Container>
  );
}

export default ForgotPasswordForm;