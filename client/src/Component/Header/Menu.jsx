import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions/authAction";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";

const Menu = () => {
  const navLinks = [
    { label: "Home", icon: "home", path: "/" },
    { label: "Message", icon: "near_me", path: "/message" },
    { label: "Discover", icon: "explore", path: "/discover" },
  ];
  const { auth, theme, alert } = useSelector((state) => state);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const isActive = (pn) => {
    if (pn === pathname) return "active";
  };
  return (
    <div className="menu">
      <ul className="navbar-nav flex-row ">
        {navLinks.map((link, index) => (
          <li className={`nav-item px-2 ${isActive(link.path)}`} key={index}>
            <Link className="nav-link" to={link.path}>
              <span className="material-icons-outlined">{link.icon}</span>
            </Link>
          </li>
        ))}

        <li className="nav-item dropdown px-2" style={{ opacity: 1 }}>
          <span
            className="nav-link position-relative"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span class="material-icons-outlined">favorite_border</span>

            {/* <span className="notify_length">{notify.data.length}</span> */}
          </span>
        </li>

        <li className="nav-item dropdown px-1 active">
          <span
            className="nav-link dropdown-toggle"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span class="material-icons-outlined ">account_circle</span>
          </span>

          <div
            class="dropdown-menu"
            aria-labelledby="navbarDropdown"
            style={{}}
          >
            <Link class="dropdown-item" href="#">
              Profile
            </Link>

            <label
              htmlFor="theme"
              className="dropdown-item"
              onClick={() =>
                dispatch({
                  type: GLOBALTYPES.THEME,
                  payload: !theme,
                })
              }
            >
              {theme ? "Light mode" : "Dark mode"}
            </label>

            <div class="dropdown-divider"></div>
            <Link
              class="dropdown-item"
              to="/"
              onClick={() => dispatch(logout())}
            >
              Logout
            </Link>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
