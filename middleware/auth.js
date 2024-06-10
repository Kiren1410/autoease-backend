const jwt = require("jsonwebtoken");
const { getUserByEmail } = require("../controllers/user");
const { JWT_PRIVATE_KEY } = require("../config");

// validate if user is legit user using token provided
const isUserValid = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    // console.log(token);
    // perform user validation
    const decoded = jwt.verify(token, JWT_PRIVATE_KEY);
    // console.log(decoded);
    const user = await getUserByEmail(decoded.email);

    // if user exist
    if (user) {
      // this is a valid user
      //pass the user object to the next function
      req.user = user;
      // trigger next function
      next();
    } else {
      // this is not  a valid user
      res.status(403).send({
        message: "You are not authorized to perform this action",
      });
    }
  } catch (error) {
    // error
    // console.log(error);
    res.status(403).send({
      message: "You are not authorized to perform this action",
    });
  }
};

// validate if the logged in user is an admin
const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    // perform user validation
    const decoded = jwt.verify(token, JWT_PRIVATE_KEY);
    // console.log(decoded);
    const user = await getUserByEmail(decoded.email);

    // if user is an admin
    if (user && user.role === "admin") {
      req.user = user;

      next();
    } else {
      // this is not  a valid user
      res.status(403).send({
        message: "You are not authorized to perform this action",
      });
    }
  } catch (error) {
    // error
    console.log(error);
    res.status(403).send({
      message: "You are not authorized to perform this actionsd",
    });
  }
};

module.exports = {
  isUserValid,
  isAdmin,
};
