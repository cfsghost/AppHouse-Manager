var AppHouse = require('AppHouse');
var io = require('socket.io');
var parseCookie = require('connect').utils.parseCookie;

exports.createServer = function(app) {
	/* Create a Socket.IO instance, to establish WebSocket Service */
	var socket = io.listen(app);

	socket.set('authorization', function (data, accept) {
		if (data.headers.cookie) {
			data.cookie = parseCookie(data.headers.cookie);
			data.sessionID = data.cookie['express.sid'];
		} else {
			return accept('No cookie transmitted.', false);
		}

		accept(null, true);
	});

	socket.on('connection', function(client) {
		var currentAppID = null;

		client.on('console', function(appID) {
			currentAppID = appID;

			AppHouse.Manager.watchLog(appID, function(lines) {
				if (!lines)
					return false;

				client.emit('console', lines);
	
				return true;
			});
		});

		client.on('disconnect', function() {
			if (currentAppID != null)
				AppHouse.Manager.unwatchLog(currentAppID);
		});
	});
};
