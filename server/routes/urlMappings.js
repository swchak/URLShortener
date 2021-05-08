const express = require("express");
const router = express.Router();
const urlMapModel = require("../models/UrlMap");
const nanoid = require("nanoid");

router.post("/shorten-url", function (req, res, next) {
  const query = urlMapModel.where({ longUrl: req.body.longUrl });
  query.findOne(function (err, urlMap) {
    if (err) throw err;
    if (urlMap) {
      console.log(urlMap);
      res.json(urlMap);
    } else {
      urlMapModel
        .create({
          shortUrlCode: nanoid.nanoid(6),
          longUrl: req.body.longUrl,
        })
        .then((created) => {
          console.log(created);
          res.jsonp(created);
        });
    }
  });
});

module.exports = router;
