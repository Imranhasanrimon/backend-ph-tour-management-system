/* eslint-disable no-console */
import mongoose from "mongoose";
import app from "./app";
import { Request, Response } from "express";
import { Server } from "http"
import { envVars } from "./app/config/env";


app.get("/", (req: Request, res: Response) => {
    res.send({
        success: true,
        message: "This is the home route of PH Tour Management Backend Application"
    })
})

let server: Server
const startServer = async () => {
    try {
        await mongoose.connect(envVars.DB_URL)
        console.log("Connected To DB 🛢️");

        server = app.listen(envVars.PORT, () => {
            console.log(`Server is running on port ${envVars.PORT}`);
        })

    } catch (error) {
        console.log(error);
    }
}

startServer()

process.on("SIGTERM", () => {
    console.log("SIGTERM signal received.. Server shutting down...");

    if (server) {
        server.close(() => {
            process.exit(1)
        })
    }

    process.exit(1)
})

process.on("SIGINT", () => {
    console.log("SIGINT signal received.. Server shutting down...");

    if (server) {
        server.close(() => {
            process.exit(1)
        })
    }

    process.exit(1)
})

process.on("unhandledRejection", (err) => {
    console.log("Unhandled Rejection detected.. Server shutting down...", err);

    if (server) {
        server.close(() => {
            process.exit(1)
        })
    }

    process.exit(1)
})

process.on("uncaughtException", (err) => {
    console.log("uncaughtException detected.. Server shutting down...", err);

    if (server) {
        server.close(() => {
            process.exit(1)
        })
    }

    process.exit(1)
})

// unhandledRejection Error
// Promise.reject(new Error("I forgot to catch this promise"))

// uncaughtException Error
// throw new Error("I forgot to handle this local error")


// SIGTERM, SIGINT, unhandledRejection, uncaughtException these are server error handler