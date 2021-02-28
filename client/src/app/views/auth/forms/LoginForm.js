import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {Link, useHistory} from 'react-router-dom';
import {Form, Button, Container, Row, Col} from 'react-bootstrap';
import _ from 'lodash';
import Loader from '../../../components/loader/Loader';

function LoginForm({handleSubmitForm, error, isLoading}) {
  const history = useHistory();
  const {register, errors, handleSubmit, setError, reset} = useForm();

  useEffect(() => {
    if (!_.isEmpty(error)) {
      setError(error.name, error.value);
    }
  }, [error]);

  const handleRedirect = (path) => {
    history.push(path, {from: history.location.pathname})
  };

  const onSubmitForm = (data) => {
    reset({
      username: '',
      password: ''
    });
    handleSubmitForm(data)
  };

  return (
    <Container>
      <h3>Login</h3>
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
      <Row>
        <Col>
          <Button variant="secondary" onClick={handleSubmit(onSubmitForm)} disabled={isLoading}>
            {isLoading ? <Loader type="beat" color="light"/> : 'Login' }
          </Button>
        </Col>
        <Col className="text-right">
          <Button className="text-decoration-none" variant="link"
                  to={{pathname: '/forgot-password', state: {from: history.location.pathname}}}
                  as={Link}>
            Forgot Password
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginForm;