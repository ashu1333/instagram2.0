import "./Header/header.css";
const UserCard = ({ children, user, border, haqndleClose }) => {
  return (
    <div className={"d-flex p-2 align-items-center  w-100 border"}>
      <span class="material-icons-outlined ">account_circle</span>
      <div className="ml-2">
        <span className="d-block">{user.username}</span>
        <small>{user.fullname}</small>
      </div>
    </div>
  );
};

export default UserCard;
