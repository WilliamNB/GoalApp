export function formatGoalDate(date: Date | string | undefined): string {
  if (!date) return ""; // Handle null or undefined case

  const parsedDate = typeof date === "string" ? new Date(date) : date;

  // Ensure that the parsedDate is a valid date object.
  if (isNaN(parsedDate.getTime())) {
    return ""; // Return an empty string for invalid dates
  }

  return parsedDate.toDateString();
}
