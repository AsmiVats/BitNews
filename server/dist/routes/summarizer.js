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
router.get('/text', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get('http://localhost:3000/api/data');
        const articles = response.data; // Assuming response.data is an array of articles
        if (!Array.isArray(articles)) {
            throw new Error('Articles data is not in the expected format.');
        }
        const summariesPromises = articles.map((article) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                // Check if article description is long enough to summarize (e.g., more than 40 words)
                const words = article.description.split(' ');
                const content = words.length > 40 ? words.slice(0, 40).join(' ') : article.description;
                if (words.length > 40) {
                    const options = {
                        method: 'POST',
                        url: 'https://api.ai21.com/studio/v1/summarize',
                        headers: {
                            'accept': 'application/json',
                            'content-type': 'application/json',
                            'Authorization': 'DgETKYHFKxyOOdJRRbYAkwuLU8EBo8uj' // Replace with your actual API key
                        },
                        data: {
                            sourceType: 'TEXT',
                            source: content // Use the adjusted content here
                        }
                    };
                    const summaryResponse = yield axios_1.default.request(options);
                    return summaryResponse.data; // Return the summary
                }
                else {
                    return { summary: article.description }; // Return the full description as summary
                }
            }
            catch (error) {
                console.error(`Error summarizing article '${article.article_id}':`, error);
                return { summary: 'Summary not available' }; // Handle summarization error gracefully
            }
        }));
        const summaries = yield Promise.all(summariesPromises);
        res.json(summaries); // Send all summaries in one response after all requests complete
    }
    catch (error) {
        console.error('Error fetching or summarizing articles:', error);
        res.status(500).json({ message: 'Error fetching or summarizing articles', error: error });
    }
}));
exports.default = router;
