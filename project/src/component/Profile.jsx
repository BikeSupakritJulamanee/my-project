import React from 'react'

// add nav
import Nav_Bar from './Nav_Bar';

// add bootstrap
import { Container } from 'react-bootstrap';

function Profile() {
  return (
    <>
      <Nav_Bar />
      <Container>
        profile
      </Container>
    </>
  )
}

export default Profile