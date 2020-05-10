const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  // Getting the token from the header
  const token = req.header("X-auth-token");

  //Checking if thre's no token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  //verifying the token

  try {
    //decoding the jwt
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token  is not valid" });
  }
};
