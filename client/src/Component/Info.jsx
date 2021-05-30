import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProfileUsers } from "../redux/actions/profileActions";
import Avatar from "./Avatar";

const Info = () => {
  const { id } = useParams();

  const { auth, profile } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [userData, setUserData] = useState([]);

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
              <button className="btn btn-primary">Edit Profile</button>
            </div>

            <div className="follow">
              <span>
                <strong>{user.followers.length}</strong>
                <span className="ml-1">followers</span>
              </span>
              <span className="ml-4">
                <strong> {user.following.length}</strong>
                <span className="ml-1">following</span>
              </span>
            </div>

            <h6 className="mt-2">{user.fullname}</h6>
            {/* <p>{user.address}</p> */}
            <h6>{user.email}</h6>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Info;
