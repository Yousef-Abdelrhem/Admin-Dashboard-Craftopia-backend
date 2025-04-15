const jwt = require("jsonwebtoken");
function authToken(req, res, next) {
  const authHeaders = req.headers["authorization"];
  const token = authHeaders && authHeaders.split(" ")[1];

  if (!token) {
    return res.status(401).send("Access denied. no token provided.");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, userDetails) => {
    if (err) {
      return res.status(403).send("InvalidToken");
    }
    req.userDetails = userDetails;
    next();
  });
}

module.exports = authToken;
