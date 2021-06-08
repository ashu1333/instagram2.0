import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likePost, unlikePost } from "../../../redux/actions/postAction";
import { Link } from "react-router-dom";
import LikeButton from "../../LikeButton";
import Send from "../../../images/send.svg";
const CardFooter = ({ post }) => {
  const [isLike, setIsLike] = useState(false);
  const [loadLike, setLoadLike] = useState(false);
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);

  useEffect(() => {
    if (post.likes.find((like) => like._id === auth.user._id)) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, []);
  const handleLike = () => {
    // if (loadLike) return;
    setIsLike(true);
    dispatch(likePost({ post, auth }));
    setLoadLike(true);
  };

  const handleUnLike = () => {
    // if (loadLike) return;

    setIsLike(false);
    dispatch(unlikePost({ post, auth }));
    setLoadLike(true);
  };
  return (
    <div classname="card_footer">
      <div className="card_icon_menu">
        <div>
          <LikeButton
            isLike={isLike}
            handleLike={handleLike}
            handleUnLike={handleUnLike}
          />
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
