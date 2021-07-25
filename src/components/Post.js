import { Link } from 'react-router-dom';

function PostImage(props) {
  if (!!props.details.image) {
    return (
      <div className="post_image_wrapper">
        <img
          className="post_image"
          src={`${process.env.REACT_APP_API}/static/photos/${props.details.image}`}
          alt={props.details.image}
        />
      </div>
    )
  } else {
    return (null);
  }
}

function CommentsBar(props) {
  return (
    <div className="commentbar">
      <Link to={`/post/${props.details._id}`} className="commentbar_text">
        <span className="commentbar_text">Comentários: {props.details.comments.length.toString()}</span>
      </Link>
    </div>
  )
}

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
      <PostImage details={props.details}/>
      <CommentsBar details={props.details} />
    </div>
  )
}