import Avatar from "../../Avatar";
import { Link } from "react-router-dom";
import moment from "moment";
import { GLOBALTYPES } from "../../../redux/actions/globalTypes";
import { useSelector, useDispatch } from "react-redux";

const CardHeader = ({ post }) => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleEditPost = () => {
    dispatch({ type: GLOBALTYPES.STATUS, payload: { ...post, onEdit: true } });
  };

  return (
    <div className="card_header">
      <div className="d-flex">
        <Avatar src={post.user.avatar} size="big-avatar" />
        <div className="card_name">
          <h6>
            <Link to={`/profile/${post.user._id}`} className="text-dark">
              {post.user.username}
            </Link>
          </h6>

          <small className="text-muted">
            {moment(post.createdAt).fromNow()}
          </small>
        </div>
      </div>

      <div className="nav-item dropdown">
        <span className="material-icons" id="moreLink" data-toggle="dropdown">
          more_horiz
        </span>

        <div className="dropdown-menu">
          {auth.user._id === post.user._id && (
            <>
              <div className="dropdown-item" onClick={() => handleEditPost()}>
                <span className="material-icons">create</span> Edit Post
              </div>
              <div className="dropdown-item">
                <span className="material-icons">delete_outline</span> Remove
                Post
              </div>
            </>
          )}

          <div className="dropdown-item">
            <span className="material-icons">content_copy</span> Copy Link
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardHeader;
