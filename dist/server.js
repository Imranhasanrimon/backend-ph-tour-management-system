"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
app_1.default.get("/", (req, res) => {
    res.send({
        success: true,
        message: "This is the home route of PH Tour Management Backend Application"
    });
});
let server;
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect("mongodb+srv://common:common@cluster0.7hbnv.mongodb.net/tour-management?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Connected To DB 🛢️");
        server = app_1.default.listen(5000, () => {
            console.log("Server is running on port 5000");
        });
    }
    catch (error) {
        console.log(error);
    }
});
startServer();
process.on("SIGTERM", () => {
    console.log("SIGTERM signal received.. Server shutting down...");
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
process.on("SIGINT", () => {
    console.log("SIGINT signal received.. Server shutting down...");
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
process.on("unhandledRejection", (err) => {
    console.log("Unhandled Rejection detected.. Server shutting down...", err);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
process.on("uncaughtException", (err) => {
    console.log("uncaughtException detected.. Server shutting down...", err);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
// unhandledRejection Error
// Promise.reject(new Error("I forgot to catch this promise"))
// uncaughtException Error
// throw new Error("I forgot to handle this local error")
// SIGTERM, SIGINT, unhandledRejection, uncaughtException these are server error handler
