import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {Link} from 'react-router-dom';
import {Form, Button, Container, Row, Col} from 'react-bootstrap';
import {useSelector} from 'react-redux';
import _ from 'lodash';
import {loaderStatus} from '../../../store/loaderSlice';
import Loader from '../../../components/common/loader/Loader';

function LoginForm({handleSubmitForm, error}) {
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
                        isValid={!!errors.password}
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
          <Button variant="secondary" onClick={handleSubmit(onSubmitForm)} disabled={isLoading}>Login</Button>
        </Col>
        <Col className="text-right">
          <Button className="text-decoration-none" variant="link" to="/forgot-password" as={Link}>
            Forgot Password
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginForm;