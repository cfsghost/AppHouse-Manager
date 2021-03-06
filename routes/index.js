var AppHouse = require('AppHouse');
var config = require('config');

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
	for (var index in config.accounts) {
		var account = config.accounts[index];
		if (req.body.username == account.username && req.body.password == account.password) {
			req.session = {
				login: true,
				username: req.body.username
			};
			res.redirect('/applist');
			return;
		}
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

	switch(action) {
	case 'stop':
		if (id == AppHouse.appID) {
			res.redirect('/applist');
			break;
		}

		AppHouse.Manager.stopApp(id, function() {
			res.redirect('/applist');
		});
		break;

	case 'start':
		if (id == AppHouse.appID) {
			res.redirect('/applist');
			break;
		}

		AppHouse.Manager.startApp(id, function() {
			res.redirect('/applist');
		});
		break;

	case 'restart':
		if (id == AppHouse.appID) {
			res.redirect('/applist');
			break;
		}

		AppHouse.Manager.restartApp(id, function() {
			res.redirect('/applist');
		});
		break;

	case 'console':
		AppHouse.Manager.getAppInfo(id, function(app) {
			res.render('console', { title: app.appName + ' Console', AppHouse: AppHouse, app: app })
		});
		break;
	}
};
