var AppHouse = require('AppHouse');

exports.index = function(req, res) {
	res.render('index', { title: 'AppHouse Manager' })
};

exports.login = function(req, res) {
	res.render('login', { title: 'AppHouse Manager', err: req.query.err })
};

exports.login_verify = function(req, res) {
	if (req.body.username == 'admin' && req.body.password == 'admin') {
		res.redirect('/applist');
		res.end();
	}

	res.redirect('/login?err=1');
	res.end();
};

exports.applist = function(req, res) {
	AppHouse.Manager.lsApp(function(apps) {
		console.log(apps);
		res.render('applist', { title: 'AppHouse Manager', apps: apps })
	});
};
