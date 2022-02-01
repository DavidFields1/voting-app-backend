const BandList = require("./band-list");

class Sockets {
	constructor(io) {
		this.io = io;
		this.bandList = new BandList();

		this.socketEvents();
	}

	socketEvents() {
		this.io.on("connection", (socket) => {
			socket.emit("band-list", this.bandList.getBands());

			socket.on("band-voted", (id) => {
				this.bandList.increaseVotes(id);
				this.io.emit("band-list", this.bandList.getBands());
			});

			socket.on("change-name", (id, newName) => {
				this.bandList.changeBandName(id, newName);
				this.io.emit("band-list", this.bandList.getBands());
			});

			socket.on("add-band", (name) => {
				this.bandList.addBand(name);
				this.io.emit("band-list", this.bandList.getBands());
			});

			socket.on("remove-band", (id) => {
				this.bandList.removeBand(id);
				this.io.emit("band-list", this.bandList.getBands());
			});
		});
	}
}

module.exports = Sockets;
