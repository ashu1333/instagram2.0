import { useSelector } from "react-redux";
import Status from "../Component/Home/Status";
import Posts from "../Component/Home/Posts";
import Loading from "../images/loading.gif";
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
          <Posts />
        )}
      </div>

      <div className="col-md-4">suggest</div>
    </div>
  );
};

export default Home;
