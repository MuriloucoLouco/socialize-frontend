import { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

export default function Post_form(props) {
  const [error, setError] = useState('');
  const [response, setResponse] = useState({});
  const [posted, setPosted] = useState(false);

  function post() {
    const title = document.querySelector('#post_title').value;
    const text = document.querySelector('#post_text').value;

    if (!(title && text)) return;

    if (posted) return;
    setPosted(true);

    fetch(`${process.env.REACT_APP_API}/post/create`,
    { 
      method: 'POST',
      headers: {
        'content-type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify({ title, text, auth: props.user.auth })
    })
    .then(res => res.json())
    .then(obj => {
      if (obj.status_code !== 'ok') {
        return setError(obj.message);
        setPosted(false);
      }
      setResponse(obj);
    });
  }
  
  if (props.user.name && props.user.id && props.user.auth) {
    if (response.status_code === 'ok') {
      return <Redirect to={`/post/${response.message}`} />
    }

    return (
      <div id="send">
        <table>
          <tbody>
            <tr>
              <th><span>Nome: </span></th>
              <td><span>{props.user.name}</span></td>
            </tr>
            <tr>
              <th><span>Título: </span></th>
              <td><textarea id="post_title"></textarea></td>
            </tr>
            <tr>
              <th><span>Texto: </span></th>
              <td><textarea id="post_text"></textarea></td>
            </tr>
          </tbody>
        </table>
        <button onClick={post}>Postar</button>
        <strong className="error">{error}</strong>
      </div>
    )
  } else {
    return (
      <div id="send">
        <strong>Faça login para postar.</strong>
      </div>
    )
  }
}