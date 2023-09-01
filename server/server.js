const http = require("http");
const cors = require("cors");
const express = require("express");
const socketIO = require("socket.io");

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketIO(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
	},
});

const PORT = 5050;

const waitingUsers = [];

io.on("connection", (socket) => {
	console.log(`${socket.id} user connected`);

	socket.on("findPartner", (data) => {
		const existingUserIndex = waitingUsers.findIndex(
			(user) => user.socketId === data.socketId
		);

		if (existingUserIndex === -1) {
			waitingUsers.push(data);
			console.log(`${data.socketId} finding partner`);
			tryToMatch(socket);
		} else {
			console.log(`${data.socketId} is already waiting for a partner.`);
		}
	});

	socket.on("sendMessage", ({ message, room, socketId }) => {
		console.log(message);
		console.log(room);
		io.to(room).emit("receiveMessage", {
			message: message,
			socketId: socketId,
		});
	});

	socket.on("disconnect", () => {
		console.log(`${socket.id} disconnected`);
		socket.removeAllListeners("startChat");
	});
});

function tryToMatch(socket) {
	if (waitingUsers.length >= 2) {
		const user1 = waitingUsers.shift();
		const user2 = waitingUsers.shift();

		const roomName = `${user1.socketId}-${user2.socketId}`;
		socket.join(roomName);

		console.log(`room created : ${roomName}`);

		io.to(user1.socketId).emit("startChat", {
			partner: user2,
			room: roomName,
		});
		io.to(user2.socketId).emit("startChat", {
			partner: user1,
			room: roomName,
		});
	}
}

server.listen(PORT, () => {
	console.log("serv started");
});
