const router = require("express").Router();
const path = require('path');

//routes
router.get("/", (req, res) => {
  res.render("index");
});

module.exports = router;
