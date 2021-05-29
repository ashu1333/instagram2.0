const validation = ({ fullname, username, email, password, cf_password }) => {
  const err = {};

  if (!fullname) {
    err.fullname = "Please add ypur full name";
  } else if (fullname.length > 25) {
    err.fullname = "Full name is up to 25 character long";
  }

  if (!username) {
    err.username = "Please add your name";
  } else if (username.replace(/ /g, "").length > 25) {
    err.username = "User name is up to 25 character Long";
  }

  if (!email) {
    err.email = "Please add your email address";
  } else if (!validateEmail(email)) {
    err.email = "Email format is incorrect";
  }

  if (!password) {
    err.password = "Please add your password";
  } else if (password.length < 6) {
    err.password = "Password must be at least 6 charcater";
  }

  if (!cf_password) {
    err.cf_password = "Please add your confirm password";
  } else if (password != cf_password) {
    err.cf_password = "Confirm Passowrd did not match";
  }

  return {
    errMsg: err,
    errLength: Object.keys(err).length,
  };
};

const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export default validation;
