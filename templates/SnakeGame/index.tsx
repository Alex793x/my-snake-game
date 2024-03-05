"use client";
import React, { useState, useEffect, useRef } from 'react'
import { generateRandomFoodPosition, handleCreateNewSnake, handleKeyDown } from '@/utils/SnakeEngine/GameMechanics';
import Snake from '@/utils/SnakeEngine/Snake';
import Grid from '@/utils/SnakeGrid/Grid';
import { SnakeFood } from '@/types/Food';

const SnakeGamePage = () => {
    const GRID_HEIGHT = 20;
    const GRID_WIDTH = 30;

    const [snakeGrid, setSnakeGrid] = useState(new Grid(GRID_HEIGHT, GRID_WIDTH));
    const [snake, setSnake] = useState(() => {
        const initialSnake = new Snake();
        initialSnake.createSnake();
        return initialSnake;
    });
    const [snakeSpeed, setSnakeSpeed] = useState(200);
    const [direction, setDirection] = useState("ArrowLeft");
    const [foodPosition, setFoodPosition] = useState<SnakeFood>({ row: 0, col: 0, color: "red", width: 1, height: 1 });
    const [poisonedFoodPosition, setPoisonedFoodPosition] = useState<SnakeFood | null>(null);
    const [gameOver, setGameOver] = useState(false);
    const gameBoardRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        if (gameBoardRef.current) {
            gameBoardRef.current.focus(); // Set focus to the game board when the component mounts
        }

        const handleMove = () => {
            let head = snake.getHead();
            if (!head) return;
            let newHeadPosition = { row: head.row, col: head.col };

            switch (direction) {
                case "ArrowLeft":
                    newHeadPosition.col = (newHeadPosition.col - 1 + GRID_WIDTH) % GRID_WIDTH;
                    break;
                case "ArrowRight":
                    newHeadPosition.col = (newHeadPosition.col + 1) % GRID_WIDTH;
                    break;
                case "ArrowUp":
                    newHeadPosition.row = (newHeadPosition.row - 1 + GRID_HEIGHT) % GRID_HEIGHT;
                    break;
                case "ArrowDown":
                    newHeadPosition.row = (newHeadPosition.row + 1) % GRID_HEIGHT;
                    break;
                default:
                    break;
            }

            // Check if the snake has eaten any food
            if (newHeadPosition.row === foodPosition.row && newHeadPosition.col === foodPosition.col) {
                // Snake has eaten the food
                const newSnake = snake.move(newHeadPosition, true, false, setGameOver);
                if (newSnake.size() % 4 === 0) {
                    setSnakeSpeed((prevSpeed) => Math.max(50, prevSpeed * 0.9)); // Increase speed every 4 eaten foods
                }
                setSnake(newSnake);
                // Generate new food position
                const newFoodPosition = generateRandomFoodPosition(GRID_HEIGHT, GRID_WIDTH, newSnake);
                setFoodPosition({ ...newFoodPosition, color: "red", width: 1, height: 1 });
                // Reset poisoned food position
                setPoisonedFoodPosition(null);
                if (Math.random() < 0.7) {
                    const newPoisonedFoodPosition = generateRandomFoodPosition(GRID_HEIGHT, GRID_WIDTH, newSnake);
                    setPoisonedFoodPosition({ ...newPoisonedFoodPosition, color: "purple", width: 1, height: 1 });
                }
            } else if (poisonedFoodPosition && newHeadPosition.row === poisonedFoodPosition.row && newHeadPosition.col === poisonedFoodPosition.col) {
                // Snake has eaten the poisoned food
                const newSnake = snake.move(newHeadPosition, false, true, setGameOver);
                setSnake(newSnake);
                // Remove the poisoned food from the board
                setPoisonedFoodPosition(null);
                // Generate a new regular food position to replace the poisoned one
                const newFoodPosition = generateRandomFoodPosition(GRID_HEIGHT, GRID_WIDTH, newSnake);
                setFoodPosition({ ...newFoodPosition, color: "red", width: 1, height: 1 });
            } else {
                // Regular move without eating food
                const newSnake = snake.move(newHeadPosition, false, false, setGameOver);
                setSnake(newSnake);
            }
        };

        const gameLoop = setInterval(handleMove, snakeSpeed); // Move snake dynamically based on time game is running in ms.

        return () => clearInterval(gameLoop);
    }, [snake, direction, foodPosition, poisonedFoodPosition, GRID_HEIGHT, GRID_WIDTH, snakeSpeed]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center"
            onKeyDown={(e) => handleKeyDown(e, direction, setDirection)}
            tabIndex={0}
            ref={gameBoardRef}
        >
            {gameOver ? (
                <div className="absolute z-10 bg-white p-4 rounded-lg shadow-lg" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    <h2 className="text-2xl mb-5 font-bold text-red-500">Game Over</h2>
                    <button
                        className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
                        onClick={() => {
                            handleCreateNewSnake(setSnake);
                            setDirection("ArrowLeft");
                            setSnakeSpeed(200);
                            setGameOver(false);
                        }}
                        style={{ display: 'block', margin: 'auto' }}
                    >
                        Restart
                    </button>
                </div>
            ) : (
                <>
                    <h1 className="text-4xl font-bold mb-12 font-serif">Snake On The Run!</h1>
                    <div className="score-board bg-gray-800 text-white p-4 rounded-lg shadow-md mb-7">
                        <h2 className="text-2xl font-bold">Score Board</h2>
                        <div className="mt-2">
                            <p className="text-lg">Score: <span className="font-mono">{snake.size()}</span></p>
                        </div>
                    </div>

                    <div className="grid grid-row-3">
                        {snakeGrid.getGrid().map((row, rowIndex) => (
                            <div key={rowIndex} className="flex justify-center cursor-pointer">
                                {row.map((cell, colIndex) => {
                                    const isFoodCell = foodPosition.row === rowIndex && foodPosition.col === colIndex;
                                    const isPoisonedFoodCell = poisonedFoodPosition && poisonedFoodPosition.row === rowIndex && poisonedFoodPosition.col === colIndex;
                                    const isSnakePart = snake.getSnake().getBuffer().copyToArray().some(part => part.row === rowIndex && part.col === colIndex);

                                    return (
                                        <button
                                            className={`h-8 w-8 border ${isSnakePart ? 'bg-green-500' : isFoodCell ? 'bg-red-500' : isPoisonedFoodCell ? 'bg-purple-500' : 'border-blue-400 bg-blue-400'} flex items-center justify-center font-bold font-mono text-9xl`}
                                            key={colIndex}
                                            onClick={() => console.log(rowIndex, colIndex)}
                                        >
                                        </button>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );

}


export default SnakeGamePage;
