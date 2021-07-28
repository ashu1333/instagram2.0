import { useHistory, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { register } from "../redux/actions/authAction";
import { useDispatch } from "react-redux";
import "./signin.css";

const Signup = () => {
  const { auth, alert } = useSelector((state) => state);
  console.log(alert);
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
    cf_password: "",
    gender: "male",
  };
  const [userData, setUserData] = useState(initialState);
  const { fullname, username, email, password, cf_password } = userData;
  const [typePass, setTypePass] = useState(false);
  const [typeCfPass, setTypeCfPass] = useState(false);
  const dispatch = useDispatch();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    console.log(userData);
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
                  style={{
                    background: `${alert.fullname ? "#fd2d6a14" : "#f1f1f1"}`,
                  }}
                />
                <small className="form-text text-danger">
                  {alert.fullname ? alert.fullname : ""}
                </small>
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  placeholder="Username"
                  onChange={handleChangeInput}
                  value={username}
                  style={{
                    background: `${alert.username ? "#fd2d6a14" : "#f1f1f1"}`,
                  }}
                />
                <small className="form-text text-danger">
                  {alert.username ? alert.username : ""}
                </small>
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  onChange={handleChangeInput}
                  value={email}
                  style={{
                    background: `${alert.email ? "#fd2d6a14" : "#f1f1f1"}`,
                  }}
                />
                <small className="form-text text-danger">
                  {alert.email ? alert.email : ""}
                </small>
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
                    style={{
                      background: `${alert.password ? "#fd2d6a14" : "#f1f1f1"}`,
                    }}
                  />
                  <small onClick={() => setTypePass(!typePass)}>
                    {typePass ? "Hide" : "Show"}
                  </small>
                </div>
                <small className="form-text text-danger">
                  {alert.password ? alert.password : ""}
                </small>
              </div>
              <div className="form-group">
                <div className="pass">
                  <input
                    type={typeCfPass ? "text" : "password"}
                    name="cf_password"
                    className="form-control"
                    placeholder="Confirm Password"
                    onChange={handleChangeInput}
                    value={cf_password}
                    style={{
                      background: `${
                        alert.cf_password ? "#fd2d6a14" : "#f1f1f1"
                      }`,
                    }}
                  />
                  <small onClick={() => setTypeCfPass(!typeCfPass)}>
                    {typeCfPass ? "Hide" : "Show"}
                  </small>
                </div>
                <small className="form-text text-danger">
                  {alert.cf_password ? alert.cf_password : ""}
                </small>
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
                    type="radio"
                    id="male"
                    name="gender"
                    value="male"
                    defaultChecked
                    onChange={handleChangeInput}
                  />{" "}
                  <label>Male</label>
                </div>
                <div>
                  {" "}
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                    onChange={handleChangeInput}
                  />{" "}
                  <label>Female</label>
                </div>
                <div>
                  {" "}
                  <input
                    type="radio"
                    id="other"
                    name="gender"
                    value="other"
                    onChange={handleChangeInput}
                  />{" "}
                  <label>Other</label>
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                Sign up
              </button>
            </form>

            <p className="site-rules">
              By signing up, you agree to our <b>Terms</b> , <b>Data Policy</b>{" "}
              and <b>Cookies Policy</b> .
            </p>
          </div>

          <div className="right-column-login text-center">
            <p>
              Have a account? <a href="/">Sign in</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
