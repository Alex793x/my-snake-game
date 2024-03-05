import Queue from "@/components/Queue";
import { Dispatch, SetStateAction } from "react";

export type SnakePartType = {
    row: number;
    col: number;
}

class Snake {
    public snakeBody: Queue<SnakePartType>;

    constructor() {
        this.snakeBody = new Queue();        
    }


    public addPart(part: SnakePartType) {
        this.snakeBody.add(part);
    }

    public createSnake() {
        this.snakeBody.add({ row: 10, col: 10 });
        this.snakeBody.add({ row: 10, col: 11 });
        this.snakeBody.add({ row: 10, col: 12 });
        this.snakeBody.add({ row: 10, col: 13 });
        this.snakeBody.add({ row: 10, col: 14 });
    }

    public removePart() {
        this.snakeBody.removeLast();
    }

    public getHead() {
        return this.snakeBody.getFirst();
    }

    public getTail() {
        return this.snakeBody.getLast();
    }

    public move(newHeadPosition: {row: number, col: number}, ateFood: boolean = false, isPoisonedFood: boolean = false, setGameOver: Dispatch<SetStateAction<boolean>>): Snake {
        // Check if the new head position collides with any part of the snake's body
        const collision = this.snakeBody.getBuffer().copyToArray().some(part => 
            part.row === newHeadPosition.row && part.col === newHeadPosition.col
        );
    
        if (collision) {
            setGameOver(true);
            return this; // Return the current state of the snake without moving
        }
    
        // Create a new Snake instance and copy the current body
        const newSnake = new Snake();
        newSnake.snakeBody = new Queue();
    
        // First, add the new head position at the beginning of the snake
        newSnake.snakeBody.add(newHeadPosition);
    
        // Then, copy the rest of the body, skipping the last part if the snake hasn't eaten food
        // If the snake has eaten poisoned food, remove additional parts from the tail
        const partsToRemove = ateFood ? 0 : 1;
        const additionalPartsToRemove = isPoisonedFood ? 3 : 0; // Assuming we remove 3 parts when poisoned
        const totalPartsToRemove = partsToRemove + additionalPartsToRemove;
    
        this.snakeBody.getBuffer().copyToArray().forEach((part, index, array) => {
            if (index < array.length - totalPartsToRemove) {
                newSnake.snakeBody.add(part);
            }
        });
    
        // If the snake has eaten poisoned food and is too short to remove additional parts, set game over
        if (isPoisonedFood && newSnake.size() < 4) {
            setGameOver(true);
        }
    
        return newSnake;
    }
    

    public getSnake() {
        return this.snakeBody;
    }

    public size() {
        return this.snakeBody.size();
    }

    public clear() {
        this.snakeBody.clear();
    }

    public isEmpty() {
        return this.snakeBody.isEmpty();
    }
}

export default Snake;