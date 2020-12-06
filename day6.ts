import { createInterface } from "readline";

const rl = createInterface({input: process.stdin});

let questionsAnsweredYes = new Set<string>();
let answerCount = new Map<string, number>();
let total = 0;
let totalAllAnswered = 0;
let groupSize = 0;

rl.on("line", line => {
    if (line.length == 0) {
        total += questionsAnsweredYes.size;
        for (const entry of answerCount) {
            if (entry[1] == groupSize) {
                totalAllAnswered += 1;
            }
        }
        questionsAnsweredYes.clear();
        answerCount.clear();
        groupSize = 0;
        return;
    }
    groupSize += 1;
    for (let i = 0; i < line.length; i++) {
        questionsAnsweredYes.add(line[i]);
        answerCount.set(line[i], (answerCount.get(line[i]) || 0) + 1);
    }
}).on("close", () => {
    total += questionsAnsweredYes.size;
    for (const entry of answerCount) {
        if (entry[1] == groupSize) {
            totalAllAnswered += 1;
        }
    }
    console.log("Total", total, "questions answered 'yes'");
    console.log("Total", totalAllAnswered, "questions where everyone answered 'yes'");
});
