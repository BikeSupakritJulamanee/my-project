import './App.css'

// add Link from react-router
import { Link } from 'react-router-dom'

function App() {

  return (
    <>
      <h1>instagram</h1>
      <Link to="/login" className='btn btn-success' >Login</Link>
      <Link to="/register" className='btn btn-primary' >Register</Link>
    </>
  )
}

export default App
