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

function findInvalidNumber(preambleLength: number, data: number[]): [number, number] {
    if (preambleLength >= data.length) {
        return [-1, -1];
    }

    for (let endIndex = preambleLength; endIndex < data.length; endIndex++) {
        if (checkNumber(data[endIndex], data.slice(endIndex-preambleLength, endIndex))){
            continue;
        }
        return [endIndex, data[endIndex]];
    }
    return [-1, -1];
}

function findWeakness(sum: number, data: number[]): number {
    for (let size = 2; size < data.length; size++) {
        for (let index = 0; index < data.length-size; index++) {
            if (data.slice(index, index+size).reduce((a, c) => a + c) == sum) {
                let max = 0, min = Infinity;
                data.slice(index, index + size).forEach(n => {
                    if (n > max) max = n;
                    if (n < min) min = n;
                });
                return max + min;
            }
        }
    }
    return -1;
}

const rl = createInterface({input: process.stdin});

let data: number[] = [];

rl.on("line", line => data.push(parseInt(line))).on("close", () => {
    const preambleLength = parseInt(process.argv[2]);
    let invalidNumber = findInvalidNumber(preambleLength, data);
    if (invalidNumber[0] == -1) {
        console.log("No invalid data found");
    } else {
        console.log("Invalid number found:", invalidNumber);
        let weakness = findWeakness(invalidNumber[1], data.slice(0, invalidNumber[0]));
        if (weakness != -1) {
            console.log("Weakness found:", weakness);
        } else {
            weakness = findWeakness(invalidNumber[1], data.slice(invalidNumber[0]+1));
            if (weakness != -1) {
                console.log("Weakness found:", weakness);
            } else {
                console.log("No weakness found");
            }
        }
    }
})