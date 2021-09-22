// const Session = require("../models/session.js");

// exports.getSession = async (req, res) => {
//   try {
//     // const session = await Session.find();

//     // return (
//     //   res
//     //     .status(200)
//     //     .set("access-control-allow-origin", "http://localhost:3000")
//     //     .json(session);
//     // );

//     console.log(req.session);

//     if (req.session) {
//       res.status(200).json({ message: "You have a session" }).end();
//     } else {
//       res.status(404).json({ message: "You have no session." }).end();
//     }
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };
