import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Alert, Card, Col, Container, Image, Row} from 'react-bootstrap';
import _ from 'lodash';
import logo from '../../../assets/images/logo_b.png';
import RegisterForm from './forms/RegisterForm';
import {register} from '../../services/authService';
import {loaderStatus} from '../../store/loaderSlice';

function Register() {
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoading = useSelector(loaderStatus);
  const [error, setError] = useState({});
  const [alertMessage, setAlertMessage] = useState({});

  const handleRedirect = (path) => {
    history.push(path, {from: history.location.pathname})
  };

  const handleSubmitForm = (data) => {
    dispatch(register(data)).catch(err => {
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
              <RegisterForm handleSubmitForm={handleSubmitForm} error={error} isLoading={isLoading}/>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12} sm={12} md={5} className="text-center">
          <p className="text-muted">
            Already have an account? <a className="text-decoration-none" onClick={() => handleRedirect('/login')}>Login here</a>
          </p>
        </Col>
      </Row>
    </Container>

  );
}

export default Register;