import { createInterface } from "readline";

const rl = createInterface({input: process.stdin});

const SEAT_FREE = 1;
const SEAT_OCCUPIED = 2;
const FLOOR = 0;

function countVisibleOccupiedSeatsForPosition(x: number, y: number, currentLayout: number[][]): number {
    let countAdjacent = 0;
    for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
            if (dx == 0 && dy == 0) { continue; }
            let multiplier = 1;
            while ((x+dx*multiplier) >= 0 && (x+dx*multiplier) < currentLayout[y].length
                && (y+dy*multiplier) >= 0 && (y+dy*multiplier) < currentLayout.length) {
                let seatState = currentLayout[y+dy*multiplier][x+dx*multiplier];
                if (seatState == SEAT_OCCUPIED) {
                    countAdjacent += 1;
                    break;
                } else if (seatState == SEAT_FREE) {
                    break;
                } else {
                    multiplier += 1;
                }
            }
        }
    }
    return countAdjacent;
}

function countOccupiedSeatsForPosition(x: number, y: number, currentLayout: number[][]): number {
    let minX = Math.max(x-1, 0);
    let minY = Math.max(y-1, 0);
    let maxX = Math.min(x+1, currentLayout[y].length-1);
    let maxY = Math.min(y+1, currentLayout.length-1);
    let countAdjacent = 0;
    for (let i = minY; i <= maxY; i++) {
        for (let j = minX; j <= maxX; j++) {
            if (i == y && j == x) { continue; }
            if (currentLayout[i][j] == SEAT_OCCUPIED) {
                countAdjacent += 1;
            }
        }
    }
    return countAdjacent;
}

function nextSeatState(x: number, y: number, currentLayout: number[][], part: number): number {
    let seatLimit = part == 2 ? 5 : 4;
    let countAdjacent: number;
    if (part == 2) {
        countAdjacent = countVisibleOccupiedSeatsForPosition(x, y, currentLayout);
    } else {
        countAdjacent = countOccupiedSeatsForPosition(x, y, currentLayout);
    }
    switch (currentLayout[y][x]) {
        case SEAT_OCCUPIED:
            return countAdjacent >= seatLimit ? SEAT_FREE : SEAT_OCCUPIED;
        case SEAT_FREE:
            return countAdjacent == 0 ? SEAT_OCCUPIED : SEAT_FREE;
        default:
            return currentLayout[y][x];
    }
}

function nextSeatArrangement(seatLayout: number[][], part: number): number[][] {
    let newLayout: number[][] = seatLayout.map(r => new Array<number>(r.length));
    for (let i = 0; i < seatLayout.length; i++) {
        for (let j = 0; j < seatLayout[i].length; j++) {
            newLayout[i][j] = nextSeatState(j, i, seatLayout, part);
        }
    }
    return newLayout;
}

function matrixEquality(m1: number[][], m2: number[][]): boolean {
    for (let i = 0; i < m1.length; i++) {
        for (let j = 0; j < m1[i].length; j++) {
            if (m1[i][j] != m2[i][j]) {
                return false;
            }
        }
    }
    return true;
}

let seatLayout: number[][] = [];
let part = 1;
if (process.argv.length >= 3 && process.argv[2] == "2") {
    part = 2;
}

rl.on("line", line => {
    let seatRow = line.split("").map(c => {
        switch (c) {
            case "L":
                return SEAT_FREE;
            case "#":
                return SEAT_OCCUPIED;
            default:
                return FLOOR;
        }
    });
    seatLayout.push(seatRow);
}).on("close", () => {
    console.log("Solving for part", part);
    let stableArrangementFound: boolean;
    do {
        let newSeatLayout = nextSeatArrangement(seatLayout, part);
        stableArrangementFound = matrixEquality(seatLayout, newSeatLayout);
        if (stableArrangementFound) {
            console.log("Stable arrangement found");
            let countOccupied = newSeatLayout.reduce((acum, curr) => {
                return curr.reduce((a2, c2) => {
                    return a2 + (c2 == SEAT_OCCUPIED ? 1 : 0);
                }, 0) + acum;
            }, 0);
            console.log("# of occupied seats:", countOccupied);
        } else {
            seatLayout = newSeatLayout;
        }
    } while (!stableArrangementFound);
});
