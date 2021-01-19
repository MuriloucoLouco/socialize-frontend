import { useState, useEffect } from 'react';
import { Redirect, useLocation } from 'react-router-dom';

export default function Post_form(props) {
  const [error, setError] = useState('');
  const [posted, setPosted] = useState(false);
  const location = useLocation();

  function comment() {
    const text = document.querySelector('#post_text').value;
    const paths = location.pathname.split('/');
    paths.shift(0);
    const postid = paths[1];

    if (!text) return;
    
    if (posted) return;
    setPosted(true);

    fetch(`${process.env.REACT_APP_API}/post/comment/${postid}`,
    { 
      method: 'POST',
      headers: {
        'content-type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify({ text, auth: props.user.auth })
    })
    .then(res => res.json())
    .then(obj => {
      if (obj.status_code !== 'ok') {
        return setError(obj.message);
        setPosted(false);
      }
      window.location.reload();

    });
  }
  
  if (props.user.name && props.user.id && props.user.auth) {
    return (
      <div id="send">
        <table>
          <tbody>
            <tr>
              <th><span>Nome: </span></th>
              <td><span>{props.user.name}</span></td>
            </tr>
            <tr>
              <th><span>Texto: </span></th>
              <td><textarea id="post_text"></textarea></td>
            </tr>
          </tbody>
        </table>
        <button onClick={comment}>Comentar</button>
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