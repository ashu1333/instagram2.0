import { useHistory, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { register } from "../redux/actions/authAction";
import { useDispatch } from "react-redux";
import "./signin.css";

const Signup = () => {
  const { auth } = useSelector((state) => state);
  const history = useHistory();

  useEffect(() => {
    if (auth.token) {
      history.push("/");
    }
  }, [auth.token, history]);

  const initialState = {
    fullname: "",
    username: "",
    email: "",
    password: "",
    c_password: "",
    gender: "male",
  };
  const [userData, setUserData] = useState(initialState);
  const { fullname, username, email, password, c_password } = userData;
  const [typePass, setTypePass] = useState(false);
  const dispatch = useDispatch();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(userData));
  };
  return (
    <div className="auth">
      <div className="row">
        <div className="col-md-8 ">
          <img
            src="https://res.cloudinary.com/drwb19czo/image/upload/v1591473701/PixelBook_Go_and_Pixel_4_XL_3_tqf7oq.png"
            className="phone-photo"
          />
        </div>

        <div className="col-md-4 right-side mt-0">
          <div className="right-column text-center">
            <img
              src="https://clipart.info/images/ccovers/1522452762Instagram-logo-png-text.png"
              className="insta-logo"
            />
            <p className="text-for-member">
              Sign up to see latest photos ans videos and sign up sing up sign
              up
            </p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="fullname"
                  className="form-control"
                  placeholder="Fullname"
                  onChange={handleChangeInput}
                  value={fullname}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  placeholder="Username"
                  onChange={handleChangeInput}
                  value={username}
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  onChange={handleChangeInput}
                  value={email}
                />
              </div>
              <div className="form-group">
                <div className="pass">
                  <input
                    type={typePass ? "text" : "password"}
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    onChange={handleChangeInput}
                    value={password}
                  />
                  <small onClick={() => setTypePass(!typePass)}>
                    {typePass ? "Hide" : "Show"}
                  </small>
                </div>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="c_password"
                  className="form-control"
                  placeholder="Confirm Password"
                  onChange={handleChangeInput}
                  value={c_password}
                />
              </div>
              <div
                className="check mt-10"
                style={{
                  display: "flex",
                  direction: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  marginTop: "20px",
                }}
              >
                <div>
                  <input
                    type="checkbox"
                    name="password"
                    placeholder="Password"
                  />{" "}
                  <label>Male</label>
                </div>
                <div>
                  {" "}
                  <input
                    type="checkbox"
                    name="password"
                    placeholder="Password"
                  />{" "}
                  <label>Female</label>
                </div>
                <div>
                  {" "}
                  <input
                    type="checkbox"
                    name="password"
                    placeholder="Password"
                  />{" "}
                  <label>Other</label>
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                Sign in
              </button>
            </form>

            <p className="site-rules">
              By signing up, you agree to our <b>Terms</b> , <b>Data Policy</b>{" "}
              and <b>Cookies Policy</b> .
            </p>
          </div>

          <div className="right-column-login text-center">
            <p>
              Have`n account yet? <a href="/signin">Sign in</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
