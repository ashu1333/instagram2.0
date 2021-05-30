import { Link } from "react-router-dom";

import "./Header/header.css";
const UserCard = ({ children, user, border, handleClose }) => {
  const handleCloseAll = () => {
    if (handleClose) handleClose();
  };
  return (
    <div className={"d-flex p-2 align-items-center  w-100 border"}>
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
    </div>
  );
};

export default UserCard;
