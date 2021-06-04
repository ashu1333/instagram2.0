import Status from "../Component/Home/Status";
import Post from "../Component/Home/Post";
const Home = () => {
  return (
    <div className="home row mx-0">
      <div className="col-md-8">
        <Status />
        <Post />
      </div>

      <div className="col-md-4">suggest</div>
    </div>
  );
};

export default Home;
