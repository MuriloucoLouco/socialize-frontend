import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Post_form from '../components/Post_form.js';
import Posts from '../components/Posts.js';
import Header from '../components/Header.js';

export default function Feed(props) {
  const [posts, setPosts] = useState([]);
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
    fetch(`${process.env.REACT_APP_API}/post/all`)
    .then(res => res.json())
    .then(new_posts => setPosts(new_posts));
  }, []);
  
  return (
    <div>
      <Header user={userData} />
      <Post_form user={userData} />
      <Posts posts={posts} />
    </div>
  )
}