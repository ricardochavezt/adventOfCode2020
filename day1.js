const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin });

function find2020(numbers) {
    numbers.sort((n1, n2) => n2 - n1);
    for (let i = 0; i < numbers.length-1; i++) {
        for (let j = numbers.length-1; j > i; j--) {
            let sum = numbers[i] + numbers[j];
            if (sum >= 2020) {
                if (sum == 2020) {
                    console.log("The numbers are", numbers[i], "*", numbers[j], "=", numbers[i]*numbers[j]);
                    return;
                }
                break;
            }
        }
    }
}

function find2020_3(numbers) {
    numbers.sort((n1, n2) => n1 - n2);
    for (let i = 0; i < numbers.length; i++) {
        for (let j = i+1; j < numbers.length; j++) {
            for (let k = j+1; k < numbers.length; k++) {
                let sum = numbers[i] + numbers[j] + numbers[k];
                if (sum >= 2020) {
                    if (sum == 2020) {
                        console.log("The numbers are", numbers[i], "*", numbers[j], "*", numbers[k], "=", numbers[i]*numbers[j]*numbers[k]);
                        return;
                    }
                    break;
                }
            }
        }
    }
}

let numbers = [];

rl.on('line', line => numbers.push(parseInt(line))).on('close', () => find2020_3(numbers));
