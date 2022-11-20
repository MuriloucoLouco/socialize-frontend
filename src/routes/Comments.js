import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header.js';
import CommentForm from '../components/CommentForm.js';
import Post from '../components/Post.js';
import Comment from '../components/Comment.js';
import Footer from '../components/Footer.js';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default function Comments(props) {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const location = useLocation();

  useEffect(() => {
    setUserData({
      name: cookies.get('name'),
      id: cookies.get('id'),
      auth: cookies.get('auth')
    });
  }, [location]);
  
  useEffect(() => {
    const paths = location.pathname.split('/');
    paths.shift(0);
    const post_id = paths[1];
    if (post_id) {
      fetch(`${process.env.REACT_APP_API}/post/id/${post_id}`)
      .then(res => res.json())
      .then(new_post => setPost(new_post))
      .then(() => setLoading(false));
    } else {
      setLoading(false);
      setPost({ status_code: 'error' });
    }
  }, [location.pathname]);
  
  if (loading) {
    return (
      <div>
        <Header user={userData} />
        <h1 className="profile_name">Carregando.</h1> 
      </div>
    )
  }

  if (post.status_code !== 'ok') {
    return (
      <div>
        <Header user={userData} />
        <h1 className="profile_name">Postagem não encontrada.</h1>
        <Footer/>
      </div>
    )
  }

  return (
    <div>
      <Header user={userData}  />
      <CommentForm user={userData}  />
      <div id="posts">
        <Post details={post} />
        <hr />
        <span><strong>Comentarios:</strong></span>
        {
          post.comments &&
          post.comments.map((comment, index) => <Comment details={comment} key={index}/>)
        }
      </div>
      <Footer/>
    </div>
  )
}