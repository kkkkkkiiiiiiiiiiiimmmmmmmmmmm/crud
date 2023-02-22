exports.homePage = (req, res, next) => {
  const session = req.session.isLoggedIn;
  res.render("home", { pageTitle: "CRUD", isAuthenticated: session });
};
