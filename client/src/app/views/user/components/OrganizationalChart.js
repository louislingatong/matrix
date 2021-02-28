import React from 'react';
import {CardDeck, Card} from 'react-bootstrap';
import _ from 'lodash';

function Member({member}) {
  return (
    <Card>
      <Card.Body className="text-center">
        <Card.Title>{member.name}</Card.Title>
        <Card.Subtitle className="mb-3 text-muted">
          {member.email}
        </Card.Subtitle>
        <Card.Text>
          {member.code}
        </Card.Text>
        <Group groups={member.members}/>
      </Card.Body>
    </Card>
  )
}

function Group({groups}) {
  const member = (group, i) => <Member key={i} member={group}/>;

  return (
    <CardDeck>
      {_.map(groups, member)}
    </CardDeck>
  )
}

function OrganizationalChart({data}) {
  return (
    <Group groups={data}/>
  )
}

export default OrganizationalChart;