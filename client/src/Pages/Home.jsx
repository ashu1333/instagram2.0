import { useSelector } from "react-redux";
import Status from "../Component/Home/Status";
import PostCard from "../Component/Home/PostCard";
import Loading from "../images/loading.gif";
import RightSideBar from "../Component/Home/RightSideBar";
const Home = () => {
  const { homePosts } = useSelector((state) => state);
  return (
    <div className="home row mx-0">
      <div className="col-md-8">
        <Status />

        {homePosts.loading ? (
          <img src={Loading} />
        ) : homePosts.result == 0 ? (
          <h1> No Post Yet</h1>
        ) : (
          <PostCard />
        )}
      </div>

      <div className="col-md-4">
        <RightSideBar />
      </div>
    </div>
  );
};

export default Home;
