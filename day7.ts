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

function part1(rules: Map<string, BagContent[]>) {
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
    console.log("final colors:", outputBagColors.size);
}

function recursiveContentCount(count: number, bagColor: string, rules: Map<string, BagContent[]>): number {
    let bagContents = rules.get(bagColor);
    if (bagContents) {
        let totalContents = bagContents.reduce((acum, curr) => {
            return acum + curr.bagCount + recursiveContentCount(curr.bagCount, curr.bagColor, rules);
        }, 0);
        return totalContents * count;
    }
    // else
    return 0;
}

function part2(rules: Map<string, BagContent[]>) {
    let startingBagColor = "shiny gold";

    let grandTotal = recursiveContentCount(1, startingBagColor, rules);
    console.log("Grand total:", grandTotal);
}

import { createInterface } from "readline";

const rl = createInterface({input: process.stdin});

let rules = new Map<string, BagContent[]>();

rl.on("line", line => parseLine(line, rules)).on("close", () => part2(rules));
