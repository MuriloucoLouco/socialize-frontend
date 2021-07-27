import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header.js';
import Posts from '../components/Posts.js';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default function User(props) {
  const [user, setUser] = useState({});
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
    const user_id = paths[1];
    if (user_id) {
      fetch(`${process.env.REACT_APP_API}/post/user/${user_id}`)
      .then(res => res.json())
      .then(new_user => setUser(new_user))
      .then(() => setLoading(false));
    } else {
      setLoading(false);
      setUser({ status_code: 'error' });
    }
  }, [location.pathname]);

  if (loading) {
    return (
      <div>
        <Header user={userData} />
        <h1 class="profile_name">Carregando.</h1> 
      </div>
    )
  }

  if (user.status_code !== 'ok') {
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
        <img class="profile_header" src="/profile.webp" alt={user.name} />
        <h1 class="profile_name">{user.name}</h1> 
      </div>
      <Posts posts={user.posts} />
    </div>
  )
}