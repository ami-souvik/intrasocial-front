const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]

export function formatDate(d: Date) {
    return `${MONTHS[d.getMonth()].substring(0, 3)} ${d.getDate()}, ${d.getFullYear()}`
}

export function formatDatetime(d: Date) {
    return `${d.getHours()}:${d.getMinutes()}, ${MONTHS[d.getMonth()].substring(0, 3)} ${d.getDate()}, ${d.getFullYear()}`
}