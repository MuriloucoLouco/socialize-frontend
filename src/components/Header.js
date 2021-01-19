import { BrowserRouter as Router, Link } from 'react-router-dom';

export default function Header(props) {
  function logout() {
    localStorage.removeItem('name')
    localStorage.removeItem('id')
    localStorage.removeItem('auth')
  }

  if (props.user.name && props.user.id && props.user.auth) {
    return (
      <div id="header">
        <span>[
          <Link to="/feed" className="header-options" >
            <strong>Feed</strong>
          </Link>
        ]</span>
        
        <span>[
          <Link to={`/user/${props.user.id}`} className="header-options" >
            <strong>Perfil</strong>
          </Link>
        ]</span>
        
        <span>[
          <Link to="/login" onClick={logout} className="header-options" >
            <strong>Logout</strong>
          </Link>
        ]</span>
      </div>
    )
  } else {
    return (
      <div id="header">
        <span>[
          <Link to="/feed" className="header-options" >
            <strong>Feed</strong>
          </Link>
        ]</span>
        
        <span>[
          <Link to='/login' className="header-options" >
            <strong>Login</strong>
          </Link>
        ]</span>
        
        <span>[
          <Link to="/register" className="header-options" >
            <strong>Registrar</strong>
          </Link>
        ]</span>
      </div>
    )
  }
}