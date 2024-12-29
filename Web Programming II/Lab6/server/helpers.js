import { ObjectId } from 'mongodb';

const exportedMethods = {
    checkId(id, varName) {
        if (!id) throw `Error: You must provide a ${varName}`;
        if (typeof id !== 'string') throw `Error:${varName} must be a string`;
        id = id.trim();
        if (id.length === 0) throw `Error: ${varName} cannot be an empty string or just spaces`;
        if (!ObjectId.isValid(id)) throw `Error: ${varName} invalid object ID`;
        return id;
    },
    checkString(strVal, varName) {
        if (!strVal && varName !== bio) throw `Error: You must supply a ${varName}!`;
        if (typeof strVal !== 'string') throw `Error: ${varName} must be a string!`;
        strVal = strVal.trim();
        if (strVal.length === 0) throw `Error: ${varName} cannot be an empty string or string with just spaces`;
        let regEx = /^[^a-zA-Z0-9]+$/; // only special characters https://www.geeksforgeeks.org/check-if-a-string-consists-only-of-special-characters/
        if (strVal.match(regEx)) throw `Error: ${varName} cannot contain only special characters`;
        if (varName === "title" || varName === "chapters") {
            if (strVal.length > 50) throw `Error: ${varName} cannot be greater than 50 chars`;
            regEx = /^[a-zA-Z0-9]+(?:[- ?!.,'"/()":;][a-zA-Z0-9]+)*$/; // allows for letters, spaces, hyphens, ?, !, . , ' and numbers
        }
        if (varName === "bio") {
            if (strVal.length > 750) throw `Error: ${varName} cannot be greater than 750 chars`;
            regEx = /^[a-zA-Z0-9]+(?:[- ?!.,'"/()":;][a-zA-Z0-9]+)*$/; // allows for letters, spaces, hyphens, ?, !, . , ' and numbers
        }
        if (varName === "location") {
            if (strVal.length > 35) throw `Error: ${varName} cannot be greater than 35 chars`;
            regEx = /^[a-zA-Z0-9]+(?:[- ,][a-zA-Z0-9]+)*$/; // allows for letters, spaces, hyphens, commas and numbers
        }
        if (varName === "name") {
            if (strVal.length < 2 || strVal.length > 25) throw `Error: ${varName} must be between 2-25 chars`
            regEx = /^[a-zA-Z]+(?:[- ][a-zA-Z]+)*$/; // allows for letters, spaces, and hyphens
        }
        if (varName === "name") {
            if (!strVal.match(regEx)) throw `Error: ${varName} cannot contain numbers or special characters`;
        }
        if (varName !== "title" && varName !== "chapters") {
            if (!isNaN(strVal)) throw `Error: ${strVal} is not a valid value for ${varName} as it only contains digits`;
        }
        return strVal;
    },
    // should established year be at least equal to or before book publication date?
    checkYear(year, varName) {
        if (year === undefined) throw `Error: must provide a ${varName}`;
        const currentYear = new Date().getFullYear();
        // check it is a number
        if (typeof year !== 'number') throw `${varName || 'provided variable'} is not a number`;
        // can not be in the future
        if (year > currentYear) throw `Error: ${varName} cannot be in the future`;
        // cannot be before 1584
        if (year < 1584) throw `${varName} cannot be older than 1584`;
        return year;
    },
    // should dateOfBirth be at least 5 years before publication date?
    checkDate(date, varName) { //    MM/DD/YYYY format
        if (!date) throw `Error: You must supply a ${varName}!`;
        if (typeof date !== 'string') throw `Error: ${varName} must be a string!`;
        date = date.trim();
        if (date.length === 0) throw `Error: ${varName} cannot be an empty string or string with just spaces`;
        if (date.length !== 10) {
            throw `Error: ${varName} is not a valid date in mm/dd/yyyy format`
        }
        let today = new Date(),
            day = new Date(date);
        if (day > today) {
            throw `Error: ${varName} cannot be in the future`
        }
        let mm = date.slice(0, 2),
            dd = date.slice(3, 5);
            let yyyy = date.slice(6);
            if (date[2] !== "/" || date[5] !== "/") {
            throw `Error: ${varName} is missing / in date format`
        }
        let validMonths = ["01", "02", "03", "04", "05", "06",
            "07", "08", "09", "10", "11", "12"],
            ThirtyOneDays = ["01", "02", "03", "04", "05", "06",
                "07", "08", "09", "10", "11", "12", "13", "14", "15",
                "16", "17", "18", "19", "20", "21", "22", "23", "24",
                "25", "26", "27", "28", "29", "30", "31"],
            ThirtyDays = ["01", "02", "03", "04", "05", "06",
                "07", "08", "09", "10", "11", "12", "13", "14", "15",
                "16", "17", "18", "19", "20", "21", "22", "23", "24",
                "25", "26", "27", "28", "29", "30"],
            February = ["01", "02", "03", "04", "05", "06",
                "07", "08", "09", "10", "11", "12", "13", "14", "15",
                "16", "17", "18", "19", "20", "21", "22", "23", "24",
                "25", "26", "27", "28", "29"]
        if (!validMonths.includes(mm)) {
            throw `Error: not a valid month in mm/dd/yyyy format`;
        } else if (mm === "01" || mm === "03" || mm === "05" ||
            mm === "07" || mm === "08" || mm === "12") {
            if (!ThirtyOneDays.includes(dd)) {
                throw `Error: ${varName} is not valid day in mm/dd/yyyy format`
            }
        } else if (mm === "02") {
            if (!February.includes(dd)) {
                throw `Error: ${varName} is not a valid day in mm/dd/yyyy format`
            }
        } else {
            if (!ThirtyDays.includes(dd)) {
                throw `Error: ${varName} is not a valid day in mm/dd/yyyy format`
            }
        }
        const currentYear = new Date().getFullYear();
        // check it is a number
        // can not be in the future
        if (Number(yyyy) > currentYear) throw `Error: ${varName} cannot be in the future`;
        // cannot be before 1584
        if (Number(yyyy) < 1584) throw `${varName} cannot be older than 1584`;
        return date;
    },
    checkChapters(arr, varName) {
        if (arr === undefined) throw `Error: must provide a ${varName}`
        if (Array.isArray(arr) == false) throw `Error: ${varName || 'provided array'} is not an array`;
        if (arr.length === 0) throw `Error: ${varName} cannot be empty`;
        // each element in the array is a string
        let chapters = [];
        arr.forEach((chapter) => {
            chapters.push(this.checkString(chapter, "chapters"));
        })
        // should there be a max cast size of people?
        if (arr.length > 150) throw `Error: ${varName} can be up to 150`;
        // must be only first and last name for keys in an object
        return chapters;
    },
    checkRange(min, max) {
        if (min === undefined || max === undefined) throw `Error: must provide a range`;
        if (typeof min !== 'number' || typeof max !== 'number') throw `${varName || 'provided variable'} is not a number`;
        if (max < min) throw `Error: max cannot be less than min`;
        if (min <= 0) throw `Error: min must be greater than 0`;
        const currentYear = new Date().getFullYear();
        if (max > currentYear + 5) throw `Error: max cannot be greater than 5 years from now`;
    }

};

export default exportedMethods;