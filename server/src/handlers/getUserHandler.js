//getUserHandler.js
const { findUser } = require("../controllers/getUserController");

const getUserHandler = async (req, res) => {
  try {
    const { userName, email, password } = req.query;
    const user = await findUser(userName, email, password);
    if (user.length === 0) {
      res.status(404).send({ error: "El usuario no esta registrado" });
    } else {
      res.status(200).send(user);
    }
  } catch (error) {
    res.status(400).json({ error: "El usuario no esta registrado" });
  }
};

module.exports = { getUserHandler };
