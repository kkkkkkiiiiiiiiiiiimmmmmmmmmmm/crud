const express = require("express");
const app = express();
const session = require("express-session");
const csrf = require("csurf");
const flash = require("connect-flash");

const bodyParser = require("body-parser");
const sequelize = require("./util/database");
const path = require("path");

const port = 3000;

const csrfProtection = csrf();

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(csrfProtection);
app.use(flash());
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

const errorController = require("./controllers/errorPage");
const loginRoutes = require("./routes/login");
const homeRoutes = require("./routes/home");
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment");

// sequelize model
const User = require("./models/users");
const Post = require("./models/post");
const Comment = require("./models/comment");
// sequelize associations
User.hasMany(Post);
Post.belongsTo(User);
User.hasMany(Comment);
Post.hasMany(Comment);
Comment.belongsTo(Post);
Comment.belongsTo(User);

// user login process
// if (sessionStorage.getItem("isLogined") == true) {
//   app.use(loginRoutes);
// }
//
// else {
// }

app.use(postRoutes);
app.use(commentRoutes);
app.use(loginRoutes);
app.use("/", homeRoutes);
app.use(errorController.get404);

// browsing all models we made sync knows every models and relationships
sequelize
  .sync()
  .then((result) => {})
  .catch();

app.listen(port);
