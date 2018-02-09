const _ = require("lodash");
const express = require("express");
const boardGenerator = require("./board-gen");

// static resources
const matches = require("./static-data.json").matches;
const matchMap = _.keyBy(matches, (match) => match.id);

const app = express();

app.get("/matches", (req, res) => {
    res.json(matches);
});

app.get("/matches/:id/checkers", (req, res) => {
    const match = matchMap[req.params.id];
    const whites = _.range(match.white.count).map((id) => ({id: id, color: "white"}));
    const blacks = _.range(match.black.count).map((id) => ({id: id, color: "black"}));
    res.json(whites.concat(blacks));
});

app.get("/matches/:id", (req, res) => {
    const match = matchMap[req.params.id];
    match.board = boardGenerator.generateBoard(match.white.count, match.black.count, 0).board;
    res.json(match);
});

app.listen(3000, () => console.log('Checkers listening on port 3000!'));
