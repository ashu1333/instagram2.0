import { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { refreshToken } from "./redux/actions/authAction";
import PageRender from "./PageRender";
import Signin from "./Pages/signin";
import Signup from "./Pages/signup";
import Alert from "./Component/Alert/Alert";
import Home from "./Pages/Home";
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
          <Route exact path="/" component={auth.token ? Home : Signin} />
          <Route exact path="/register" component={Signup} />
          <Route exact path="/:page" component={PageRender} />
          <Route exact path="/:page/:id" component={PageRender} />
        </div>
      </div>
    </Router>
  );
}

export default App;
