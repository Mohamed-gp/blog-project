const router = require("express").Router();
const {
  signUp,
  login,
  googleSignInController,
  logout,
} = require("../controllers/authController");

router.route("/signup").post(signUp);
router.route("/login").post(login);
router.route("/google").post(googleSignInController);
router.route("/logout").post(logout);

module.exports = router;
