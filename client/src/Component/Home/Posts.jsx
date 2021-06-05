import { useSelector } from "react-redux";
import CardHeader from "./post_card/CardHeader";
import CardBody from "./post_card/CardBody";
import CardFooter from "./post_card/CardFooter";

const Post = () => {
  const { homePosts } = useSelector((state) => state);

  return (
    <div className="posts">
      hii
      {homePosts.posts.map((post) => (
        <div className="card my-3">
          <CardHeader post={post} />
          <CardBody />
          <CardFooter />
        </div>
      ))}
    </div>
  );
};

export default Post;
