import Info from "../Component/Info";
import Posts from "../Component/Posts";
import { useSelector } from "react-redux";
import LoadIcon from "../images/loading.gif";
const Profile = () => {
  const { profile } = useSelector((state) => state);

  return (
    <div className="profile">
      {profile.loading ? (
        <img
          src={LoadIcon}
          alt="loading"
          style={{
            marginLeft: "500px",
            marginTop: "100px",
          }}
        />
      ) : (
        <Info />
      )}

      <Posts />
    </div>
  );
};

export default Profile;
