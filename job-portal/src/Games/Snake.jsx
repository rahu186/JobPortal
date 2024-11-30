import React, { useRef, useEffect, useState } from "react";

const Snake = () => {
  const canvasRef = useRef(null); // Reference to the canvas
  const [context, setContext] = useState(null); // Canvas context

  const canvasWidth = 600; // Canvas width
  const canvasHeight = 600; // Canvas height
  const boxSize = 30; // Box size for snake and food

  const initialSnake = [{ x: 10 * boxSize, y: 10 * boxSize }]; // Snake starts at center
  const initialFood = { x: randomCoord(), y: randomCoord() };

  // State
  const [snake, setSnake] = useState(initialSnake); // Snake position
  const [food, setFood] = useState(initialFood); // Food position
  const [direction, setDirection] = useState("RIGHT"); // Snake direction
  const [isGameRunning, setIsGameRunning] = useState(false); // Game status
  const [score, setScore] = useState(0); // Score counter

  // Generate random coordinates for food
  function randomCoord() {
    return Math.floor(Math.random() * (canvasWidth / boxSize)) * boxSize;
  }

  // Draw the game (snake and food)
  const drawGame = () => {
    if (!context) return;

    // Create a new image object for the background
    const backgroundImage = new Image();
    backgroundImage.src = "/images/canvasBG.png"; // Specify the path to your background image

    // Draw the background once the image is loaded
    backgroundImage.onload = () => {
      context.clearRect(0, 0, canvasWidth, canvasHeight); // Clear the canvas
      context.drawImage(backgroundImage, 0, 0, canvasWidth, canvasHeight); // Draw the background image

      // Draw the food
      context.fillStyle = "red";
      context.fillRect(food.x, food.y, boxSize, boxSize);

      // Draw the snake (with distinct head and body texture)
      snake.forEach((segment, index) => {
        if (index === snake.length - 1) {
          // Draw the head with the custom image
          const snakeHeadImg = new Image();
          snakeHeadImg.src = "/images/snakeHead.png"; // Path to your custom snake head image

          // Ensure image is loaded before drawing it
          snakeHeadImg.onload = () => {
            let angle = 0;
            switch (direction) {
              case "UP":
                angle = Math.PI * 1.5;
                break;
              case "DOWN":
                angle = Math.PI / 2;
                break;
              case "LEFT":
                angle = Math.PI;
                break;
              case "RIGHT":
                angle = 0;
                break;
              default:
                break;
            }

            context.save();
            context.translate(segment.x + boxSize / 2, segment.y + boxSize / 2);
            context.rotate(angle);
            context.drawImage(
              snakeHeadImg,
              -boxSize / 2,
              -boxSize / 2,
              boxSize,
              boxSize
            );
            context.restore();
          };
        } else {
            // Draw the body with capsule shape
          context.save();
          context.fillStyle = "lightgreen";
          const prevSegment = snake[index + 1] || { x: 0, y: 0 }; // Get the segment in front

          // Calculate offset to simulate the body under the previous node
          const dx = prevSegment.x - segment.x;
          const dy = prevSegment.y - segment.y;
          const angle = Math.atan2(dy, dx); // Angle between current and next segment

          context.translate(segment.x + boxSize / 2, segment.y + boxSize / 2);
          context.rotate(angle);

          // Draw the capsule (rounded rectangle)
          const radius = boxSize / 2;
          context.beginPath();
          context.moveTo(-boxSize / 2, -radius); // Start point at top-left corner
          context.arcTo(boxSize / 2, -radius, boxSize / 2, radius, radius); // Top right corner
          context.arcTo(boxSize / 2, radius, -boxSize / 2, radius, radius); // Bottom right corner
          context.arcTo(-boxSize / 2, radius, -boxSize / 2, -radius, radius); // Bottom left corner
          context.arcTo(-boxSize / 2, -radius, boxSize / 2, -radius, radius); // Top left corner
          context.closePath();
          context.fill(); // Fill the capsule with the body color

          context.restore();
        }
      });
    };
  };

  // Move the snake
  const moveSnake = () => {
    if (!isGameRunning) return;

    const newSnake = [...snake];
    const head = newSnake[newSnake.length - 1];

    let newHead;
    switch (direction) {
      case "UP":
        newHead = { x: head.x, y: head.y - boxSize };
        break;
      case "DOWN":
        newHead = { x: head.x, y: head.y + boxSize };
        break;
      case "LEFT":
        newHead = { x: head.x - boxSize, y: head.y };
        break;
      case "RIGHT":
        newHead = { x: head.x + boxSize, y: head.y };
        break;
      default:
        return;
    }

    // Add new head to the snake
    newSnake.push(newHead);

    // Check for collision with food
    if (newHead.x === food.x && newHead.y === food.y) {
      setFood({ x: randomCoord(), y: randomCoord() }); // Place food in a new location
      setScore((prevScore) => prevScore + 1); // Increment the score
    } else {
      newSnake.shift(); // Remove the tail if food not eaten
    }

    // Check for collision with walls or itself
    const isCollision =
      newHead.x < 0 || // Collided with the left wall
      newHead.y < 0 || // Collided with the top wall
      newHead.x >= canvasWidth || // Collided with the right wall
      newHead.y >= canvasHeight || // Collided with the bottom wall
      newSnake
        .slice(0, -1)
        .some(
          (segment) => segment.x === newHead.x && segment.y === newHead.y
        ); // Collided with itself

    if (isCollision) {
      // Allow the last movement to be rendered
      setSnake([...newSnake, newHead]); // Add the last head position
      setIsGameRunning(false); // Stop the game immediately
      setTimeout(() => {
        alert(`Game Over! Final Score: ${score}. Click Play Again to restart.`);
      }, 100); // Add delay before showing the alert
      return; // Stop further updates
    }

    setSnake(newSnake);
  };

  // Handle key presses to change direction
  const handleKeyDown = (e) => {
    if (!isGameRunning) return;

    switch (e.key) {
      case "ArrowUp":
        if (direction !== "DOWN") setDirection("UP");
        break;
      case "ArrowDown":
        if (direction !== "UP") setDirection("DOWN");
        break;
      case "ArrowLeft":
        if (direction !== "RIGHT") setDirection("LEFT");
        break;
      case "ArrowRight":
        if (direction !== "LEFT") setDirection("RIGHT");
        break;
      default:
        break;
    }
  };

  // Game loop
  useEffect(() => {
    const interval = setInterval(() => {
      moveSnake();
      drawGame();
    }, 100); // Change to 100ms to increase speed

    return () => clearInterval(interval);
  }, [snake, direction, isGameRunning]);

  // Initialize canvas and key event listeners
  useEffect(() => {
    const canvas = canvasRef.current;
    setContext(canvas.getContext("2d"));

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction, isGameRunning]);

  // Start or Restart the game
  const startGame = () => {
    setSnake(initialSnake); // Reset snake to center
    setFood(initialFood); // Reset food position
    setDirection("RIGHT"); // Reset direction
    setIsGameRunning(true); // Start the game
    setScore(0); // Reset score to 0
  };

  return (
    <div
      style={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Snake Game</h1>
      {/* Score display */}
      <h2>Score: {score}</h2>

      {/* Play Button Above the Canvas */}
      {!isGameRunning && (
        <button
          onClick={startGame}
          style={{
            marginBottom: "20px",
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {snake.length === 1 ? "Play" : "Play Again"}
        </button>
      )}

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        style={{
          border: "1px solid black",
          backgroundColor: "#333", // Fallback color if the image doesn't load
        }}
      />
    </div>
  );
};

export default Snake;
