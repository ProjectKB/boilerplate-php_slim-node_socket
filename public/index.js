import { createServer } from "http";
import express from "express";
import { Server } from "socket.io";
import winston from "winston";

const logger = winston.createLogger({
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({format: winston.format.simple()}),
        // new winston.transports.File({ filename: 'error.log', level: 'error' }),
        // new winston.transports.File({ filename: 'combined.log' }),
    ],
});

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

io.on("connection", socket => {
    logger.info(`${socket.id} is connected!`);

    socket.on("new_order", data => {
        logger.info(`${socket.id} is emitting!`);

        io.emit("new_order", data);
    });
});



httpServer.listen(3001);
