const { io } = require("socket.io-client");

let socket = io("http://172.16.200.93:3001", {})

export const Socket = socket