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

export function formatDatetime(d: Date) {
    return `${d.getHours()}:${d.getMinutes()}, ${d.getDate()} ${MONTHS[d.getMonth()].substring(0, 3)}, ${d.getFullYear()}`
}