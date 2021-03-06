import { createInterface } from "readline";

const rl = createInterface({input: process.stdin});

let joltageRatings: number[] = [];

function part1(joltageRatings: number[]) {
    let differenceCount: [number, number, number] = [0, 0, 0];
    for (let i = 1; i < joltageRatings.length; i++) {
        switch (joltageRatings[i] - joltageRatings[i-1]) {
            case 1:
                differenceCount[0] += 1;
                break;
            case 2:
                differenceCount[1] += 1;
                break;
            case 3:
                differenceCount[2] += 1;
                break;
            default:
                console.log("Difference too large");
                break;
        }
    }
    // device's built-in adapter
    differenceCount[2] += 1;
    console.log("Differences:", differenceCount);
    console.log("Result:", differenceCount[0] * differenceCount[2]);
}

function part2(joltageRatings: number[]) {
    let tribonacciSequence = [1,1,2,4,7,13,24,44,81,149];
    let combinations = 1;
    let countOfSuccesiveOnes = 0;
    for (let i = 1; i < joltageRatings.length; i++) {
        if (joltageRatings[i] - joltageRatings[i-1] == 1) {
            countOfSuccesiveOnes += 1;
        } else {
            combinations *= tribonacciSequence[countOfSuccesiveOnes];
            countOfSuccesiveOnes = 0;
        }
    }
    if (countOfSuccesiveOnes > 0) {
        combinations *= tribonacciSequence[countOfSuccesiveOnes];
        countOfSuccesiveOnes = 0;
    }
    console.log("Combinations:", combinations);
}

rl.on("line", line => joltageRatings.push(parseInt(line))).on("close", () => {
    joltageRatings.sort((a, b) => a - b);
    joltageRatings.unshift(0) // charging outlet
    part1(joltageRatings);
    part2(joltageRatings);
});
