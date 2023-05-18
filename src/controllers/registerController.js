const { User } = require("../models/User");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { username, email, pwd } = req.body;

  if (!username || !email || !pwd) {
    return res
      .status(400)
      .json({ message: "All fields required (username, email, pwd)" });
  }

  const duplicate = await User.findOne({
    email: email,
  }).exec();

  if (duplicate)
    return res.status(409).json({ message: "Email already used!" });

  try {
    const hashedPwd = await bcrypt.hash(pwd, 10);

    const result = await User.create({
      username: username,
      email: email,
      password: hashedPwd,
    });

    console.log(result);

    res.status(201).json({ success: `New user ${username} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
