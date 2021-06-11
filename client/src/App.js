import { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { refreshToken } from "./redux/actions/authAction";
import NotFound from "./Component/NotFound";
import Signin from "./Pages/signin";
import Signup from "./Pages/signup";
import Alert from "./Component/Alert/Alert";
import Header from "./Component/Header/Header";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Discover from "./Pages/Discover";
import StatusModal from "./Component/StatusModal";
import { getPosts } from "./redux/actions/postAction";
function App() {
  const dispatch = useDispatch();
  const { auth, status, modal } = useSelector((state) => state);

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  useEffect(() => {
    if (auth.token) {
      dispatch(getPosts(auth.token));
    }
  }, [auth.token, dispatch]);
  return (
    <Router>
      <Alert />
      <input type="checkbox" id="theme" />

      <div className={`App ${(status || modal) && "mode"}`}>
        <div className="header_container">{auth.token && <Header />}</div>

        <div className="main">
          {status && <StatusModal />}

          <Route exact path="/" component={auth.token ? Home : Signin} />
          <Route exact path="/register" component={Signup} />
          {/* <Route exact path="/:page" component={PageRender} />
          <Route exact path="/:page/:id" component={PageRender} /> */}
          <Route
            exact
            path="/profile/:id"
            component={auth.token ? Profile : NotFound}
          />
          <Route
            exact
            path="/discover"
            component={auth.token ? Discover : NotFound}
          />
        </div>
      </div>
    </Router>
  );
}

export default App;
