import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {Card, Col, Container, Row, Image, Alert} from 'react-bootstrap';
import logo from '../../../../assets/images/logo_b.png';
import LoginForm from '../forms/LoginForm';
import {login} from '../authService';

function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [error, setError] = useState({});
  const [alertErrorMessage, setAlertErrorMessage] = useState('');

  const handleRedirect = (path) => {
    history.push(path, {from: {path: history.location.pathname}})
  };

  const handleSubmitForm = (data) => {
    dispatch(login(data)).catch(err => {
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
            <Card.Body>
              {
                !!alertErrorMessage &&
                <Alert variant="danger" onClose={handleCloseAlertErrorMessage} dismissible>
                  {alertErrorMessage}
                </Alert>
              }
              <LoginForm handleSubmitForm={handleSubmitForm} error={error}/>
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