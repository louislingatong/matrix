import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Alert, Card, Col, Container, Image, Row} from 'react-bootstrap';
import logo from '../../../../assets/images/logo_b.png';
import ForgotPasswordForm from '../forms/ForgotPasswordForm';
import {forgotPassword} from '../authService';

function ForgotPassword() {
  const dispatch = useDispatch();
  const [error, setError] = useState({});
  const [alertErrorMessage, setAlertErrorMessage] = useState('');

  const handleSubmitForm = (data) => {
    dispatch(forgotPassword(data)).catch(err => {
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
              <ForgotPasswordForm handleSubmitForm={handleSubmitForm} error={error}/>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ForgotPassword;