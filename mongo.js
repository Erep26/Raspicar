
var mongojs = require('mongojs');
var db = mongojs('raspicar');

var idiom = db.collection('idiom');
var literal = db.collection('literal');

exports.idiom = idiom;
exports.literal = literal;