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
const express_1 = require("express");
const axios_1 = __importDefault(require("axios"));
const router = (0, express_1.Router)();
router.get('/data', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Received request for /api/data");
        const response = yield axios_1.default.get('https://newsdata.io/api/1/latest?apikey=pub_45843052893b2089cd9d534abb6ffb2b87e6b&language=en');
        const data = response.data.results.slice(0, 10);
        console.log("Received data:", data);
        res.json(data);
    }
    catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ message: 'Error fetching data', error });
    }
}));
exports.default = router;
