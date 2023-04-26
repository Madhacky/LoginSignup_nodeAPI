const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    const verify = jwt.verify(token, process.env.SECRET_JWT_KEY);
    if (verify.userType == "admin") {
      next();
    } else {
      res.status(401).json({
        error: "Only Admin can post product",
      });
    }
  } catch (error) {
    return res.status(401).json({
      message: "Invalid Token!!",
    });
  }
};
