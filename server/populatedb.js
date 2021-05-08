#! /usr/bin/env node

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
console.log(userArgs);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require("async");
var UrlMap = require("./models/UrlMap");

var mongoose = require("mongoose");
var mongoDB = userArgs[0];
console.log(mongoDB);
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var urlMappings = [];

function urlMapCreate(code, long_url, cb) {
  urlMap = { code: code, long_url: long_url };

  var urlMap = new UrlMap({ shortUrlCode: code, longUrl: long_url });

  urlMap.save(function (err) {
    if (err) {
      throw err;
    }
    console.log("New UrlMap: " + urlMap);
    urlMappings.push(urlMap);
    cb(null, urlMap);
  });
}

function createUrlMappings(cb) {
  async.series(
    [
      function (callback) {
        urlMapCreate(
          "3tit6MJ",
          "https://www.linkedin.com/feed/hashtag/innovation/",
          callback
        );
      },
      function (callback) {
        urlMapCreate(
          "3xK1XWA",
          "https://sequelize.org/master/variable/index.html#static-variable-QueryTypes",
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

async.series(
  [createUrlMappings],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else {
      console.log("url mappings: " + urlMappings);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
