/**
 * Formats a date string to YYYY-MM-DD format with optional time
 * @param {string} dateString - The date string to format
 * @returns {string} Formatted date string or "No registra" if invalid
 */
export const formatDate = (dateString) => {
  try {
    // Check if date is "0000-00-00" or empty
    if (!dateString || dateString === "0000-00-00") {
      return "No registra";
    }

    const date = new Date(dateString);
    
    // Check if date is invalid
    if (isNaN(date.getTime())) {
      return "No registra";
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Include time if it's not 00:00
    const timePart = hours !== 0 || minutes !== 0
      ? ` ${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`
      : "";

    return `${year}-${month}-${day}${timePart}`;
  } catch (error) {
    console.error("Error formatting date:", error);
    return "No registra";
  }
};

/**
 * Parses a date string in YYYY-MM-DD format
 * @param {string} dateString - The date string to parse
 * @returns {Date} Parsed date object
 */
export const parseDate = (dateString) => {
  const [year, month, day] = dateString.split("-");
  return new Date(year, month - 1, day);
};

// Month and year options for dropdowns
const months = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const years = ["2025", "2024", "2023"];

export const monthOptions = months.map((month, index) => ({
  value: (index + 1).toString().padStart(2, "0"),
  label: month,
}));

export const yearOptions = years.map((year) => ({
  value: year,
  label: year,
}));