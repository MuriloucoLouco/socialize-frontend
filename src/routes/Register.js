import { useState } from 'react';
import { Redirect } from 'react-router-dom';

function validate_email(email) {
  const REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return REGEX.test(String(email).toLowerCase());
}
export default function Register() {
  const [error, setError] = useState('');
  const [response, setResponse] = useState({});

  function register() {
    const username = document.querySelector('#username').value;
    const mail1 = document.querySelector('#mail1').value;
    const mail2 = document.querySelector('#mail2').value;
    const pass = document.querySelector('#pass').value;

    if (!(username && mail1 && mail2 && pass)) {
      setError('Preencha todos os campos.');
      return;
    }
    
    if (mail1 !== mail2) {
      setError('Os emails são diferentes.');
      return;
    }

    if (!validate_email(mail1) || !validate_email(mail2)) {
      setError('Email inválido.');
      return;
    }

    if (username.length > 64 || mail1.length > 64 || pass.length > 64) {
      setError('Parâmetros muito longos.');
      return;
    }

    setError('');

    fetch(`${process.env.REACT_APP_API}/account/register`,
      { 
        method: 'POST',
        headers: {
          'content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
          user: username,
          mail: mail1,
          pass
        })
      })
    .then(res => res.json())
    .then(obj => {
      if (obj.status_code !== 'ok') {
        return setError(obj.message);
      }
      setResponse(obj);
    });
  }

  if (response.status_code === 'ok') {
    return <Redirect to="/login" />
  }

  return (
    <div>
      <div className="login-title">
        <strong>Registrar</strong>
      </div>
      <div className="forms">
        <input id="username" type="text" placeholder="Nome de usuário" />
        <input id="mail1" type="text" placeholder="E-mail" />
        <input id="mail2" type="text" placeholder="Repetir e-mail" />
        <input id="pass" type="password" placeholder="Senha" />
        <strong className="error">{error}</strong>
        <button onClick={register} className="login-button">Registrar</button>
      </div>
    </div>
  )
}