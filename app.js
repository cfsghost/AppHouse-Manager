
/**
 * Module dependencies.
 */

var express = require('express'),
	CookieStore = require('cookie-sessions'),
	consoleServer = require('./console');
	routes = require('./routes');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(CookieStore({ secret: 'FredIsAGoodGUY' }));
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
	app.use(express.errorHandler());
});

function auth(req, res, next) {
	if (req.session) {
		if (req.session.login) {
			next();
			return;
		}
	}

	res.redirect('/login');
}

consoleServer.createServer(app);

// Routes

app.get('/', routes.index);
app.get('/login', routes.login);
app.get('/logout', routes.logout);
app.post('/login_verify', routes.login_verify);
app.get('/applist', auth, routes.applist);
app.get('/app/:id/:action', auth, routes.app);

app.listen(80);
console.log("AppHouse-Manager listening on port %d in %s mode", app.address().port, app.settings.env);
