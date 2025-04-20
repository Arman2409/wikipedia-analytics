// Type guard to check if a value is a non-empty string
export const isNonEmptyString = (
    value: unknown
): value is string => {
    return typeof value === "string" && value.trim().length > 0;
}

// Type guard to check if a value is a positive integer
export const isPositiveInteger = (
    value: unknown
): value is number => {
    if (typeof value === "string") {
        const num = Number(value);
        return Number.isInteger(num) && num > 0;
    }

    return typeof value === "number" && Number.isInteger(value) && value > 0;
}
