import { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { refreshToken } from "./redux/actions/authAction";
import NotFound from "./Component/NotFound";
import Signin from "./Pages/signin";
import Signup from "./Pages/signup";
import Alert from "./Component/Alert/Alert";
import Header from "./Component/Header/Header";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
function App() {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  console.log(auth.token);
  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  console.log(auth.token);
  return (
    <Router>
      <Alert />
      <input type="checkbox" id="theme" />
      <div className="App">
        <div className="main">
          {auth.token && <Header />}
          <Route exact path="/" component={auth.token ? Home : Signin} />
          <Route exact path="/register" component={Signup} />
          {/* <Route exact path="/:page" component={PageRender} />
          <Route exact path="/:page/:id" component={PageRender} /> */}
          <Route
            exact
            path="/profile/:id"
            component={auth.token ? Profile : NotFound}
          />
        </div>
      </div>
    </Router>
  );
}

export default App;
