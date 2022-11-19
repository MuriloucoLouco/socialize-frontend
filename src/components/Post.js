import { Link } from 'react-router-dom';

function PostImage(props) {
  if (!!props.details.image_id) {
    return (
      <div className="post_image_wrapper">
        <img
          className="post_image"
          src={`${process.env.REACT_APP_API}/static/photos/${props.details.image_id}`}
          alt={props.details.image_id}
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
          src={`${process.env.REACT_APP_API}/account/profilepicture/${props.details.user_id}`}
          alt={props.details.username}
        />
        <Link to={`/user/${props.details.user_id}`} className="username">
          {props.details.username}
        </Link>
        <div className="date">
          <div>
            {new Date(props.details.date).toLocaleDateString("pt-BR")}
          </div>
        </div>
        <br/><br/>
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