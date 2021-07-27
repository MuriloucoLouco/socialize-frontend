import { useState } from 'react';
import { Redirect } from 'react-router-dom';

export default function PostForm(props) {
  const [error, setError] = useState('');
  const [response, setResponse] = useState({});
  const [posted, setPosted] = useState(false);

  function post() {
    const title = document.querySelector('#post_title').value;
    const text = document.querySelector('#post_text').value;
    const file = document.querySelector('#post_image').files[0];

    if (!(title && text)) return;

    if (posted) return;
    setPosted(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('text', text);
    formData.append('auth', props.user.auth);
    formData.append('user_id', props.user.id);
    if (file) {
      formData.append('file', file);
    }

    fetch(`${process.env.REACT_APP_API}/post/create`,
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
            <tr>
              <th><span>Imagens: </span></th>
              <td><input type="file" id="post_image" accept="image/*"></input></td>
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