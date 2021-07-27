import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PostForm from '../components/PostForm.js';
import Posts from '../components/Posts.js';
import Header from '../components/Header.js';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default function Feed(props) {
  const [posts, setPosts] = useState([]);
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
    fetch(`${process.env.REACT_APP_API}/post/all`)
    .then(res => res.json())
    .then(new_posts => setPosts(new_posts));
  }, []);
  
  return (
    <div>
      <Header user={userData} />
      <PostForm user={userData} />
      <Posts posts={posts} />
    </div>
  )
}