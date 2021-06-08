import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createComment } from "../../redux/actions/commentActions";

const InputComment = ({ post }) => {
  const { theme, auth } = useSelector((state) => state);
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!content.trim()) {
      return;
    }
    setContent("");

    const newComment = {
      content,
      likes: [],
      user: auth.user,
      createdAt: new Date().toISOString(),
    };

    dispatch(createComment({ post, newComment, auth }));
  };

  return (
    <form className="card-footer comment_input" onSubmit={handleSubmit}>
      <input
        placeholder="Add your Comment......"
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ filter: theme ? "invert(1)" : "invert(0)" }}
      />
      <button type="submit" className="postBtn">
        Post
      </button>
    </form>
  );
};

export default InputComment;
