const router = require("express").Router();

router.use("/register", require("./register.js"));
router.use("/login", require("./login"));

router.delete("/logout", (req, res, next) => {
  res.clearCookie("messenger-token", { httpOnly: true });
  res.sendStatus(204);
});

router.get("/user", (req, res, next) => {
  if (req.user) {
    return res.json(req.user);
  } else {
    return res.json({});
  }
});

module.exports = router;
