const axios = require("axios");

const registerBibleAPI = async (email, pwd) => {
  const data = {
    name: "SpiritScriptUser",
    email: email,
    password: pwd,
    notifications: false,
  };

  const res = await axios.post(
    "https://www.abibliadigital.com.br/api/users",
    data
  );

  return res.data.token;
};

const deleteBibleAPI = async (email, pwd, token) => {
  const data = {
    email: email,
    password: pwd,
  };

  const res = await axios.delete(
    "https://www.abibliadigital.com.br/api/users",
    { data: data, headers: { Authorization: `Bearer ${token}` } }
  );

  return res.data;
};

module.exports = { registerBibleAPI, deleteBibleAPI };
