import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Col, Container, Row} from 'react-bootstrap';
import _ from 'lodash';
import {allUsers} from '../../store/userSlice';
import {fetchAllUsers} from '../../services/userService';
import OrganizationalChart from './components/OrganizationalChart';

function User() {
  const dispatch = useDispatch();
  const users = useSelector(allUsers);

  useEffect(() => {
    if (_.isEmpty(users)) {
      dispatch(fetchAllUsers());
    }
  }, [users]);

  console.log(users);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col>
          <OrganizationalChart data={users}/>
        </Col>
      </Row>
    </Container>
  )
}

export default User;