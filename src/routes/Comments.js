import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header.js';
import Comment_form from '../components/Comment_form.js';
import Post from '../components/Post.js';
import Comment from '../components/Comment.js';

export default function Comments(props) {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const location = useLocation();

  useEffect(() => {
    setUserData({
      name: localStorage.getItem('name'),
      id: localStorage.getItem('id'),
      auth: localStorage.getItem('auth')
    });
  }, [location]);
  
  useEffect(() => {
    const paths = location.pathname.split('/');
    paths.shift(0);
    const postid = paths[1];
    if (postid) {
      fetch(`${process.env.REACT_APP_API}/post/id/${postid}`)
      .then(res => res.json())
      .then(new_post => setPost(new_post))
      .then(() => setLoading(false));
    } else {
      setLoading(false);
      setPost({ status_code: 'error' });
    }
  }, []);
  
  if (loading) {
    return (
      <div>
        <Header user={userData} />
        <h1 class="profile_name">Carregando.</h1> 
      </div>
    )
  }

  if (post.status_code != 'ok') {
    return (
      <div>
        <Header user={userData} />
        <h1 class="profile_name">Postagem não encontrada.</h1> 
      </div>
    )
  }

  return (
    <div>
      <Header user={userData}  />
      <Comment_form user={userData}  />
      <div id="posts">
        <Post details={post} />
        <hr />
        <span><strong>Comentarios:</strong></span>
        {
          post.comments &&
          post.comments.map(comment => <Comment details={comment} />)
        }
      </div>
    </div>
  )
}