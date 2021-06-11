import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getDiscoverPosts,
  DISCOVER_TYPES,
} from "../redux/actions/discoverActions";
import LoadIcon from "../images/loading.gif";
import PostThumb from "../Component/PostThumb";
// import LoadMoreBtn from "../components/LoadMoreBtn";
// import { getDataAPI } from "../utils/fetchData";

const Discover = () => {
  const { auth, discover } = useSelector((state) => state);
  const dispatch = useDispatch();
  //   const [load, setLoad] = useState(false);

  useEffect(() => {
    if (!discover.firstLoad) {
      dispatch(getDiscoverPosts(auth.token));
    }
  }, [dispatch, auth.token, discover.firstLoad]);
  return (
    <div>
      {discover.loading ? (
        <img src={LoadIcon} alt="loading" className="d-clock mx-auto my-4" />
      ) : (
        <PostThumb posts={discover.posts} results={discover.result} />
      )}
    </div>
  );
};
export default Discover;
