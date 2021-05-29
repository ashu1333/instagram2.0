import { Link } from "react-router-dom";
import Menu from "./Menu";
import Search from "./Search";
import "./header.css";
const Header = () => {
  return (
    <div className="header bg-light  ">
      <nav
        className="navbar justify-content-between 
       navbar-expand-lg navbar-light align-middle"
      >
        <Link to="/" className="logo">
          <img
            className="navbar-brand"
            src="https://img-premium.flaticon.com/png/512/87/87390.png?token=exp=1622298693~hmac=5e54dbb83122080ac096acb1e1c85787"
            width="30px"
            onClick={() => window.scrollTo({ top: 0 })}
          />

          <h1
            className="navbar-brand p-0 m-0"
            onClick={() => window.scrollTo({ top: 0 })}
          >
            Instagram
          </h1>
        </Link>

        <Search />
        <Menu />
      </nav>
    </div>
  );
};

export default Header;
