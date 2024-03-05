"use client";
import React, { useState, useEffect, useRef } from 'react'
import { generateRandomFoodPosition, handleKeyDown } from '@/utils/SnakeEngine/GameMechanics';
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

            if (newHeadPosition.row === foodPosition.row && newHeadPosition.col === foodPosition.col) {
                // Snake has eaten the food
                const newSnake = snake.move(newHeadPosition, true);
                if (newSnake.size() % 4 === 0) {
                    setSnakeSpeed((prevSpeed) => Math.max(50, prevSpeed * 0.9)); // Increase speed every 4 eaten foods
                }
                setSnake(newSnake);
                const newFoodPosition = generateRandomFoodPosition(GRID_HEIGHT, GRID_WIDTH, newSnake);
                setFoodPosition({ ...newFoodPosition, color: "red", width: 1, height: 1 });
            } else {
                // Normal move
                const newSnake = snake.move(newHeadPosition);
                setSnake(newSnake);
            }
        };

        const gameLoop = setInterval(handleMove, snakeSpeed); // Move snake every 100 ms

        return () => clearInterval(gameLoop);
    }, [snake, direction]);

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center"
            onKeyDown={(e) => handleKeyDown(e, direction, setDirection)}
            tabIndex={0} // tabIndex is necessary for divs to be focusable
            ref={gameBoardRef} // Attach the ref to the div
        >

            <h1 className="text-4xl font-bold mb-12 font-serif">Snake On The Run!</h1>
            <p></p>
            <div className="score-board bg-gray-800 text-white p-4 rounded-lg shadow-md mb-7">
                <h2 className="text-2xl font-bold">Score Board</h2>
                <div className="mt-2">
                    <p className="text-lg">Score: <span className="font-mono">{snake.size()}</span></p>
                </div>
            </div>

            <div className="grid grid-row-3 gap-0.5">

                {snakeGrid.getGrid().map((row, rowIndex) => (
                    <div key={rowIndex} className="flex justify-center gap-0.5 cursor-pointer">
                        {row.map((cell, colIndex) => {
                            const isFoodCell = foodPosition.row === rowIndex && foodPosition.col === colIndex;
                            const isSnakePart = snake.getSnake().getBuffer().copyToArray().some(part => part.row === rowIndex && part.col === colIndex);

                            return (
                                <button
                                    className={`h-8 w-8 border rounded-sm ${isSnakePart ? 'bg-green-500' : isFoodCell ? 'bg-red-500' : 'border-blue-400 bg-blue-400'} flex items-center justify-center font-bold font-mono text-9xl`}
                                    key={colIndex}
                                    onClick={() => console.log(rowIndex, colIndex)}
                                >
                                </button>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    )

}


export default SnakeGamePage;
