/* eslint-disable no-unused-vars */
import './App.css'
import React, { useState } from 'react';
import logo from '/jwt-logo.png'
import { login, allUsers } from './services';

function App() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [data, setData]         = useState([]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { message } = await login(username, password);
      alert(message);
    } catch (err) {
      setError('Login failed. Please check your credentials.', err);
    }
  };

  const handleProduct = async (e) => {
    e.preventDefault();
    try {
      const { data } = await allUsers();
        //console.log(data);
        setData(data);
    } catch (err) {
      setError('Product failed. Please check your credentials.', err);
    }
  };

  return (
    <div>
      <img className='image' src={logo} />
      <div className='inputDiv'>
          <div>
            <label>Username </label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username'/>
          </div>
        </div>
        <div className='inputDiv'>
          <div>
            <label>Password </label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password'/>
          </div>
          <button type="button" onClick={handleLogin}>Login</button>
        </div>
    
      <button type="button" onClick={handleProduct}>Get Product</button>
      {
        data && data.map((val, index) => {
          return <p key={index}>{val.name}</p>
        })
      }
      {error && <p>{error}</p>}
    </div>
  )
}

export default App
