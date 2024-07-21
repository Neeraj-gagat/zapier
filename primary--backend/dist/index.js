"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.post("/zapier/create/zap", (req, res) => {
    console.log("up and running");
    res.json({
        message: "api working"
    });
});
app.listen(3000);
