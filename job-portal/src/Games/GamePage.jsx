import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Flames from './Flames';
import TruthDare from './TruthDare';
import Snake from './Snake';

const GamePage = () => {
  const { gameName } = useParams(); // Get the game name from the URL parameters
  const [game, setGame] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch game details based on the game name
    // console.log("Fetching game:", gameName);
    fetch(`https://jobportal-slg2.onrender.com/games/${gameName}`)
    
    
      .then((response) => {
        // Check if the response is not OK
        if (!response.ok) {
          throw new Error(`Failed to fetch game details: ${response.status} ${response.statusText}`);
        }
        // Check if the response content type is JSON
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not JSON");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Game data:", data);
        setGame(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setError(err.message);
        setIsLoading(false);
      });
  }, [gameName]);

  // Handle loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Check if game data is available before rendering
  if (!game) {
    return <div>No game data found</div>;
  }

  // Render the specific game component based on the title
  const renderGameComponent = () => {
    switch (game.title.toLowerCase()) {
      case 'flames':
        return <Flames />;
      case 'truth & dare':
        return <TruthDare />;
      case 'snake':
        return <Snake/>;
      // Add more cases for additional games here
      default:
        return <div>Game component not found</div>;
    }
  };

  return (
    <div className="bg-[#272525] flex justify-center items-start min-h-screen px-4 py-12">
      <div className="grid grid-cols-1 gap-8 w-full max-w-screen-xl">
        {/* First row: Title and Description */}
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold text-white">{game.title}</h1>
          <p className="text-lg text-white text-center">{game.description}</p>
        </div>
        
        {/* Second row: Game component */}
        <div className="flex justify-center">
          {renderGameComponent()} {/* Conditionally render the game component */}
        </div>
      </div>
    </div>
  );
};

export default GamePage;
