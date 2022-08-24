import {io} from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";

const socketButton = document.querySelector('#socketButton');

const socket = io.connect("http://localhost:3001")

socket.on('userConnect', () => {
    socket.emit('joinRoom', [{username: "jack"}]);
})

socket.emit('joinRoom', [{username: "jack"}]);

socket.on("serverMsg", data => {
    console.log(data);
})

socketButton.addEventListener('click', () => {
    socket.emit("clientMsg", {
        body: "SOCKET BUTTON HAVE BEEN PRESSED!",
    });
})