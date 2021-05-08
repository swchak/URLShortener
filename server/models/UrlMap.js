var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UrlMapSchema = new Schema(
  {
    shortUrlCode: {type: String, required: true, maxLength: 10},
    longUrl: {type: String, required: true, maxLength: 200}
  }
);


module.exports = mongoose.model('UrlMap', UrlMapSchema);