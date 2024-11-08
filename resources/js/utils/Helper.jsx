export function arrayMatch(...arr) {
    const data = arr.map((item) => JSON.stringify(item));
    const firstArray = data[0];
    const allMatch = data.every((item) => item === firstArray);

    return allMatch;
}
