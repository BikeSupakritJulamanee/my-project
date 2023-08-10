import { Container, Row, Col } from 'react-bootstrap'
import './App.css'

// add Link from react-router
import { Link } from 'react-router-dom'

import { useUserAuth } from '../src/context/UserAuthContext';

function App() {
  const { user } = useUserAuth();

  return (
    <>
      <Container className="container-centered">
        <Row>
          <Col>image</Col>

          <Col className="frame">
            <Col>
              <br />
              <Row>
                <img
                  className="logo-img"
                  src="https://raw.githubusercontent.com/zouraiz523/Instagram-Sidebar-/b2750eba8fa31cde49364428bf28fbb41b3a02f0/Instagram%20Sidebar%20Coding/logo.svg"
                  alt="Instagram Logo"
                />
              </Row>
              <br />
              <Row className="d-grid justify-content-center">
                <Link to="/login" className="btn custom-button-style">
                  Log in
                </Link>
              </Row>

              <hr className="hr-text" data-content="OR" />

              <Row className="d-grid justify-content-center">
                <Link to="/register" className="btn custom-button-style">
                  Sign up
                </Link>
              </Row>
              <br />
              <br />
            </Col>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default App
