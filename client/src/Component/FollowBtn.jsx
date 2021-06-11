import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { follow, Unfollow } from "../redux/actions/profileActions";

const FollowBtn = ({ user }) => {
  const [followed, setFollowed] = useState(false);
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch();
  const { auth, profile, theme } = useSelector((state) => state);

  useEffect(() => {
    if (auth.user.following.find((item) => item._id === user._id)) {
      setFollowed(true);
    }
  }, [auth.user.following, user._id]);

  const handleFollow = async () => {
    if (load) return;
    setFollowed(true);
    setLoad(true);
    await dispatch(
      follow({
        users: profile.users,
        user,
        auth,
      })
    );
    setLoad(false);
  };

  const handleUnFollow = async () => {
    if (load) return;
    setFollowed(false);
    setLoad(true);
    await dispatch(
      Unfollow({
        users: profile.users,
        user,
        auth,
      })
    );
    setLoad(false);
  };

  return (
    <>
      {followed ? (
        <button
          className="btn btn-danger"
          onClick={handleUnFollow}
          style={{ filter: theme ? "invert(1)" : "invert(0)" }}
        >
          UnFollow
        </button>
      ) : (
        <button
          className="btn btn-primary"
          onClick={handleFollow}
          style={{ filter: theme ? "invert(1)" : "invert(0)" }}
        >
          Follow
        </button>
      )}
    </>
  );
};

export default FollowBtn;
