import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";

let socket = io.connect("http://localhost:3001");

socket.on("new_order", data => {
    console.log(data);
})