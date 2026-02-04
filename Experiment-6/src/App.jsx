import { useState } from 'react'
import './App.css'

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [oauthVerifier, setOauthVerifier] = useState('')
  const [message, setMessage] = useState('')

  const handleLogin = () => {
    // Simple validation logic
    if (username && password && oauthVerifier) {
      // For demo purposes, check if all fields are filled
      // You can add more complex validation here
      if (username === 'admin' && password === 'admin' && oauthVerifier === 'microsoft') {
        setMessage('Verified')
      } else {
        setMessage('Access Denied')
      }
    } else {
      setMessage('Access Denied')
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Login</h1>

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>

        <div className="form-group">
          <label htmlFor="oauth">OAuth Verifier</label>
          <input
            type="text"
            id="oauth"
            value={oauthVerifier}
            onChange={(e) => setOauthVerifier(e.target.value)}
            placeholder="Enter OAuth verifier"
          />
        </div>

        <button className="login-button" onClick={handleLogin}>
          Login
        </button>

        {message && (
          <div className={`message ${message === 'Verified' ? 'verified' : 'denied'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
