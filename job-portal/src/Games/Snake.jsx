import React, { useRef, useEffect, useState } from "react";
import { MdArrowUpward, MdArrowDownward, MdArrowBack, MdArrowForward } from 'react-icons/md';

const Snake = () => {
  const canvasRef = useRef(null);
  const [context, setContext] = useState(null);
  const [modalVisible, setModalVisible] = useState(false); // New state for modal visibility
  const [modalMessage, setModalMessage] = useState(""); // Store modal message

  // Adjust canvas dimensions and box size for mobile responsiveness
  const canvasWidth = window.innerWidth > 600 ? 400 : window.innerWidth - 50;
  const canvasHeight = window.innerWidth > 600 ? 400 : window.innerHeight - 60;
  const boxSize = window.innerWidth > 600 ? 20 : 18; // Make snake and food smaller on mobile

  const initialSnake = [{ x: 10 * boxSize, y: 10 * boxSize }];
  const initialFood = {
    x: Math.floor(Math.random() * (canvasWidth / boxSize)) * boxSize,
    y: Math.floor(Math.random() * (canvasHeight / boxSize)) * boxSize,
  };

  const [snake, setSnake] = useState(initialSnake);
  const [food, setFood] = useState(initialFood);
  const [direction, setDirection] = useState("RIGHT");
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false); // New state for pause
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(100); // Initial speed in milliseconds
  const [highestScore, setHighestScore] = useState(
    localStorage.getItem("highestScore") || 0
  ); // Get highest score from localStorage

  const drawGame = () => {
    if (!context) return;

    context.clearRect(0, 0, canvasWidth, canvasHeight);

    // Draw food
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, boxSize, boxSize);

    // Draw snake
    context.fillStyle = "green";
    snake.forEach((segment) => {
      context.fillRect(segment.x, segment.y, boxSize, boxSize);
    });
  };

  const moveSnake = () => {
    if (!isGameRunning || isPaused) return; // Stop movement if game is paused

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

    // Collision detection
    const isCollision =
      newHead.x < 0 ||
      newHead.y < 0 ||
      newHead.x >= canvasWidth ||
      newHead.y >= canvasHeight ||
      newSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y);

    if (isCollision) {
      setSnake([...newSnake, newHead]); // Update snake to include the head (for visual feedback)
      setIsGameRunning(false);
      // Check and update highest score
      if (score > highestScore) {
        localStorage.setItem("highestScore", score);
        setHighestScore(score);
      }
      setModalMessage(`Game Over! Final Score: ${score}.`);
      setModalVisible(true); // Show the modal
      return;
    }

    // Update snake only if no collision
    newSnake.push(newHead);

    if (newHead.x === food.x && newHead.y === food.y) {
      setFood({
        x: Math.floor(Math.random() * (canvasWidth / boxSize)) * boxSize,
        y: Math.floor(Math.random() * (canvasHeight / boxSize)) * boxSize,
      });
      setScore((prevScore) => prevScore + 1);
    } else {
      newSnake.shift(); // Remove the tail
    }

    setSnake(newSnake);
  };

  const handleKeyDown = (e) => {
    e.preventDefault();
    if (!isGameRunning || isPaused) return;

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

  const handleButtonClick = (newDirection) => {
   
    if (!isGameRunning || isPaused) return;

    switch (newDirection) {
      case "UP":
        if (direction !== "DOWN") setDirection("UP");
        break;
      case "DOWN":
        if (direction !== "UP") setDirection("DOWN");
        break;
      case "LEFT":
        if (direction !== "RIGHT") setDirection("LEFT");
        break;
      case "RIGHT":
        if (direction !== "LEFT") setDirection("RIGHT");
        break;
      default:
        break;
    }
   
  };

  useEffect(() => {
    const adjustSpeed = () => {
      if (score > 0 && score % 10 === 0) {
        const newSpeed = 100 - Math.floor(score / 10) * 20;
        setSpeed(Math.max(newSpeed, 50));
      }
    };

    adjustSpeed();
  }, [score]);

  useEffect(() => {
    const interval = setInterval(() => {
      moveSnake();
      drawGame();
    }, speed);

    return () => clearInterval(interval);
  }, [snake, direction, isGameRunning, speed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    setContext(canvas.getContext("2d"));

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isGameRunning, direction]);

  const startGame = () => {
    setSnake(initialSnake);
    setFood(initialFood);
    setDirection("RIGHT");
    setIsGameRunning(true);
    setIsPaused(false);
    setScore(0);
    setSpeed(100);
    setModalVisible(false);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div
      style={{
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f0f0f0",
        padding: "20px",
      }}
    >
      <h2 style={{ fontSize: "24px", color: "#333" }}>Score: {score}</h2>
      <h3 style={{ fontSize: "20px", color: "#555" }}>Highest Score: {highestScore}</h3>
      <button
        onClick={startGame}
        disabled={isGameRunning}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          margin: "10px",
        }}
      >
        Start Game
      </button>

      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        style={{
          border: "1px solid black",
          backgroundColor: "black",
          display: "block",
          margin: "0 auto",
        }}
      />

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => handleButtonClick("UP")}
          style={{
            padding: "20px",
            fontSize: "16px",
            margin: "5px",
            backgroundColor: "#2196F3",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          <MdArrowUpward />

        </button>
        <div>
          <button
            onClick={() => handleButtonClick("LEFT")}
            style={{
              padding: "20px",
              fontSize: "16px",
              margin: "5px 20px",
              backgroundColor: "#2196F3",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            <MdArrowBack />

          </button>
          <button
            onClick={() => handleButtonClick("RIGHT")}
            style={{
              padding: "20px",
              fontSize: "16px",
              margin: "5px 20px",
              backgroundColor: "#2196F3",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            <MdArrowForward />

          </button>
        </div>
        <button
          onClick={() => handleButtonClick("DOWN")}
          style={{
            padding: "20px",
            fontSize: "16px",
            margin: "5px",
            backgroundColor: "#2196F3",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          <MdArrowDownward />

        </button>
      </div>

      {modalVisible && (
        <div
          style={{
             position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            textAlign: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "15px",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
          <h5 style={{ color: "#333", fontSize: "20px" }}>{modalMessage}</h5>
             <button
            onClick={startGame}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginTop: "20px",
            }}
          >
            Restart 
          </button>
            <button
              onClick={closeModal}
              style={{
                padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginTop: "10px",
             
              }}
            className="ml-0 sm:ml-8 md:ml-8"  >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Snake;
