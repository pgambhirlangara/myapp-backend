const bcrypt = require("bcryptjs");
const User = require("../models/user");

exports.getMe = (req, res) => {
  if (req.session.user) {
    res.status(200).json({ data: req.session.user });
  } else {
    res.status(404).end();
  }
  return;
};

exports.postLogin = (req, res, next) => {
  if (req.session.user) {
    res.status(400).json({ error: "You've already logged in." }).end();
    return;
  }

  const email = req.body.email;
  const password = req.body.password;

  if (typeof password !== "string") {
    res.status(404).json({ error: "Invalid email or password." }).end();
    return;
  }

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        res.status(404).json({ error: "Invalid email or password." }).end();
        return;
      }

      return bcrypt.compare(password, user.password).then(async (doMatch) => {
        if (doMatch) {
          req.session.user = { email: user.email, name: user.name };
          console.log("req.session", req.session);
          res.status(201).end();
          return;
        }

        res.status(404).json({ error: "Invalid email or password." }).end();
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Internal error" }).end();
    });
};

exports.postSignup = (req, res, next) => {
  if (req.session.user) {
    console.log("already logged in");

    res.status(400).json({ error: "You've already logged in." }).end();
    return;
  }

  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        console.log("user doc", userDoc);
        res
          .status(400)
          .json({
            error:
              "E-mail or password exists already, please pick a different one",
          })
          .end();
        return;
      }
      //compare password and hashed password
      return (
        bcrypt
          //hash password and salt
          //12(salt) will create random string
          .hash(password, 12)
          .then(async (hashedPassword) => {
            //set data to userSchema in the model
            const user = new User({
              name: name,
              email: email,
              password: hashedPassword,
            });
            await user.save();
            req.session.user = { email, name };
            console.log("user was created");
            res.status(201).end();
            return;
          })
      );
    })
    .catch(() => {
      console.log("catch an error");
      res.status(500).json({ error: "Internal error" }).end();
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.status(200).json({ data: "ok", session: req.session }).end();
  });
};
