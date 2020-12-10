import { createInterface } from "readline";

const rl = createInterface({input: process.stdin});

function detectLoop(bootCode: [string, number][]): boolean {
    let instructionPointer = 0;
    let accumulator = 0;
    let visitedInstructions = new Set<number>();

    while (instructionPointer < bootCode.length) {
        if (visitedInstructions.has(instructionPointer)) {
            console.log("loop detected: visiting instruction", instructionPointer, "twice");
            // console.log("value in accumulator:", accumulator);
            return true;
        } else {
            visitedInstructions.add(instructionPointer);
            let instruction = bootCode[instructionPointer];
            switch (instruction[0]) {
                case "nop":
                    instructionPointer += 1;
                    break;
                case "acc":
                    accumulator += instruction[1];
                    instructionPointer += 1;
                    break;
                case "jmp":
                    instructionPointer += instruction[1];
                    break;
            
                default:
                    console.log("skipping unknown instruction:", instruction[0]);
                    instructionPointer += 1;
                    break;
            }
        }
     }
    console.log("Program terminated with value in accumulator:", accumulator);
    return false;
}

function testBootCodeModifications(bootCode: [string, number][]) {
    for (let i = 0; i < bootCode.length; i++) {
        const instruction = bootCode[i];
        let newInstruction: string;
        switch (instruction[0]) {
            case "acc":
                continue;
            case "nop":
                newInstruction = "jmp";
                break;
            case "jmp":
                newInstruction = "nop";
                break;
        
            default:
                continue;
        }
        console.log("Instruction", i, "- changing", instruction[0], "to", newInstruction);
        if (!detectLoop([...bootCode.slice(0, i), [newInstruction, instruction[1]], ...bootCode.slice(i+1)])) {
            break;
        }
    }
}

let bootCode: [string, number][] = [];

rl.on("line", line => {
    let instructionMatch = line.match(/([a-z]+) ((-|\+)\d+)/);
    if (instructionMatch) {
        bootCode.push([instructionMatch[1], parseInt(instructionMatch[2])]);
    }
}).on("close", () => {
    testBootCodeModifications(bootCode);
    // detectLoop(bootCode)
});