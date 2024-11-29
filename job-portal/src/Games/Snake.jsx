import React, { useState, useEffect } from 'react';

const Snake = () => {
  const gridSize = 10; // 10x10 grid
  const [snake, setSnake] = useState([{ x: 2, y: 2 }]); // Initial snake position
  const [food, setFood] = useState({ x: 5, y: 5 }); // Initial food position
  const [direction, setDirection] = useState('RIGHT');
  const [gameOver, setGameOver] = useState(false);

  // Set the next direction based on the arrow key pressed
  const handleKeyPress = (e) => {
    if (e.key === 'ArrowUp' && direction !== 'DOWN') setDirection('UP');
    if (e.key === 'ArrowDown' && direction !== 'UP') setDirection('DOWN');
    if (e.key === 'ArrowLeft' && direction !== 'RIGHT') setDirection('LEFT');
    if (e.key === 'ArrowRight' && direction !== 'LEFT') setDirection('RIGHT');
  };

  // Move the snake when the user presses a key
  const moveSnake = () => {
    const newSnake = [...snake];
    const head = { ...newSnake[0] };

    if (direction === 'UP') head.y -= 1;
    if (direction === 'DOWN') head.y += 1;
    if (direction === 'LEFT') head.x -= 1;
    if (direction === 'RIGHT') head.x += 1;

    newSnake.unshift(head);

    // Check if snake ate food
    if (head.x === food.x && head.y === food.y) {
      setFood({
        x: Math.floor(Math.random() * gridSize),
        y: Math.floor(Math.random() * gridSize),
      });
    } else {
      newSnake.pop();
    }

    // Check collision with walls or itself
    if (
      head.x < 0 ||
      head.x >= gridSize ||
      head.y < 0 ||
      head.y >= gridSize ||
      newSnake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y)
    ) {
      setGameOver(true);
      return;
    }

    setSnake(newSnake);
  };

  // Render the grid and check for key events to move the snake
  useEffect(() => {
    if (gameOver) return;

    const handleGameMovement = (e) => {
      if (!gameOver) {
        moveSnake();
      }
    };

    // Listen to the key events when the game is not over
    window.addEventListener('keydown', handleKeyPress);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [direction, snake, food, gameOver]);

  // Render the game board
  const renderBoard = () => {
    const cells = [];
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        const isSnake =
          snake.some((segment) => segment.x === x && segment.y === y) && !gameOver;
        const isFood = food.x === x && food.y === y && !gameOver;
        cells.push(
          <div
            key={`${x}-${y}`}
            className={`w-6 h-6 ${isSnake ? 'bg-green-500' : ''} ${isFood ? 'bg-red-500' : ''} border`}
          />
        );
      }
    }
    return cells;
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Snake Game</h1>
        <div className="bg-black grid grid-cols-10 grid-rows-10 gap-1 p-1 w-max">
          {renderBoard()}
        </div>
        {gameOver && <p className="text-red-500 mt-4">Game Over!</p>}
      </div>
    </div>
  );
};

export default Snake;
