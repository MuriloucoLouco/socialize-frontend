import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header.js';
import Posts from '../components/Posts.js';
import Cookies from 'universal-cookie';
import Compress from 'compress.js';


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

  function uploadProfilePicture(e) {
    const file_big = document.querySelector('#profile_image').files;
    const compress = new Compress();
    let file;
    compress.compress([...file_big], {
      size: 1,
      quality: 0.75,
      maxWidth: 256,
      maxHeight: 256,
    }).then((data) => {
      file = Compress.convertBase64ToFile(data[0].data, data[0].ext);
      
      const formData = new FormData();
      formData.append('file', file);
      formData.append('auth', userData.auth);
      formData.append('user_id', userData.id);

      fetch(`${process.env.REACT_APP_API}/account/profilepicture`,
      { 
        method: 'POST',
        body: formData
      })
      .then(res => res.json())
      .then(obj => {
        if (obj.status_code !== 'ok') {
          alert(obj.message);
        } else {
          window.location.reload();
        }
      });
    }).catch(err => {
      alert('ERRO.');
    });
  }

  if (loading) {
    return (
      <div>
        <Header user={userData} />
        <h1 className="profile_name">Carregando.</h1> 
      </div>
    )
  }

  if (user.status_code !== 'ok') {
    return (
      <div>
        <Header user={userData} />
        <h1 className="profile_name">Usuário não encontrado.</h1> 
      </div>
    )
  }
  
  if (userData.name === user.name) {
    return (
      <div>
        <Header user={userData} />
        <div id="profile">
          <div className="header_picture_wrapper">
            <label htmlFor="profile_image">
              <img
                className="own_header_picture"
                src={`${process.env.REACT_APP_API}/account/profilepicture/${user.id}`}
                alt={user.name}
              />
            </label>
            <div className="header_picture_overlay">
              Mudar foto de perfil
            </div>
            <input type="file" id="profile_image" accept="image/*" onChange={uploadProfilePicture}></input>
          </div>
          <h1 className="profile_name">{user.name}</h1> 
        </div>
        <Posts posts={user.posts} />
      </div>
    )
  } else {
    return (
      <div>
        <Header user={userData} />
        <div id="profile">
          <div className="header_picture_wrapper">
            <img
              className="header_picture"
              src={`${process.env.REACT_APP_API}/account/profilepicture/${user.id}`}
              alt={user.name}
            />
          </div>
          <h1 className="profile_name">{user.name}</h1> 
        </div>
        <Posts posts={user.posts} />
      </div>
    )
  }
}