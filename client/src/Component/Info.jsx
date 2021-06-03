import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProfileUsers } from "../redux/actions/profileActions";
import EditProfile from "./EditProfile";
import FollowBtn from "./FollowBtn";
import Followers from "./Profile/Followers";
import Following from "./Profile/Following";
import Avatar from "./Avatar";

const Info = () => {
  const { id } = useParams();

  const { auth, profile } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [onEdit, setOnEdit] = useState(false);
  const [userData, setUserData] = useState([]);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  useEffect(() => {
    if (id === auth.user._id) {
      setUserData([auth.user]);
    } else {
      dispatch(getProfileUsers({ users: profile.users, id, auth }));
      const newData = profile.users.filter((user) => user._id === id);
      setUserData(newData);
    }
  }, [id, auth.user, dispatch, profile.users]);

  return (
    <div className="info">
      {userData.map((user) => (
        <div className="info_container">
          <Avatar src={user.avatar} />
          <div className="info_content">
            <div className="info_content_title">
              <h2>{user.username}</h2>

              {id === auth.user._id ? (
                <button
                  className="btn btn-primary"
                  onClick={() => setOnEdit(true)}
                >
                  Edit Profile
                </button>
              ) : (
                <FollowBtn user={user} />

                // <button className="btn btn-primary">Follow</button>
              )}
            </div>

            <div className="follow_btn">
              <span onClick={() => setShowFollowers(true)}>
                <strong>{user.followers.length}</strong>
                <span className="ml-1">followers</span>
              </span>
              <span className="ml-4" onClick={() => setShowFollowing(true)}>
                <strong> {user.following.length}</strong>
                <span className="ml-1">following</span>
              </span>
            </div>

            <h6 className="mt-2">{user.fullname}</h6>
            {/* <p>{user.address}</p> */}
            <h6>{user.email}</h6>
          </div>

          {onEdit && <EditProfile setOnEdit={setOnEdit} />}

          {showFollowers && (
            <Followers
              users={user.followers}
              setShowFollowers={setShowFollowers}
            />
          )}
          {showFollowing && (
            <Following
              users={user.following}
              setShowFollowing={setShowFollowing}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Info;
