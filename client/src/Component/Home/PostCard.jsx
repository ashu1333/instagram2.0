import { useSelector } from "react-redux";
import CardHeader from "./post_card/CardHeader";
import CardBody from "./post_card/CardBody";
import CardFooter from "./post_card/CardFooter";
import InputComment from "./InputComment";
import Comments from "./Comments";

const Post = () => {
  const { homePosts } = useSelector((state) => state);

  return (
    <div className="posts">
      {homePosts.posts.map((post) => (
        <div className="card my-3">
          <CardHeader post={post} />
          <CardBody post={post} />
          <CardFooter post={post} />

          <Comments post={post} />
          <InputComment post={post} />
        </div>
      ))}
    </div>
  );
};

export default Post;
