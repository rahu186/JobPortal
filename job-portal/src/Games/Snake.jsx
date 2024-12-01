import React, { useRef, useEffect, useState } from "react";

const Snake = () => {
  const canvasRef = useRef(null);
  const [context, setContext] = useState(null);

  const [canvasWidth, setCanvasWidth] = useState(600); // Initially set to a fixed size
  const [canvasHeight, setCanvasHeight] = useState(600);
  const boxSize = 30;

  const initialSnake = [{ x: 10 * boxSize, y: 10 * boxSize }];
  const initialFood = { x: randomCoord(), y: randomCoord() };

  const [snake, setSnake] = useState(initialSnake);
  const [food, setFood] = useState(initialFood);
  const [direction, setDirection] = useState("RIGHT");
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [cameraPosition, setCameraPosition] = useState({ x: 0, y: 0 });

  const snakeHeadImage = useRef(new Image()); // Image reference
  const [isImageLoaded, setIsImageLoaded] = useState(false); // State to check if the image is loaded

  snakeHeadImage.current.src = "/images/snakeHead.png"; // Path to your image
  snakeHeadImage.current.onload = () => {
    setIsImageLoaded(true); // Set the image loaded state to true when the image is fully loaded
  };

  function randomCoord() {
    const x = Math.floor(Math.random() * (canvasWidth / boxSize)) * boxSize;
    const y = Math.floor(Math.random() * (canvasHeight / boxSize)) * boxSize;
    return { x, y };
  }

  const getRotationAngle = (direction) => {
    switch (direction) {
      case "UP":
        return -90; // Rotate 90 degrees counterclockwise
      case "DOWN":
        return 90; // Rotate 90 degrees clockwise
      case "LEFT":
        return 180; // Rotate 180 degrees
      case "RIGHT":
        return 0; // No rotation (default)
      default:
        return 0;
    }
  };

  const drawGame = () => {
    if (!context || !isImageLoaded) return; // Ensure the image is loaded before drawing

    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.translate(-cameraPosition.x, -cameraPosition.y);

    // Draw food
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, boxSize, boxSize);

    // Draw snake
    snake.forEach((segment, index) => {
      if (index === snake.length - 1) {
        // Rotate the head based on the current direction
        const angle = getRotationAngle(direction);
        context.save(); // Save the current state
        context.translate(segment.x + boxSize / 2, segment.y + boxSize / 2); // Move the context to the snake's head position
        context.rotate((angle * Math.PI) / 180); // Rotate the context to the angle in radians
        context.drawImage(snakeHeadImage.current, -boxSize / 2, -boxSize / 2, boxSize, boxSize); // Draw the image centered at the new position
        context.restore(); // Restore the context to its original state
      } else {
        context.fillStyle = "lightgreen";
        context.beginPath();
        context.arc(segment.x + boxSize / 2, segment.y + boxSize / 2, boxSize / 2, 0, 2 * Math.PI);
        context.fill();
      }
    });
  };

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

    newSnake.push(newHead);

    if (newHead.x === food.x && newHead.y === food.y) {
      setFood(randomCoord()); // Generate new food
      setScore((prevScore) => prevScore + 1);
    } else {
      newSnake.shift(); // Remove the tail
    }

    // Collision detection
    const isCollision =
      newHead.x < 0 || newHead.y < 0 || newHead.x >= canvasWidth || newHead.y >= canvasHeight ||
      newSnake.slice(0, -1).some((segment) => segment.x === newHead.x && segment.y === newHead.y);

    if (isCollision) {
      setSnake([...newSnake, newHead]);
      setIsGameRunning(false);
      setTimeout(() => {
        alert(`Game Over! Final Score: ${score}. Click Play Again to restart.`);
      }, 100);
      return;
    }

    setSnake(newSnake);

    // Update camera position to follow the snake
    const newCameraPosition = {
      x: Math.max(0, Math.min(newHead.x - canvasWidth / 2 + boxSize / 2, canvasWidth - canvasWidth)),
      y: Math.max(0, Math.min(newHead.y - canvasHeight / 2 + boxSize / 2, canvasHeight - canvasHeight)),
    };

    setCameraPosition(newCameraPosition);
  };

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

  const handleTouchMove = (e) => {
    if (!isGameRunning) return;
    const touch = e.touches[0];
    const touchX = touch.clientX;
    const touchY = touch.clientY;
    const canvasRect = canvasRef.current.getBoundingClientRect();

    const xPos = touchX - canvasRect.left;
    const yPos = touchY - canvasRect.top;

    if (xPos < canvasWidth / 3 && direction !== "RIGHT") {
      setDirection("LEFT");
    } else if (xPos > canvasWidth * 2 / 3 && direction !== "LEFT") {
      setDirection("RIGHT");
    } else if (yPos < canvasHeight / 3 && direction !== "DOWN") {
      setDirection("UP");
    } else if (yPos > canvasHeight * 2 / 3 && direction !== "UP") {
      setDirection("DOWN");
    }
  };

  const handleTouchStart = (e) => {
    e.preventDefault(); // Prevent default touch behavior like scrolling
    handleTouchMove(e);
  };

  const handleTouchEnd = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      moveSnake();
      drawGame();
    }, 100);

    return () => clearInterval(interval);
  }, [snake, direction, isGameRunning]);

  useEffect(() => {
    const canvas = canvasRef.current;
    setContext(canvas.getContext("2d"));

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    // Resize canvas based on window size
    const handleResize = () => {
      const width = window.innerWidth * 0.9;
      const height = window.innerHeight * 0.6;
      setCanvasWidth(width);
      setCanvasHeight(height);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("resize", handleResize);
    };
  }, [direction, isGameRunning]);

  const startGame = () => {
    setSnake(initialSnake);
    setFood(initialFood);
    setDirection("RIGHT");
    setIsGameRunning(true);
    setScore(0);
    setCameraPosition({ x: 0, y: 0 });
  };

  return (
    <div>
      <h2>Score: {score}</h2>
      <button onClick={startGame} disabled={isGameRunning}>
        Start Game
      </button>
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        style={{ border: "1px solid black", backgroundColor: "black" }}
      />
    </div>
  );
};

export default Snake;
