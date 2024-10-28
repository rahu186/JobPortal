import React from 'react';
import { useNavigate } from 'react-router-dom';

const Games = () => {
  const navigate = useNavigate();

  // Sample game data - ensure image paths are correct
  const games = [
    { id: 1, title: 'Flames', image: '/images/games_bg_img.jpg' },
    { id: 2, title: 'Truth & Dare', image: '/images/games_bg_img.jpg' },
    // Add more games if needed
  ];

  const handleGameClick = (title) => {
    // Convert the title to lowercase and replace spaces with dashes for the URL
    const formattedTitle = title.toLowerCase().replace(/\s+/g, '-');
    navigate(`/games/${formattedTitle}`); // Navigates to the corresponding game page
  };

  return (
    <div className="bg-[#706767] flex justify-center items-start min-h-screen px-4 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-screen-xl">
        {games.map((game) => (
          <div
            key={game.id}
            className="relative flex justify-center items-center bg-white rounded h-40 w-full cursor-pointer overflow-hidden"
            onClick={() => handleGameClick(game.title)} // Handles game click
            style={{
              backgroundImage: `url(${game.image})`, // Sets the background image
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="bg-black bg-opacity-50 text-white text-center p-2 rounded">
                {game.title} {/* Displays game title */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Games;
