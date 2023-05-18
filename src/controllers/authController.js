const { User } = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { email, pwd } = req.body;

  if (!email || !pwd) {
    return res.status(400).json({ message: "Username and password required" });
  }

  const foundUser = await User.findOne({ email: email }).exec();

  if (!foundUser) return res.status(401);

  const match = await bcrypt.compare(pwd, foundUser.password);

  if (match) {
    const accessToken = jwt.sign(
      {
        UserInfo: {
          email: foundUser.email,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "8h" }
    );

    res.status(200).json({
      id: foundUser._id,
      username: foundUser.username,
      token: accessToken,
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
