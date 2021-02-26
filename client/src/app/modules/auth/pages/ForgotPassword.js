import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Alert, Card, Col, Container, Image, Row} from 'react-bootstrap';
import _ from 'lodash';
import logo from '../../../../assets/images/logo_b.png';
import ForgotPasswordForm from '../forms/ForgotPasswordForm';
import {forgotPassword} from '../authService';

function ForgotPassword() {
  const dispatch = useDispatch();
  const [error, setError] = useState({});
  const [alertMessage, setAlertMessage] = useState({});

  const handleSubmitForm = (data) => {
    dispatch(forgotPassword(data))
      .then(res => setAlertMessage({
        type: 'success',
        message: res.message
      }))
      .catch(err => {
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
              <ForgotPasswordForm handleSubmitForm={handleSubmitForm} error={error}/>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ForgotPassword;