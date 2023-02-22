const brcypt = require("bcryptjs");

const User = require("../models/users");

exports.loginPage = (req, res, next) => {
  res.render("login", { pageTitle: "Login", isLoginFailed: false });
};
exports.signUpPage = (req, res, next) => {
  res.render("signUp", { pageTitle: "Sign Up" });
};
exports.loginProcess = (req, res, next) => {
  const id = req.body.id;
  const password = req.body.password;
  User.findOne({ userId: id })
    .then((user) => {
      if (!user) {
        return res.redirect("/login");
      }
      brcypt.compare(password, user.password).then((isMatched) => {
        if (isMatched) {
          req.session.isLoggedIn = true;
          req.session.userId = user.id;
          res.redirect("/");
        }
        // flash code here
        // res.redirect("login");
      });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("login");
    });
};
exports.signUpProcess = (req, res, next) => {
  const signUpUserName = req.body.userName;
  const signUpUserEmail = req.body.userEmail;
  const signUpId = req.body.id;
  const signUpPassword = req.body.password;
  User.findOne({ email: signUpUserEmail })
    .then((user) => {
      if (user) {
        return res.redirect("/sign-up");
      }
      return brcypt
        .hash(signUpPassword, 12)
        .then((hashedPassword) => {
          return User.create({
            name: signUpUserName,
            email: signUpUserEmail,
            userId: signUpId,
            password: hashedPassword,
          });
        })
        .then(() => {
          console.log("New User Signed Up!");
          res.redirect("/login");
        });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("sign-up");
    });
  // User.create({})
};
exports.logoutProcess = (req, res, next) => {
  req.session.destroy();
  res.redirect("back");
};
