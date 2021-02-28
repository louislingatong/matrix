import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {useParams} from 'react-router-dom';
import {Form, Button, Container} from 'react-bootstrap';
import _ from 'lodash';
import Loader from '../../../components/loader/Loader';


function LoginForm({handleSubmitForm, error, isLoading}) {
  const params = useParams();
  const {register, errors, handleSubmit, setError, watch, reset} = useForm();

  useEffect(() => {
    if (!_.isEmpty(error)) {
      setError(error.name, error.value);
    }
  }, [error])

  const onSubmitForm = (data) => {
    reset({
      token: '',
      password: '',
      confirmPassword: ''
    });
    handleSubmitForm(data)
  };

  return (
    <Container>
      <h3>Reset Password</h3>
      <Form>
        <Form.Group controlId="formToken">
          <Form.Label>Token</Form.Label>
          <Form.Control name="token"
                        isInvalid={!!errors.token}
                        ref={
                          register()
                        }
                        value={params.token}
                        readOnly/>
          {
            errors.token &&
            <Form.Text className="text-danger">
              {errors.token.message}
            </Form.Text>
          }
        </Form.Group>
      </Form>
      <Form>
        <Form.Group controlId="formPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control type="password" placeholder="Enter new password"
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
      <Button variant="secondary" onClick={handleSubmit(onSubmitForm)} disabled={isLoading}>
        {isLoading ? <Loader type="beat" color="light"/> : 'Reset' }
      </Button>
    </Container>
  );
}

export default LoginForm;