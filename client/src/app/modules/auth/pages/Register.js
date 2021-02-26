import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {Alert, Card, Col, Container, Image, Row} from 'react-bootstrap';
import logo from '../../../../assets/images/logo_b.png';
import RegisterForm from '../forms/RegisterForm';
import {register} from '../authService';

function Register() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [error, setError] = useState({});
  const [alertErrorMessage, setAlertErrorMessage] = useState('');

  const handleRedirect = (path) => {
    history.push(path, {from: {path: history.location.pathname}})
  };

  const handleSubmitForm = (data) => {
    dispatch(register(data)).catch(err => {
      if (err.status === 422) {
        setError(err.error);
      } else {
        setAlertErrorMessage(err.error)
      }
    });
  };

  const handleCloseAlertErrorMessage = () => {
    setAlertErrorMessage('');
  }

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
            {
              !!alertErrorMessage &&
              <Alert variant="danger" onClose={handleCloseAlertErrorMessage} dismissible>
                {alertErrorMessage}
              </Alert>
            }
            <Card.Body>
              <RegisterForm handleSubmitForm={handleSubmitForm} error={error}/>
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