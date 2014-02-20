
/*
 * GET home page.
 */
var mongo = require('./mongo');

var idiom;
mongo.idiom.find(function(err, docs){
	if(!err) idiom = docs;
	else throw err;
});

var literal;
mongo.literal.find(function(err, docs){
	if(!err) literal = docs;
	else throw err;
});

exports.index = function(req, res){
	mongo.idiom.find(function(err, docs){
		res.render('index', { title: 'Express', literal: literal[0][docs[0].select]});
	});
};

exports.files = function(req, res){
	mongo.idiom.find(function(err, docs){
		var strJavascrit = new Array();
		literal[0][docs[0].select].jsText.forEach(function(e){
			strJavascrit.push('\"'+e+'\"');
		});
		res.render('files', {literal: literal[0][docs[0].select], strJavascrit: "[" + strJavascrit + "]"});
	});
};

exports.control = function(req, res){
	mongo.idiom.find(function(err, docs){
		res.render('control', {literal: literal[0][docs[0].select]});
	});
};

exports.conf = function(req, res){
	mongo.idiom.find(function(err, docs){
		var idiomas = new Array();
		docs[0].lan.forEach(function(e){
			idiomas.push(e);
		});
		res.render('conf', {idiom: idiomas, selIdiom: docs[0].select, literal: literal[0][docs[0].select]});
	});
};