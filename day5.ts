import { createInterface } from "readline";

const rl = createInterface({input: process.stdin});

function binarySearch(lower: number, higher: number, searchString: string): number {
    let l = lower;
    let h = higher;

    for (let i = 0; i < searchString.length; i++) {
        let half = l + Math.floor((h-l)/2);
        switch (searchString[i]) {
            case "F":
            case "L":
                h = half;
                break;
            case "B":
            case "R":
                l = half+1;
                break;
        }
        if (l == h) { break; }
    }
    return l;
}

function findSeat(seatSpec: string): {row: number, column: number} {
    let row = binarySearch(0, 127, seatSpec.substring(0, 7));
    let column = binarySearch(0, 7, seatSpec.substring(7));
    return {row, column};
}

let highestSeatId = 0;
let seatIdList: number[] = [];
rl.on("line", line => {
    let seat = findSeat(line);
    let seatId = seat.row*8 + seat.column;
    seatIdList.push(seatId);
    if (seatId > highestSeatId) { highestSeatId = seatId; }
}).on("close", () => {
    console.log("Found max seat id:", highestSeatId);
    seatIdList.sort((a, b) => a - b);
    for (let i = 0; i < seatIdList.length-1; i++){
        if ((seatIdList[i+1] - seatIdList[i]) > 1) {
            console.log("Seat found!:", seatIdList[i]+1);
            break;
        }
    }
});
