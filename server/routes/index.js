const express = require("express");
const urlMapModel = require("../models/UrlMap");
const router = express.Router();

router.get("/:code", function (req, res, next) {
  const query = urlMapModel.where({ shortUrlCode: req.params.code });
  query.findOne(function (err, urlMap) {
    if (err) throw err;
    if (urlMap) {
      res.redirect(301, urlMap.longUrl);
    }
  });
});

module.exports = router;
