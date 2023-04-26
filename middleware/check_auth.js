const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    const verify = jwt.verify(token, process.env.SECRET_JWT_KEY);
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid Token!!",
    });
  }
};