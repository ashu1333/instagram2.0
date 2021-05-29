import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { login } from "../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";

import "./signin.css";

const Signin = () => {
  const intialState = { email: "", password: "" };
  const [userData, setUserData] = useState(intialState);
  const { email, password } = userData;
  const [typePass, setTypePass] = useState(false);
  const dispatch = useDispatch();

  const { auth } = useSelector((state) => state);

  const history = useHistory();
  useEffect(() => {
    if (auth.token) history.push("/");
  }, [auth.token, history]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(userData));
  };
  return (
    <div className="auth">
      <div className="row  ">
        <div className="col-md-8 ">
          <img
            src="https://res.cloudinary.com/drwb19czo/image/upload/v1591473701/PixelBook_Go_and_Pixel_4_XL_3_tqf7oq.png"
            className="phone-photo"
          />
        </div>

        <div className="col-md-4  right-side mt-10">
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
              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={email && password ? false : true}
              >
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
              Don`t have a account? <a href="/signup">Sign Up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
