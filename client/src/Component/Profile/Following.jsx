import UserCard from "../UserCard";
import FollowBtn from "../FollowBtn";
import { useDispatch, useSelector } from "react-redux";

const Followers = ({ users, setShowFollowing }) => {
  const { auth } = useSelector((state) => state);

  console.log(users);
  return (
    <div className="follow">
      <div className="follow-box">
        <h5 className="text-center">Following</h5>
        <hr />
        <div className="follow_content">
          {users.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              setShowFollowing={setShowFollowing}
            >
              {auth.user._id !== user._id && <FollowBtn user={user} />}
            </UserCard>
          ))}
        </div>
        <div className="close" onClick={() => setShowFollowing(false)}>
          &times;
        </div>
      </div>
    </div>
  );
};

export default Followers;
