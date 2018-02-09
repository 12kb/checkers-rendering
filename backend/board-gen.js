_ = require("lodash");

class RandomCellSource {
    constructor() {
        this.used = {};
    }

    getEmptyCell() {
        let x, y, cellId;
        do {
            x = _.random(4);
            y = _.random(4);
            cellId = `${x}-${y}`;
        } while (this.used[cellId]);
        this.used[cellId] = true;
        return {x, y};
    }
}

function createChecker(src, id) {
    const position = src.getEmptyCell();
    return {
        id: id,
        x: position.x,
        y: position.y
    };
}

function generateBoard(white, black, startId) {
    const src = new RandomCellSource();
    const whites = _.range(white).map(() => createChecker(src, startId++));
    const blacks = _.range(black).map(() => createChecker(src, startId++));
    const checkers = whites.map(cell => ({id: cell.id, color: "white"})).concat(blacks.map(cell => ({id: cell.id, color: "black"})));

    return {
        board: whites.concat(blacks),
        checkers: checkers
    };
}

module.exports = {generateBoard: generateBoard};