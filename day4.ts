import { parse } from "path";
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

function validatePassportData(passport:Passport): boolean {
    let birthYear = parseInt(passport.byr);
    if (!(birthYear >= 1920 && birthYear <= 2002)) {
        return false;
    }
    let issueYear = parseInt(passport.iyr);
    if (!(issueYear  >= 2010 && issueYear <= 2020)) {
        return false;
    }
    let expirationYear = parseInt(passport.eyr);
    if (!(expirationYear  >= 2020 && expirationYear <= 2030)) {
        return false;
    }
    let heightMatch = passport.hgt.match(/^(\d+)(cm|in)$/i);
    if (heightMatch) {
        let units = heightMatch[2];
        let height = parseInt(heightMatch[1]);
        switch (units) {
            case "cm":
                if (!(height >= 150 && height <= 193)) {
                    return false;
                }
                break;
        
            case "in":
                if (!(height >= 59 && height <= 76)) {
                    return false;
                }
                break;
        }
    } else {
        return false;
    }
    if (!/^#[0-9a-f]{6}$/i.test(passport.hcl)) {
        return false;
    }
    if (!/^amb|blu|brn|gry|grn|hzl|oth$/.test(passport.ecl)) {
        return false;
    }
    if (!/^\d{9}$/.test(passport.pid)) {
        return false;
    }
    return true;
}

function validatePassports(passports:Passport[], dataValidation: boolean) {
    let validPassports = passports.filter(passport => {
        if (passport.byr && passport.iyr && passport.eyr && passport.hgt && passport.hcl && passport.ecl && passport.pid) {
            return dataValidation ? validatePassportData(passport) : true;
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