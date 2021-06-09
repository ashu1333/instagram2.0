import React, { useState, useEffect } from "react";
import CommentDisplay from "./comments/CommentDisplay";
const Comments = ({ post }) => {
  return (
    <div className="comments">
      {post.comment.map((cmnt, index) => (
        <CommentDisplay id={cmnt._id} comment={cmnt} post={post} />
      ))}
    </div>
  );
};

export default Comments;
