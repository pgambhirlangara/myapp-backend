const bcrypt = require("bcryptjs");

const User = require("../models/user");

// exports.getLogin = (req, res, next) => {
//   let message = req.flash("error");
//   if (message.length > 0) {
//     message = message[0];
//   } else {
//     message = null;
//   }

//   res.render("auth/login", {
//     path: "/login",
//     errorMessage: message,
//   });
// };

// exports.getSignup = (req, res, next) => {
//   let message = req.flash("error");
//   if (message.length > 0) {
//     message = message[0];
//   } else {
//     message = null;
//   }
//   res.render("auth/signup", {
//     path: "/signup",
//     errorMessage: message,
//   });
// };

// exports.getSession = async (req, res) => {
//   try {
//     const session = await Session.find();

//     //@@@setを呼ぶ(response headerをセットする。)
//     return res
//       .status(200)
//       .set("access-control-allow-origin", "http://localhost:3000")
//       .json(session);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };

exports.getLogin = async (req, res) => {
  try {
    const login = await User.find();

    //@@@setを呼ぶ(response headerをセットする。)
    return res
      .status(200)
      .set("access-control-allow-origin", "http://localhost:3000")
      .json([{ user: login, msg: req.session.isLoggedIn }]);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.postLogin = (req, res, next) => {
  console.log("@", req.body);
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        req.flash("error", "Invalid email or password");
        return res.redirect("/login");
      }
      //compare password and hashed password
      bcrypt
        .compare(password, user.password)
        .then(async (doMatch) => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            await req.session.save((err) => {
              console.log(err);
              // res.redirect("/");
            });
            //requestとresponseは対応させる。
            res.status(201).end();
            //@@@@return内としたのコードに行ってしまう。
            return;
          }
          req.flash("error", "Invalid email or password");
          res.redirect("/login");
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/login");
        });
    })
    .catch((err) => console.log(err));
};

exports.getSignup = async (req, res) => {
  try {
    const signup = await User.find();

    //@@@setを呼ぶ(response headerをセットする。)
    return res
      .status(200)
      .set("access-control-allow-origin", "http://localhost:3000")
      .json(signup);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.postSignup = (req, res, next) => {
  console.log("@", req.body);
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  console.log("session", req.session);

  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        // req.flash(
        //   "error",
        //   "E-mail exists already, please pick a different one"
        // );

        // return redirect("/signup");
        return res.status(400).json({
          error: "E-mail exists already, please pick a different one",
        });
      }
      //compare password and hashed password
      return (
        bcrypt
          //hash password and salt
          //12(salt) will create random string
          .hash(password, 12)
          //@@@@
          .then(async (hashPassword) => {
            //set data to userSchema in the model
            const user = new User({
              name: name,
              email: email,
              password: hashPassword,
            });
            req.session.isLoggedIn = true;
            req.session.user = user;
            // await user.save();
            user.save();
            //ユーザーの代わりにsessionを格納する
            // await req.session.save();
            //@@@@必要な情報のみを返す。
            res.status(201).end();
            //@@@@
            //signupした時にユーザーを返すのNG hashed pwでも返すのはセキュリティ上NG _idも返すのやめた方がbetter
            // return user.save();
          })
        // .then((result) => {
        //   res.redirect("/");
        // })
      );
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  // ここまだ何かしないといけない
  // destory() しても
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};
