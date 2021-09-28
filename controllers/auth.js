const bcrypt = require("bcryptjs");
const User = require("../models/user");

exports.getMe = (req, res) => {
  res.status(200).json({ data: req.session });
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

exports.postSignup = (req, res) => {
  if (req.session.user) {
    res.status(400).json({ error: "You've already logged in." }).end();
    return;
  }

  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  User.findOne({ email: email })
    .then((userDoc) => {
      console.log("user doc", userDoc);

      if (userDoc) {
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
          .then(async (hashedPassword) => {
            //set data to userSchema in the model
            const user = new User({
              name: name,
              email: email,
              password: hashedPassword,
            });
            await user.save();
            req.session.user = { email, name };
            res.status(201).end();
          })
      );
    })
    .catch((err) => {
      res.status(500).json({ error: "Internal error" }).end();
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.status(200).json({ data: "ok", session: req.session }).end();
  });
};
