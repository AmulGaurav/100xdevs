const jwt = require("jsonwebtoken");
const ADMINSECRET = "mokeyD.";
const USERSECRET = "D.luffy";

function generateJWT(payload, secret) {
  return jwt.sign(payload, secret, { expiresIn: "1h" });
}

function authenticateJWTAdmin(req, res, next) {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, ADMINSECRET, (err, admin) => {
      if (err) return res.sendStatus(403);

      req.admin = admin;
      next();
    });
  } else {
    res.sendStatus(401);
  }
}

function authenticateJWTUser(req, res, next) {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, USERSECRET, (err, user) => {
      if (err) return res.sendStatus(403);

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
}

module.exports = {
  ADMINSECRET,
  USERSECRET,
  generateJWT,
  authenticateJWTAdmin,
  authenticateJWTUser,
};
