
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.files = function(req, res){
	res.render('files');
};

exports.control = function(req, res){
	res.render('control');
};