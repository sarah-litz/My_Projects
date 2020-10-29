"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
app.use('*', (req, res) => res.send('Hello!'));
app.listen(4000, () => {
    console.log('Starting backend on port 4000.');
});
