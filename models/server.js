const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const cors = require("cors");

const Sockets = require("./sockets");

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;

		// Http server
		this.server = http.createServer(this.app);

		// Sockets config
		this.io = socketio(this.server, {
			/* config */
		});
	}

	middlewares() {
		// Serve public directory
		this.app.use(express.static(path.resolve(__dirname, "../public")));
		// CORS
		this.app.use(cors());
	}

	setupSockets() {
		new Sockets(this.io);
	}

	execute() {
		// Init Middlewares
		this.middlewares();

		// Init sockets
		this.setupSockets();

		// Init Server
		this.server.listen(this.port, () => {
			console.log("Running on port:", this.port);
		});
	}
}

module.exports = Server;
