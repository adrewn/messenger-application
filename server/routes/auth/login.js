const router = require("express").Router();
const { User } = require("../../db/models");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res, next) => {
  try {
    // expects username and password in req.body
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ error: "Username and password required" });

    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      console.log({ error: `No user found for username: ${username}` });
      res.status(401).json({ error: "Wrong username and/or password" });
    } else if (!user.correctPassword(password)) {
      console.log({ error: "Wrong username and/or password" });
      res.status(401).json({ error: "Wrong username and/or password" });
    } else {
      const token = jwt.sign(
        { id: user.dataValues.id },
        process.env.SESSION_SECRET,
        { expiresIn: 86400 }
      );
      res.cookie("messenger-token", token, { httpOnly: true });
      res.json({
        ...user.dataValues,
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
