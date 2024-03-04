

class Grid {

    public rows: number;
    public cols: number;

    public grid: number[][];

    constructor(rows: number, cols: number) {
        this.rows = rows;
        this.cols = cols;

        this.grid = new Array(this.rows).fill(0).map(() => new Array(this.cols).fill(0));
    }

    public getCell(x: number, y: number) {
        return this.grid[x][y];
    }

    public setCell(x: number, y: number, value: number) {
        this.grid[x][y] = value;
    }

    public getGrid() {
        return this.grid;
    }

    public map(callback: (cell: number, x: number, y: number) => void) {
        this.grid.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                callback(cell, rowIndex, colIndex);
            });
        });
    }

    public clear() {
        this.grid = new Array(this.cols).fill(0).map(() => new Array(this.rows).fill(0));
    }
}

export default Grid;