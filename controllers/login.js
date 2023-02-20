const User = require("../models/users");

exports.loginPage = (req, res, next) => {
  res.render("login", { pageTitle: "Login", isLoginFailed: false });
};

exports.signUpPage = (req, res, next) => {
  res.render("signUp", { pageTitle: "Sign Up" });
};

exports.loginProcess = (req, res, next) => {
  const userId = req.body.id;
  const userPassword = req.body.password;
  // find user by "where"
  //   User.findAll({ where: { userId: userId, password: userPassword } }).then(
  //     (data) => {
  //       console.log(data);
  //       if (data === []) {
  //         console.log(LoginFailed);
  //         res.render("login", { pateTitle: "Login", isLoginFailed: true });
  //         res.redirect("/login");
  //       } else {
  //         res.render("home");
  //       }
  //     }
  //   );
};

exports.signUpProcess = (req, res, next) => {
  const signUpUserName = req.body.userName;
  const signUpUserEmail = req.body.userEmail;
  const signUpId = req.body.id;
  const signUpPassword = req.body.password;
  User.create({
    name: signUpUserName,
    email: signUpUserEmail,
    userId: signUpId,
    password: signUpPassword,
  })
    .then(() => console.log("User Signed Up"))
    .catch((err) => console.log(err));
  res.redirect("/");
  // User.create({})
};
