const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);

// exports.postSignup = (req, res) => {
//   //もしユーザーがあるのであれば、既にログインしている。
//   if (req.session.user) {
//     res.status(400).json({ error: "You've already logged in." }).end();

//     return;
//   }

//   const name = req.body.name;
//   const email = req.body.email;
//   const password = req.body.password;
//   const confirmPassword = req.body.confirmPassword;

//   console.log("session", req.session);
//   console.log("pw", req.body.password);

//   User.findOne({ email: email })
//     .then((userDoc) => {
//       console.log("user doc", userDoc);

//       if (userDoc) {
//         // req.flash(
//         //   "error",
//         //   "E-mail exists already, please pick a different one"
//         // );

//         res.status(400).json({
//           error: "E-mail exists already, please pick a different one",
//         });

//         return;
//       }

//       //compare password and hashed password
//       return (
//         bcrypt
//           //hash password and salt
//           //12(salt) will create random string
//           .hash(password, 12)
//           //@@@@
//           .then(async (hashedPassword) => {
//             //set data to userSchema in the model
//             const user = new User({
//               name: name,
//               email: email,
//               password: hashedPassword,
//             });
//             await user.save();

//             // res.status(200).json({ data: req.session.user });
//             req.session.user = { email, name };

//             //session.userにemailとnameのみ渡す。passwordはセキュリティ上渡さない。

//             // req.session.isLoggedIn = true;
//             // req.session.user = user;
//             // await user.save();
//             // user.save();
//             //ユーザーの代わりにsessionを格納する
//             // await req.session.save();
//             //@@@@必要な情報のみを返す。

//             //@@@@
//             //signupした時にユーザーを返すのNG hashed pwでも返すのはセキュリティ上NG _idも返すのやめた方がbetter
//             // return user.save();
//             //???なぜredirectしない？
//             // res.redirect("/");

//             res.status(201).end();
//           })
//         // .then(() => {
//         //   res.redirect("/");
//         // })
//       );
//     })
//     .catch((err) => {
//       console.log("signup", err);

//       //catch内にはエラー時の処理も書いておくように。
//       res.status(500).json({ error: "Internal error" }).end();
//     });
// };
