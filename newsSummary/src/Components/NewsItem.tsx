import React, {useState} from 'react';
import ReactCardFlip from 'react-card-flip';

interface NewsItemProps {
  title: string;
  description: string;
  link: string; 
  summary:string
}

const NewsItem: React.FC<NewsItemProps> = ({ title, description, link,summary }) => {

  const [isFlipped, setIsFlipped] = useState<Boolean>(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsFlipped(!isFlipped);
  };

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
    <div key="front">
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-gray-700">{description}</p>
        <a href={link} className="text-blue-500 hover:underline inline-block mt-2">
          Know More
        </a>
      </div>
    </div>      <button onClick={handleClick}>Click to flip</button>
    </div>

    <div key="back">
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6 p-4">
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-gray-700">{summary}</p>
          <button onClick={handleClick} className="mt-4 text-blue-500 hover:underline">
            Click to flip
          </button>
        </div>
      </div>
  </ReactCardFlip>
  );
};

export default NewsItem;
