import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Card, Col, Container, Row, Image, Alert} from 'react-bootstrap';
import _ from 'lodash';
import logo from '../../../assets/images/logo_b.png';
import LoginForm from './forms/LoginForm';
import {login} from '../../services/authService';
import {loaderStatus} from '../../store/loaderSlice';

function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoading = useSelector(loaderStatus);
  const [error, setError] = useState({});
  const [alertMessage, setAlertMessage] = useState({});

  const handleRedirect = (path) => {
    history.push(path, {from: {path: history.location.pathname}})
  };

  const handleSubmitForm = (data) => {
    dispatch(login(data)).catch(err => {
      if (err.status === 422) {
        setError(err.error);
      } else {
        setAlertMessage({
          type: 'danger',
          message: err.error
        });
      }
    });
  };

  const handleCloseAlertMessage = () => {
    setAlertMessage({});
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} sm={12} md={5} className="text-center">
          <Image src={logo} fluid />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12} sm={12} md={5}>
          <Card>
            <Card.Body>
              {
                !_.isEmpty(alertMessage) &&
                <Alert variant={alertMessage.type} onClose={handleCloseAlertMessage} dismissible>
                  {alertMessage.message}
                </Alert>
              }
              <LoginForm handleSubmitForm={handleSubmitForm} error={error} isLoading={isLoading}/>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12} sm={12} md={5} className="text-center">
          <p className="text-muted">
            No account yet? <a className="text-decoration-none" onClick={() => handleRedirect('/register')}>Register here </a>
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;