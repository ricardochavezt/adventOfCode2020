import { createInterface } from "readline";

if (process.argv.length < 3) {
    console.log("usage: ", process.argv[0], process.argv[1], "<preambleLength>")
    process.exit(1);
}

function checkNumber(numberToCheck: number, possible: number[]): boolean {
    possible.sort((a, b) => a-b)
    for (let i = 0; i < possible.length-1; i++) {
        for (let j = i+1; j < possible.length; j++) {
            if ((possible[i] + possible[j]) > numberToCheck) {
                break;
            } else if ((possible[i] + possible[j]) == numberToCheck) {
                return true;
            }
        }
    }
    return false;
}

function findInvalidNumber(preambleLength: number, data: number[]): number {
    if (preambleLength >= data.length) {
        return -1;
    }

    for (let endIndex = preambleLength; endIndex < data.length; endIndex++) {
        if (checkNumber(data[endIndex], data.slice(endIndex-preambleLength, endIndex))){
            continue;
        }
        return data[endIndex];
    }
    return -1;
}

const rl = createInterface({input: process.stdin});

let data: number[] = [];

rl.on("line", line => data.push(parseInt(line))).on("close", () => {
    const preambleLength = parseInt(process.argv[2]);
    let invalidNumber = findInvalidNumber(preambleLength, data);
    if (invalidNumber == -1) {
        console.log("No invalid data found");
    } else {
        console.log("Invalid number found:", invalidNumber);
    }
})