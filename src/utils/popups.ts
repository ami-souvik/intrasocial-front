export function confirmAction({ what }: { what: string }) {
    return confirm(`Are you sure you want to delete ${what}?`)
}