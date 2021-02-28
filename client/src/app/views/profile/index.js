import React, {useEffect, useState} from 'react';
import {Card, Col, Container, Row} from 'react-bootstrap';
import {useSelector} from 'react-redux';
import ProfileForm from "./forms/ProfileForm";
import {loggedInUser} from '../../store/authSlice';
import {loaderStatus} from '../../store/loaderSlice';

function Profile() {
  const profile = useSelector(loggedInUser);
  const isLoading = useSelector(loaderStatus);
  const [error, setError] = useState({});

  const handleSubmitForm = (data) => {
    // update
  }

  if (!profile) {
    return;
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} sm={12} md={5}>
          <Card>
            <Card.Body>
              <ProfileForm handleSubmitForm={handleSubmitForm} error={error} isLoading={isLoading} profile={profile} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center">
      </Row>
    </Container>
  )
}

export default Profile;