import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  let history = useHistory();
  const login = () => {
    const data = { username: username, password: password };
    axios.post('http://localhost:3001/auth/login', data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem('accessToken', response.data);
        history.push('/');
      }
    });
  };

  return (
    <div>
      <input
        type='text'
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      ></input>
      <input
        type='password'
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      ></input>
      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;
