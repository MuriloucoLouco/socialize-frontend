import { Link } from 'react-router-dom';

export default function Post(props) {
  return (
    <div className="post">
      <hr/>
      <div className="user">
        <img
          className="profile_picture"
          src="/profile.webp"
          alt={props.details.username}
        />
        <Link to={`/user/${props.details.userid}`} className="username">
          {props.details.username}
        </Link><br/><br/>
      </div>
      <Link to={`/post/${props.details._id}`} className="title">
        <strong>{props.details.title}</strong>
      </Link><br/>
      <span>{props.details.text}</span>
    </div>
  )
}