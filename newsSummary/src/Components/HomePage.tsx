
const HomePage = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center font-sans bg-gradient-to-t from-[#8EC5FC]  to-[#E0C3FC]">
      <header className="w-full text-center">
        <h1 className="text-6xl font-bold leading-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#C850C0]  to-[#2B86C5]">
          Welcome to My Homepage
        </h1>
        
      </header>
      <div className="absolute bottom-10 flex flex-col items-center space-y-4">
        <svg
          className="w-12 h-12 text-white animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
        <svg
          className="w-18 h-18 text-white animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>
    </div>
  );
};

export default HomePage;
