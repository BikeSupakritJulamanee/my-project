import React, { useState } from 'react'

// add Link, useNavigatse
import { Link, useNavigate } from 'react-router-dom'

// add react-bootstrap component
import { Form, Alert, Button } from 'react-bootstrap';

// add useUserAuth
import { useUserAuth } from '../context/UserAuthContext'

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useUserAuth();

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      if (email == 'admin@gmail.com' && password == 'admin789') {
        navigate('/back');
      } else {
        navigate("/home");
      }
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <div className="row">
        <div className="col-md-6 mx-auto">
          <h2 className='mb-3' >Login</h2>
          {error && <Alert variant='danger' >{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3' controlId='formBasicEmail' >
              <Form.Control
                type='email'
                placeholder='Email address'
                onChange={(e) => setEmail(e.target.value)}
              >
              </Form.Control>
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword' >
              <Form.Control
                type='password'
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
              >
              </Form.Control>
            </Form.Group>

            <div className="d-grid gap-2">
              <Button variant='pimary' type='submit' >Sign in</Button>
            </div>

          </Form>

          <div className="p-4 box mt-3 text-center">
            Don't have an account? <Link to="/register" >Sign up</Link>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Login