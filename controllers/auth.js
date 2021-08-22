const { useScrollTrigger } = require("@material-ui/core");
const User = require("../models/questions");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    path: "/login",
    isAuthenticated: false,
  });
};

exports.postLogin = (req, res, next) => {
  User.findById("612166aecfcff00abb3ab1d3")
    .then((user) => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      req.session.save((err) => {
        console.log(err);
        res.redirect("/");
      });
    })
    .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
  //sessionパッケージに搭載されているdestroyメソッドを使いsessionを断つ。
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};
