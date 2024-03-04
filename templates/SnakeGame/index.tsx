"use client";
import Queue from '@/components/Queue';
import { handleKeyDown } from '@/utils/SnakeEngine/GameMechanics';
import Snake from '@/utils/SnakeEngine/Snake';
import Grid from '@/utils/SnakeGrid/Grid';
import React, { useState, useEffect } from 'react'

const SnakeGamePage = () => {
    const [snakeGrid, setSnakeGrid] = useState<Grid>(new Grid(30, 20));
    const [snake, setSnake] = useState<Snake>(new Snake());
    const [direction, setDirection] = useState("ArrowLeft");

    function tick() {
        if (!snake.getSnake()) {            
            return;
        }

        const snakeQueue = snake.getSnake(); // Assuming this returns a Queue of the snake's body parts
        const currentHead = snakeQueue.front?.data;
        if (!currentHead) {
            console.log("Game over: no head")
            return;
        }

        // Calculate new head position based on the current direction
        const newHeadPosition = { row: currentHead.row, col: currentHead.col };
        console.log(newHeadPosition);

        switch (direction) {
            case "ArrowUp": newHeadPosition.row -= 1; break;
            case "ArrowDown": newHeadPosition.row += 1; break;
            case "ArrowLeft": newHeadPosition.col -= 1; break;
            case "ArrowRight": newHeadPosition.col += 1; break;
        }

        // Collision detection (walls)
        if (
            newHeadPosition.row < 0 || newHeadPosition.row >= snakeGrid.rows ||
            newHeadPosition.col < 0 || newHeadPosition.col >= snakeGrid.cols
        ) {
            console.log("Game over: hit a wall");
            return; // Stop the game or handle game over
        }

        // Collision detection (self)
        if (snakeQueue.getBuffer().copyToArray().some(part => part.row === newHeadPosition.row && part.col === newHeadPosition.col)) {
            console.log("Game over: hit itself");
            return; // Stop the game or handle game over
        }

        // Move the snake
        snake.move(newHeadPosition); // You need to implement this method in your Snake class to update the snake's body
        setSnakeGrid(prevGrid => new Grid(30, 20));

    }

    useEffect(() => {
        setTimeout(() => tick(), 1000);
    }, [tick]);





    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center"
            onKeyDown={(e) => handleKeyDown(e, setDirection)}
            tabIndex={0}
        >
            <h1 className="text-4xl font-bold mb-12 font-serif">Snake On The Run!</h1>

            <div className="grid grid-row-3 gap-0.5">

                {snakeGrid.getGrid().map((row, rowIndex) => (
                    <div key={rowIndex} className="flex justify-center gap-0.5 cursor-pointer">
                        {row.map((cell, colIndex) => {
                            const isSnakePart = snake.getSnake().getBuffer().copyToArray().some(part => part.row === rowIndex && part.col === colIndex);

                            return (
                                <button
                                    className={`h-8 w-8 border rounded-sm ${isSnakePart ? 'bg-green-500' : 'border-blue-400 bg-blue-400'} flex items-center justify-center font-bold font-mono text-9xl`}
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
