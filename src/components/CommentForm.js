import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function CommentForm(props) {
  const [error, setError] = useState('');
  const [posted, setPosted] = useState(false);
  const location = useLocation();

  function comment() {
    const text = document.querySelector('#post_text').value;
    const paths = location.pathname.split('/');
    paths.shift(0);
    const post_id = paths[1];

    if (!text) return;
    
    if (posted) return;
    setPosted(true);

    const formData = new FormData();
    formData.append('text', text);
    formData.append('auth', props.user.auth);
    formData.append('user_id', props.user.id);
    fetch(`${process.env.REACT_APP_API}/post/comment/${post_id}`,
    { 
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(obj => {
      if (obj.status_code !== 'ok') {
        setPosted(false);
        return setError(obj.message);
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