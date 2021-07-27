import { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default function Login() {
  const [error, setError] = useState('');
  const [response, setResponse] = useState({});

  function login() {
    const mail = document.querySelector('#mail').value;
    const pass = document.querySelector('#pass').value;

    fetch(`${process.env.REACT_APP_API}/account/login`,
      { 
        method: 'POST',
        headers: {
          'content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({ mail, pass })
      })
    .then(res => res.json())
    .then(obj => {
      if (obj.status_code !== 'ok') {
        return setError(obj.message);
      }

      cookies.set('name', obj.username);
      cookies.set('id', obj.user_id);
      cookies.set('auth', obj.message);

      setResponse(obj);
    })
  }

  if (response.status_code === 'ok') {
    return <Redirect to="/feed" />
  }
  
  return (
    <div>
      <div className="login-title">
        <strong>Fazer login</strong>
      </div>
      <div className="forms">
        <input id="mail" type="text" placeholder="E-mail" />
        <input id="pass" type="password" placeholder="Senha" />
        <button onClick={login} className="login-button">Log In</button>
        <strong className="error">{error}</strong>
        <span><strong>
          Ainda não possui conta? 
          <Link to="/register" className="register"> Registre-se.</Link>
        </strong></span>
      </div>
    </div>
  )
}