const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authCtrl = {
  register: async (req, res) => {
    try {
      const { fullname, username, email, password, gender } = req.body;
      console.log(req.body);

      let newUsername = username.toLowerCase().replace(/ /g, "");

      const user_name = await Users.findOne({ username: newUsername });
      if (user_name)
        return res.status(400).json({ msg: "This user already excisat" });

      const user_email = await Users.findOne({ email });
      if (user_email)
        return res.status(400).json({ msg: "This is email is alreay exist" });

      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "passwird must be at least 6 charatcter" });

      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = new Users({
        fullname,
        username: newUsername,
        email,
        password: passwordHash,
        gender,
      });

      const access_token = createAcessToken({ id: newUser._id });
      const refresh_token = createRefreshToken({ id: newUser._id });

      console.log(access_token);

      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/api/refresh_token",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      await newUser.save();
      res.json({
        msg: "Register Success!",
        access_token,
        user: {
          ...newUser._doc,
          password: "",
        },
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(email);
      const user = await Users.findOne({ email }).populate(
        "followers following",
        "avatar username fullname"
      );

      if (!user)
        return res.status(400).json({ msg: "This email does not exist." });
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: "Password is incorrect." });

      const access_token = createAcessToken({ id: user._id });
      // console.log(access_token);
      const refresh_token = createRefreshToken({ id: user._id });
      console.log("refresh" + refresh_token);
      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/api/refresh_token",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
      });

      res.json({
        msg: "login success!",
        access_token,
        user: {
          ...user._doc,
          password: "",
        },
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  },

  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/api/refresh_token" });
      return res.json({ msg: "Logged Out !" });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  },

  generateAcessToken: async (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;

      console.log("rf_token" + rf_token);
      if (!rf_token) return res.status(400).json({ msg: "Please login Now" });

      jwt.verify(
        rf_token,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, result) => {
          if (err) return res.status(400).json({ msg: "Please login now." });

          const user = await Users.findById(result.id)
            .select("-password")
            .populate(
              "followers following",
              "avatar username fullname followers following"
            );

          console.log(user);
          if (!user)
            return res.status(400).json({ msg: "This does not exist." });
          const access_token = createAcessToken({ id: result.id });

          res.json({
            access_token,
            user,
          });
        }
      );
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  },
};

const createAcessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = authCtrl;
