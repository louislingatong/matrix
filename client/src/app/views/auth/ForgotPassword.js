import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Alert, Card, Col, Container, Image, Row} from 'react-bootstrap';
import _ from 'lodash';
import logo from '../../../assets/images/logo_b.png';
import ForgotPasswordForm from './forms/ForgotPasswordForm';
import {forgotPassword} from '../../services/authService';
import {loaderStatus} from '../../store/loaderSlice';

function ForgotPassword() {
  const dispatch = useDispatch();
  const isLoading = useSelector(loaderStatus);
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
        <Image src={logo} fluid />
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
              <ForgotPasswordForm handleSubmitForm={handleSubmitForm} error={error} isLoading={isLoading}/>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ForgotPassword;