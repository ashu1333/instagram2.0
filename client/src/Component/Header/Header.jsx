import { Link } from "react-router-dom";
import Menu from "./Menu";
import Search from "./Search";
import Logo from "../../images/instagram.png";
import { useSelector } from "react-redux";

const Header = () => {
  const { theme } = useSelector((state) => state);
  return (
    <div className="header   ">
      <nav
        className="navbar justify-content-between 
       navbar-expand-lg navbar-light"
      >
        <Link
          to="/"
          className="logo"
          onClick={() => window.scrollTo({ top: 0 })}
        >
          <img
            className="navbar-brand"
            src={Logo}
            style={{
              objectFit: "cover",
              height: "50px",
              filter: theme ? "invert(1)" : "invert(0)",
            }}
          />

          <h1 className="navbar-brand  ">Instagram</h1>
        </Link>

        <Search />
        <Menu />
      </nav>
    </div>
  );
};

export default Header;
