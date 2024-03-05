import { Dispatch, SetStateAction } from "react";
import Snake from "./Snake";

export const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, direction: string, setDirection: Dispatch<SetStateAction<string>>) => {
    switch (e.key) {
        case "ArrowUp":
            if (direction === "ArrowDown") return;
            setDirection("ArrowUp");
            console.log("ArrowUp")
            break;
        case "ArrowDown":
            if (direction === "ArrowUp") return;
            console.log("ArrowDown")
            setDirection("ArrowDown");
            break;
        case "ArrowLeft":
            if (direction === "ArrowRight") return;
            console.log("ArrowLeft")
            setDirection("ArrowLeft");
            break;
        case "ArrowRight":
            if (direction === "ArrowLeft") return;
            console.log("ArrowRight")
            setDirection("ArrowRight");
            break;
    }
}


export const generateRandomFoodPosition = (GRID_HEIGHT: number, GRID_WIDTH: number, snake: Snake) => {
    let newPosition: { row: number, col: number } = { row: 0, col: 0 };
    do {
        newPosition = {
            row: Math.floor(Math.random() * GRID_HEIGHT),
            col: Math.floor(Math.random() * GRID_WIDTH),
        };
    } while (snake.getSnake().getBuffer().copyToArray().some(part => part.row === newPosition.row && part.col === newPosition.col));
    
    return newPosition;
};