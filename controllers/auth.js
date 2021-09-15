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

//@@@@@フロントエンドでのログインしてるかどうかのチェックはmeにアクセスすればできる。
// const response = fetch("http://localhost:3001/me");
// const response = axios.get("http://localhost:3001/me");

//200ならログインしている、そうじゃなければログインしてない
// if (response.status === 200) {
//   // ログインしている
// } else {
//   // ログインしていない
// }

// if (req.session.user !== undefined) {
//   // ログインしている
// } else {
//   // ログインしていない
// }

//@@@@@
exports.getMe = (req, res) => {
  //もしsession.userがあるのであれば、200を返す。そうでなければエラー。
  if (req.session.user) {
    // req.session.user === { id: "wqewqe", "name": "qweqwe" }
    res.status(200).json({ data: req.session.user });
  } else {
    res.status(404).end();
  }
};

// exports.getLogin = async (req, res) => {
//   if (req.session.user) {
//     res.status(200).json({ data: "ok", session: req.session });
//   }

//   // try {
//   //   const login = await User.find();

//   //   //@@@setを呼ぶ(response headerをセットする。)
//   //   return res
//   //     .status(200)
//   //     .set("access-control-allow-origin", "http://localhost:3000")
//   //     .json([{ user: login, msg: req.session.isLoggedIn }]);
//   // } catch (error) {
//   //   res.status(404).json({ message: error.message });
//   // }
// };

exports.postLogin = (req, res, next) => {
  //もしユーザーがあるのであれば、既にログインしている。
  if (req.session.user) {
    res.status(400).json({ error: "You've already logged in." }).end();

    return;
  }

  const email = req.body.email;
  const password = req.body.password;

  //@@@@@
  //passwordがstring形式ではないと、その後のバックエンドの処理に影響が出るため、ここでチェック
  //パスワードが空文字だとしてもエラーは起きないので、そのチェックはバックエンド側では行わなくて大丈夫。
  if (typeof password !== "string") {
    res.status(404).json({ error: "Invalid email or password." }).end();
    return;
  }

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        // req.flash("error", "Invalid email or password");
        // return res.redirect("/login");

        res.status(404).json({ error: "Invalid email or password." }).end();

        return;
      }

      console.log("user", user);
      console.log("password", password);

      //@@@@@
      //compare password and hashed password
      //バックエンド側でPWなど”セキュリティに関する”チェックしておかないといけない。
      //フロントエンド側でtrueならログインと判断するようにすれば、
      //postmanでもtrueにしてpostすれば、ログインできてしまうため。

      return bcrypt.compare(password, user.password).then(async (doMatch) => {
        if (doMatch) {
          // req.session.isLoggedIn = true;
          // req.session.user = user;
          //session.userにはemailとnameのみ渡す。パスワードを渡さないのでセキュリティ上も安全。
          req.session.user = { email: user.email, name: user.name };

          // await req.session.save((err) => {
          //   console.log(err);
          //   // res.redirect("/");
          // });
          //requestとresponseは対応させる。
          res.status(201).end();
          //@@@@returnしないとコードに行ってしまう。
          return;
        }

        // req.flash("error", "Invalid email or password");
        // res.redirect("/login");
        res.status(404).json({ error: "Invalid email or password." }).end();
      });
    })
    .catch((err) => {
      console.log(err);

      //catch内にはエラー時の処理も書いておくように。
      res.status(500).json({ error: "Internal error" }).end();
    });
};

// exports.getSignup = async (req, res) => {
//   try {
//     const signup = await User.find();

//     //@@@setを呼ぶ(response headerをセットする。)
//     return res
//       .status(200)
//       .set("access-control-allow-origin", "http://localhost:3000")
//       .json(signup);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };

exports.postSignup = (req, res) => {
  //もしユーザーがあるのであれば、既にログインしている。
  if (req.session.user) {
    res.status(400).json({ error: "You've already logged in." }).end();

    return;
  }

  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  console.log("session", req.session);

  User.findOne({ email: email })
    .then((userDoc) => {
      console.log("user doc", userDoc);

      if (userDoc) {
        // req.flash(
        //   "error",
        //   "E-mail exists already, please pick a different one"
        // );

        res.status(400).json({
          error: "E-mail exists already, please pick a different one",
        });

        return;
      }

      //compare password and hashed password
      return (
        bcrypt
          //hash password and salt
          //12(salt) will create random string
          .hash(password, 12)
          //@@@@
          .then(async (hashedPassword) => {
            //set data to userSchema in the model
            const user = new User({
              name: name,
              email: email,
              password: hashedPassword,
            });

            await user.save();

            //session.userにemailとnameのみ渡す。passwordはセキュリティ上渡さない。
            req.session.user = { email, name };

            // req.session.isLoggedIn = true;
            // req.session.user = user;
            // await user.save();
            // user.save();
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

      //catch内にはエラー時の処理も書いておくように。
      res.status(500).json({ error: "Internal error" }).end();
    });
};

exports.postLogout = (req, res, next) => {
  // destory() しても
  req.session.destroy((err) => {
    console.log(err);

    //@@@@@ redirectは実は1と同じことをしている。
    // 1. res.status(302).set("location": "http://localhost:3001/").end();
    // 2. res.redirect("/");

    res.status(200).json({ data: "ok", session: req.session }).end();
  });
};
