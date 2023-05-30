const { User } = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { deleteBibleAPI } = require("../utils/registerBibleAPI");
const { deleteGrupoDeAmigos } = require("./amigosController");

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
      APItoken: foundUser.APItoken,
    });
  } else {
    res.sendStatus(401);
  }
};

const deleteUser = async (req, res) => {
  const { id, email, pwd } = req.body;

  if (!id || !email || !pwd)
    return res.status(400).json({ message: "All parameters are required" });

  const foundUser = await User.findOne({ _id: id });
  if (!foundUser)
    return res.status(204).json({ message: "No user matches ID" + id });

  const APIdelete = await deleteBibleAPI(email, pwd, foundUser.APItoken);

  const deletedAmigos = await deleteGrupoDeAmigos(id);

  const result = await User.deleteOne({ _id: id });

  res.status(200).json(result);
};

module.exports = { handleLogin, deleteUser };
