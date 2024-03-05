import Queue from "@/components/Queue";

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
        this.snakeBody.removeFirst();
    }

    public getHead() {
        return this.snakeBody.getFirst();
    }

    public getTail() {
        return this.snakeBody.getLast();
    }

    public move(newHeadPosition: {row: number, col: number}, ateFood: boolean = false): Snake {
        // Create a new Snake instance and copy the current body
        const newSnake = new Snake();
        newSnake.snakeBody = new Queue();
    
        // First, add the new head position at the beginning of the snake
        newSnake.snakeBody.add(newHeadPosition);
    
        // Then, copy the rest of the body, skipping the last part if the snake hasn't eaten food
        this.snakeBody.getBuffer().copyToArray().forEach((part, index, array) => {
            if (index < array.length - (ateFood ? 0 : 1)) {
                newSnake.snakeBody.add(part);
            }
        });
    
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