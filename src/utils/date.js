/**
 * Utility function to format date
 * Example: "05/06/2017"
 * @param {Date} date 
 * @returns {String}
 */
function convertDate(date) {
    let days = date.getDate()
    let month = date.getMonth()
    let year = date.getFullYear()

    days = days <= 9 ? `0${days}` : days
    month = month <= 9 ? `0${month}` : month

    return `${days}/${month}/${year}`
}

/**
 * Checks if the input date it's an actual instance of Date
 * @param {Date} date 
 * @returns {Boolean}
 */
function isValidDate(date) {
    return date instanceof Date && !isNaN(date);
}
export { convertDate, isValidDate }