exports.get404 = (req, res, next) => {
  res.status(404).render("error404", {
    pageTitle: "404 Error",
    errorMessage: "404 Page Not Found",
  });
};
