import Post from './Post.js';

export default function Posts(props) {
  return (
    <div id="posts">
      {props.posts.map((post, index) => <Post details={post} key={index} />)}
    </div>
  )
}