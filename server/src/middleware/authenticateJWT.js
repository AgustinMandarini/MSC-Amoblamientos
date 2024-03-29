const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.TOKEN_SECRET, (err, userAutolog) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.userAutolog = userAutolog;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { authenticateJWT };
