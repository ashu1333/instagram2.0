import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Avatar from "../../Avatar";
import { Link } from "react-router-dom";
import moment from "moment";
import CommentMenu from "./CommentMenu";
import LikeButton from "../../LikeButton";
const CommentCard = ({ comment, post }) => {
  const [content, setContent] = useState("");
  const [readMore, setReadMore] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [loadLike, setLoadLike] = useState(false);
  const { auth } = useSelector((state) => state);

  useEffect(() => {
    setContent(comment.content);
  }, [comment]);

  const styleCard = {
    opacity: comment._id ? 1 : 0.5,
    pointerEvents: comment._id ? "inherit" : "none",
  };
  const handleLike = () => {
    // if (loadLike) return;
    setIsLike(true);

    // setLoadLike(true);
    // await dispatch(likeComment({ comment, post, auth }));
    // setLoadLike(false);
  };
  const handleUnLike = () => {
    // if (loadLike) return;
    setIsLike(false);

    // setLoadLike(true);
    // await dispatch(likeComment({ comment, post, auth }));
    // setLoadLike(false);
  };

  return (
    <div className="comment_card mt-2" style={styleCard}>
      <Link to={`/profile/${comment.user._id}`} className="d-flex text-dark">
        <Avatar src={comment.user.avatar} size="small-avatar" />
        <h6 className="mx-1">{comment.user.username}</h6>
      </Link>

      <div className="comment_content">
        <div className="flex-fill">
          <span>
            {comment.length < 100
              ? content
              : readMore
              ? content + " "
              : content.slice(0, 100) + "...."}
          </span>
          {content.length > 100 && (
            <span className="readMore" onClick={() => setReadMore(!readMore)}>
              {readMore ? "Hide content" : "Read more"}
            </span>
          )}

          <div>
            <small className="text-muted mr-3">
              {moment(comment.createdAt).fromNow()}
            </small>
            <small className="font-weight-bold mr-3">
              {comment.likes.length} likes
            </small>
            <small className="font-weight-bold mr-3">{"reply"}</small>
          </div>
        </div>

        <div className="d-flex align-items-center mx-2">
          <LikeButton
            isLike={isLike}
            handleLike={handleLike}
            handleUnLike={handleUnLike}
          />

          <CommentMenu comment={comment} post={post} auth={auth} />
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
