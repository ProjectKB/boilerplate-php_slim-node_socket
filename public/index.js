import {createServer} from "http";
import express from "express";
import {Server} from "socket.io";
import winston from "winston";

const logger = winston.createLogger({
    format: winston.format.json(),
    transports: [new winston.transports.Console({format: winston.format.simple()}), // new winston.transports.File({ filename: 'error.log', level: 'error' }),
        // new winston.transports.File({ filename: 'combined.log' }),
    ],
});

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

let connections = [];

io.on("connection", socket => {
    socket.on("userConnect", data => {
        logger.info(`${data.username} is connected!`);
        logger.info(`${data.username} is emitting!`);

        socket.join('jack');
        connections['jack'] = socket.id;

        io.emit("userConnect", data);
    });

    socket.on("joinRoom", data => {
        if (connections['jack']) {
            socket.join('jack');
        }
    });

    socket.on("clientMsg", data => {
        // logger.info(io.to('jack'));

        io.to('jack').emit("serverMsg", data);
        // socket.to('jack').emit("serverMsg", data);
        // socket.emit("serverMsg", data);
    });
});


httpServer.listen(3001);
