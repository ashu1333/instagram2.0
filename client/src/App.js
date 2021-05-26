import { BrowserRouter as Router, Route } from "react-router-dom";
import PageRender from "./PageRender";
import Signin from "./Pages/signin";
function App() {
  return (
    <Router>
      <input type="checkbox" id="theme" />
      <div className="App">
        <div className="main">
          <Route path="/singin" component={Signin} />
          <Route path="/:page" component={PageRender} />
          <Route path="/:page/:id" component={PageRender} />
        </div>
      </div>
    </Router>
  );
}

export default App;
