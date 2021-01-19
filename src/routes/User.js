import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header.js';
import Posts from '../components/Posts.js';

export default function User(props) {
  const [user, setUser] = useState({});
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
    const userid = paths[1];
    if (userid) {
      fetch(`${process.env.REACT_APP_API}/post/user/${userid}`)
      .then(res => res.json())
      .then(new_user => setUser(new_user))
      .then(() => setLoading(false));
    } else {
      setLoading(false);
      setUser({ status_code: 'error' });
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

  if (user.status_code != 'ok') {
    return (
      <div>
        <Header user={userData} />
        <h1 class="profile_name">Usuário não encontrado.</h1> 
      </div>
    )
  }

  return (
    <div>
      <Header user={userData} />
      <div id="profile">
        <img class="profile_header" src="/profile.webp" />
        <h1 class="profile_name">{user.name}</h1> 
      </div>
      <Posts posts={user.posts} />
    </div>
  )
}