const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin });

function traverseMap(lines, slopeX, slopeY) {
    let lineWidth = lines[0].length;
    let posX = 0;
    let posY = 0;
    let treeCount = 0;
    while (posY < lines.length) {
        if (lines[posY][posX] == "#") {
            treeCount += 1;
        }
        posX = (posX + slopeX) % lineWidth;
        posY += slopeY;
    }
    console.log("Trees found: ", treeCount);
}

let lines = [];
let slopeX = parseInt(process.argv[2]);
let slopeY = parseInt(process.argv[3]);
rl.on('line', line => lines.push(line)).on('close', () => traverseMap(lines, slopeX, slopeY))