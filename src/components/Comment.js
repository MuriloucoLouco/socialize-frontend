import { Link } from 'react-router-dom';

export default function Comment(props) {
  return (
    <div className="post">
      <hr/>
      <div className="user">
        <img
          className="profile_picture"
          src={`${process.env.REACT_APP_API}/account/profilepicture/${props.details.user_id}`}
          alt={props.details.username}
        />
        <Link
          to={`/user/${props.details.user_id}`}
          className="username"
        >{props.details.username}
        </Link>
        <br/><br/>
	    </div>
      <span>{props.details.text}</span>
    </div>
  )
}