import { Router, Request, Response } from 'express';
import axios from 'axios';

const router: Router = Router();

router.get('/text', async (req: Request, res: Response) => {
  try {
    const response = await axios.get('http://localhost:3000/api/data');
    const articles: any[] = response.data; // Assuming response.data is an array of articles

    if (!Array.isArray(articles)) {
      throw new Error('Articles data is not in the expected format.');
    }

    const summariesPromises = articles.map(async (article: any) => {
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

          const summaryResponse = await axios.request(options);
          return summaryResponse.data; // Return the summary
        } else {
          return { summary: article.description }; // Return the full description as summary
        }
      } catch (error) {
        console.error(`Error summarizing article '${article.article_id}':`, error);
        return { summary: 'Summary not available' }; // Handle summarization error gracefully
      }
    });

    const summaries = await Promise.all(summariesPromises);
    res.json(summaries); // Send all summaries in one response after all requests complete
  } catch (error) {
    console.error('Error fetching or summarizing articles:', error);
    res.status(500).json({ message: 'Error fetching or summarizing articles', error: error });
  }
});

export default router;
