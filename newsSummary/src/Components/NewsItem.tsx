import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';

interface NewsItemProps {
  title: string;
  description: string;
  link: string;
  summary: string;
}

const NewsItem: React.FC<NewsItemProps> = ({ title, description, link, summary }) => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsFlipped(!isFlipped);
  };

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
      {/* Front of the card */}
      <div key="front" className="card bg-white rounded-lg shadow-md overflow-hidden mb-6 h-full flex flex-col">
        <div className="p-4 flex-1">
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-gray-700">{description}</p>
          <a href={link} className="text-blue-500 hover:underline mt-2 inline-block">
            Know More
          </a>
        </div>
        <button onClick={handleClick} className="btn mt-auto mb-4 mx-auto block text-blue-500 hover:underline">
          Click to flip
        </button>
      </div>

      {/* Back of the card */}
      <div key="back" className="card bg-white rounded-lg shadow-md overflow-hidden mb-6 h-full flex flex-col">
        <div className="p-4 flex-1">
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-gray-700">{summary}</p>
        </div>
        <button onClick={handleClick} className="btn mt-4 mx-auto block text-blue-500 hover:underline">
          Click to flip back
        </button>
      </div>
    </ReactCardFlip>
  );
};

export default NewsItem;
