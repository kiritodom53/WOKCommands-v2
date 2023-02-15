"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripNonNumeric = exports.currentDateCZE = void 0;
const currentDateCZE = (type = "unix_timestamp") => {
    const d = Date.now();
    if (type == "datetime")
        return new Date(d);
    if (type == "locate_cz") {
        const locateD = new Date(d);
        return locateD.toLocaleString("cz-CS");
    }
    return Math.floor(d / 1000);
};
exports.currentDateCZE = currentDateCZE;
function stripNonNumeric(input) {
    const regex = /[^0-9]/g;
    return input.replace(regex, "");
}
exports.stripNonNumeric = stripNonNumeric;
