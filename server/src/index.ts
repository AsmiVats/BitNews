import express from 'express';
import cors from 'cors';
import newsroute from './routes/newsapi';
import summarizer from './routes/summarizer';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', newsroute);
app.use('/summarize',summarizer);

app.listen(3000, () => {
    console.log("server is running on port 3000");
});
