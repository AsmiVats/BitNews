import NewsItem from './NewsItem';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface News {
  title: string;
  description: string;
  link: string;
}

const NewsSection: React.FC = () => {
  const [newsData, setNewsData] = useState<News[]>([]);
  const [summaries, setSummaries] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch news data
        const newsResponse = await axios.get<News[]>('http://localhost:3000/api/data');
        setNewsData(newsResponse.data);

        // Fetch summaries
        const summaryResponse = await axios.get<string[]>('http://localhost:3000/summarize/text');
        setSummaries(summaryResponse.data);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Latest News</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsData.map((news, index) => (
            <NewsItem
              key={index}
              title={news.title}
              description={news.description}
              link={news.link}
              summary={summaries[index]} // Pass corresponding summary to NewsItem
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsSection;
