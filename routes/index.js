var AppHouse = require('AppHouse');

exports.index = function(req, res) {
	res.redirect('/login');
};

exports.login = function(req, res) {
	res.render('login', { title: 'AppHouse Manager', err: req.query.err })
};

exports.logout = function(req, res) {
	delete req.session;
	res.redirect('/');
};

exports.login_verify = function(req, res) {
	if (req.body.username == 'admin' && req.body.password == 'admin') {
		req.session = {
			login: true,
			username: req.body.username
		};
		res.redirect('/applist');
		return;
	}

	res.redirect('/login?err=1');
};

exports.applist = function(req, res) {
	AppHouse.Manager.lsApp(function(apps) {
		res.render('applist', { title: 'AppHouse Manager', AppHouse: AppHouse, apps: apps })
	});
};

exports.app = function(req, res) {
	if (!req.params.id || !req.params.action) {
		res.end();
		return;
	}

	var action = req.params.action;
	var id = req.params.id;

	/* Cannot start/stop/restart me by myself */
	if (id == AppHouse.appID) {
		res.redirect('/applist');
		return;
	}

	switch(action) {
	case 'stop':
		AppHouse.Manager.stopApp(id, function() {
			res.redirect('/applist');
		});
		break;

	case 'start':
		AppHouse.Manager.startApp(id, function() {
			res.redirect('/applist');
		});
		break;

	case 'restart':
		AppHouse.Manager.restartApp(id, function() {
			res.redirect('/applist');
		});
		break;

	}
};
