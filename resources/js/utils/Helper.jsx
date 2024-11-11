export function arrayMatch(...arr) {
    const data = arr.map((item) => JSON.stringify(item));
    const firstArray = data[0];
    const allMatch = data.every((item) => item === firstArray);

    return allMatch;
}

export function parseQuestionType(name) {
    return name
        .toLowerCase() // Convert to lowercase: "multiple_answer"
        .replace(/_/g, ' ') // Replace underscores with spaces: "multiple answer"
        .replace(/\b\w/g, (char) => char.toUpperCase());
}
