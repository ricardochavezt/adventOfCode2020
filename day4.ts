import { createInterface } from "readline";

const rl = createInterface({input: process.stdin});

interface Passport {
    byr: string;
    iyr: string;
    eyr: string;
    hgt: string;
    hcl: string;
    ecl: string;
    pid: string;
    cid?: string;
}

function validatePassports(passports:Passport[], dataValidation: boolean) {
    let validPassports = passports.filter(passport => {
        if (passport.byr && passport.iyr && passport.eyr && passport.hgt && passport.hcl && passport.ecl && passport.pid) {
            return true;
        }
        return false;
    });

    console.log("Found", validPassports.length, "valid passports");
}

function parseFields(fieldsString: string, passport: Passport) {
    let fields = fieldsString.split(/\s/);
    fields.forEach(field => {
        let keyValue = field.split(":");
        switch (keyValue[0]) {
            case "byr":
                passport.byr = keyValue[1];
                break;
        
            case "iyr":
                passport.iyr = keyValue[1];
                break;
        
            case "eyr":
                passport.eyr = keyValue[1];
                break;
        
            case "hgt":
                passport.hgt = keyValue[1];
                break;
        
            case "hcl":
                passport.hcl = keyValue[1];
                break;
        
            case "ecl":
                passport.ecl = keyValue[1];
                break;
        
            case "pid":
                passport.pid = keyValue[1];
                break;
        
            case "cid":
                passport.cid = keyValue[1];
                break;
        
            default:
                break;
        }
    });
}

let passports: Passport[] = [];
let passport = {} as Passport;
rl.on("line", line => {
    if (line.trim().length == 0) {
        passports.push(passport);
        passport = {} as Passport;
        return;
    }
    parseFields(line, passport);

}).on("close", () => {
    passports.push(passport);
    let dataValidation = false;
    if (process.argv.length >= 3 && process.argv[2] == "--datavalidation") {
        dataValidation = true;
    }
    validatePassports(passports, dataValidation);
});