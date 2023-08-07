import React from 'react'

// add nav
import Nav_Bar from './Nav_Bar';

// add bootstrap
import { Container } from 'react-bootstrap';

function Notification() {
  return (
    <>
      <Nav_Bar />
      <Container>
        notification
      </Container>
    </>
  )
}

export default Notification