export const currentDateCZE = (type: "datetime" | "unix_timestamp" | "locate_cz" = "unix_timestamp") => {
    const d = Date.now();

    if (type == "datetime")
        return new Date(d);


    if (type == "locate_cz") {
        const locateD = new Date(d);
        return locateD.toLocaleString("cz-CS");
    }

    return Math.floor(d / 1000);
};

export function stripNonNumeric(input: string): string {
    const regex = /[^0-9]/g;
    return input.replace(regex, "");
}
