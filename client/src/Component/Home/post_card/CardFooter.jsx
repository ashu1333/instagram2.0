import { Link } from "react-router-dom";
import Send from "../../../images/send.svg";
const CardFooter = ({ post }) => {
  console.log(post);
  return (
    <div classname="card_footer">
      <div className="card_icon_menu">
        <div>
          <i className="far fa-heart" />
          <Link to={`/post/${post._id}`} className="text-dark">
            <i className="far fa-comment" />
          </Link>
          <img src={Send} alt="Send" />
        </div>
        <i className="far fa-bookmark" />
      </div>

      <div className="d-flex justify-content-between">
        <h6 style={{ padding: "0 25px", cursor: "pointer" }}>
          {post.likes.length} likes
        </h6>

        <h6 style={{ padding: "0 25px", cursor: "pointer" }}>
          {post.comment.length} comments
        </h6>
      </div>
    </div>
  );
};

export default CardFooter;
