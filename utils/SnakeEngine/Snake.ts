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

    public move(newHeadPosition: {row: number, col: number}, ateFood: boolean = false) {
        // Add the new head position to the front of the snake
        this.snakeBody.add(newHeadPosition);
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