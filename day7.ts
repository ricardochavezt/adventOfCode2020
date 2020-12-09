interface BagContent {
    bagCount: number,
    bagColor: string
}

function parseLine(line: string, rules: Map<string, BagContent[]>) {
    let contentRegex = /(\d+) ([a-z ]+) bag/;
    let noBagsRegex = /no other bags/;
    let match = line.match(/([a-z ]+) bags contain (.*)$/);
    if (match != null) {
        let contents: BagContent[];
        if (match[2].match(noBagsRegex)) {
            contents = [];
        }
        else {
            contents = match[2].split(",").map(contentText => {
                let contentMatch = contentText.match(contentRegex);
                if (contentMatch == null) {
                    return { bagCount: 0, bagColor: "" };
                }
                return {
                    bagCount: parseInt(contentMatch[1]),
                    bagColor: contentMatch[2]
                } as BagContent;
            })
        }
        rules.set(match[1], contents);
    }
}

function findBagsContaining(bagColor: string, rules: Map<string, BagContent[]>): string[] {
    let bagColors: string[] = [];
    for (const entry of rules) {
        if (entry[1].some(b => b.bagColor == bagColor)) {
            bagColors.push(entry[0]);
        }
    }
    return bagColors;
}

import { createInterface } from "readline";

const rl = createInterface({input: process.stdin});

let rules = new Map<string, BagContent[]>();

rl.on("line", line => parseLine(line, rules)).on("close", () => {
    let inputBagColors = ['shiny gold'];
    let outputBagColors = new Set<string>();
    let firstColor: string;
    let newBagColors: string[];

    while (inputBagColors.length > 0) {
        firstColor = inputBagColors.shift()!;
        newBagColors = findBagsContaining(firstColor, rules);
        newBagColors.forEach(newColor => {
            if (!inputBagColors.includes(newColor)){
                inputBagColors.push(newColor);
            }
            outputBagColors.add(newColor);
        })
    }
    console.log("final colors:", outputBagColors);
});
