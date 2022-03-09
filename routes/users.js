const express = require("express");
const router = express.Router();
const userAuth = require("../middleware/isAuth")
const userAdmin = require("../middleware/isAdmin")

const {getUsers, getUser, updateUser, deleteUser, addUser, loginUser} = require("../controllers/usersController");
const {userValidationPostRules, userValidationPutRules} = require("../validation/userRules")


router
  .route("/")
  .get(userAuth, userAdmin, getUsers)
  .post(userValidationPostRules, addUser);

router
  .route("/:id")
  .get(userAuth, getUser)
  .delete(userAuth, deleteUser)
  .put(userAuth, userValidationPutRules, updateUser);

router
  .route('/login')
  .post(loginUser)

module.exports = router;