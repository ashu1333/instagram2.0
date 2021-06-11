import UserCard from "../UserCard";
import { useSelector } from "react-redux";
import FollowBtn from "../FollowBtn";
import LoadIcon from "../../images/loading.gif";
const RightSideBar = () => {
  const { auth, suggest } = useSelector((state) => state);
  return (
    <div className="mt-3">
      <UserCard user={auth.user} />

      <div className="d-flex justify-content-between align-items-center my-2">
        <h5 className="text-dark">Suggestions for you</h5>
        {!suggest.loading && (
          <i
            className="fas fa-redo"
            style={{ cursor: "pointer" }}
            onClick={() => {}}
          />
        )}
      </div>

      {suggest.loading ? (
        <img src={LoadIcon} alt="loading" className="d-block mx-auto my-4" />
      ) : (
        <div className="suggestions">
          {suggest.users.map((user) => (
            <UserCard key={user._id} user={user}>
              <FollowBtn user={user} />
            </UserCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default RightSideBar;
