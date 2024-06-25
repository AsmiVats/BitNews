import { Router, Request, Response } from 'express';
import axios from 'axios';

const router: Router = Router();

router.get('/text', async (req: Request, res: Response) => {
  try {
    const response = await axios.get('http://localhost:3000/api/data');
    const articles: any[] = response.data; 

    if (!Array.isArray(articles)) {
      throw new Error('Articles data is not in the expected format.');
    }

    const summariesPromises = articles.map(async (article: any) => {
      try {
     
        const words = article.description.split(' ');
        const content = words.length > 40 ? words.slice(0, 40).join(' ') : article.description;

        if (words.length > 40) {
          const options = {
            method: 'POST',
            url: 'https://api.ai21.com/studio/v1/summarize',
            headers: {
              'accept': 'application/json',
              'content-type': 'application/json',
              'Authorization': 'DgETKYHFKxyOOdJRRbYAkwuLU8EBo8uj'
            },
            data: {
              sourceType: 'TEXT',
              source: content 
            }
          };

          const summaryResponse = await axios.request(options);
          return summaryResponse.data; 
        } else {
          return { summary: article.description }; 
        }
      } catch (error) {
        console.error(`Error summarizing article '${article.article_id}':`, error);
        return { summary: 'Summary not available' }; 
      }
    });

    const summaries = await Promise.all(summariesPromises);
    res.json(summaries); 
  } catch (error) {
    console.error('Error fetching or summarizing articles:', error);
    res.status(500).json({ message: 'Error fetching or summarizing articles', error: error });
  }
});

export default router;
