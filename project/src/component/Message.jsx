import React from 'react'

// add nav
import Nav_Bar from './Nav_Bar';

// add bootstrap
import { Container } from 'react-bootstrap';

function Message() {
  return (
    <>
      <Nav_Bar />
      <Container>
        message
      </Container>
    </>
  )
}

export default Message