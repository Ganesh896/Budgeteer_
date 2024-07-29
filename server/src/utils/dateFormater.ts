export function formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    };

    return date.toLocaleDateString("en-GB", options).replace(",", "");
}
