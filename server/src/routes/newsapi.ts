import { Router, Request, Response } from 'express';
import axios from 'axios';

const router: Router = Router();

router.get('/data', async (req: Request, res: Response) => {
  try {
    console.log("Received request for /api/data"); 
    const response = await axios.get('https://newsdata.io/api/1/latest?apikey=pub_45843052893b2089cd9d534abb6ffb2b87e6b&language=en'); 
    const data = response.data.results.slice(0, 10);
    console.log("Received data:", data); 
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error); 
    res.status(500).json({ message: 'Error fetching data', error });
  }
});

export default router;
