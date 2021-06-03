import { Link } from "react-router-dom";

import "./Header/header.css";
const UserCard = ({
  children,
  user,
  border,
  handleClose,
  setShowFollowers,
  setShowFollowing,
}) => {
  const handleCloseAll = () => {
    if (handleClose) handleClose();
    if (setShowFollowers) setShowFollowers(false);
    if (setShowFollowing) setShowFollowing(false);
  };
  return (
    <div
      className={`d-flex p-2 align-items-center  justify-content-between w-100  ${border}`}
    >
      <div>
        <Link
          to={`/profile/${user._id}`}
          className="d-flex align-items-center"
          style={{ textDecoration: "none", color: "inherit" }}
          onClick={handleCloseAll}
        >
          <span class="material-icons-outlined ">account_circle</span>
          <div className="ml-2">
            <span className="d-block">{user.username}</span>
            <small>{user.fullname}</small>
          </div>
        </Link>
      </div>
      {children}
    </div>
  );
};

export default UserCard;
