// --- filepath: src/utils/export.ts
import { IndexItem } from '../types'


function toCSV(rows: Array<Record<string, string | number>>): string {
    if (rows.length === 0) return ''
    const headers = Object.keys(rows[0])
    const esc = (v: any) => String(v).replaceAll('"', '""')
    const lines = [headers.join(',')]
    for (const r of rows) {
        lines.push(headers.map(h => `"${esc(r[h] ?? '')}"`).join(','))
    }
    return lines.join('')
}


export function exportAllAsCSV(items: IndexItem[]) {
    // Ein kombiniertes CSV: index,date,value
    const rows: Array<Record<string, string | number>> = []
    for (const it of items) {
        for (const p of it.history) {
            rows.push({ index: it.name, date: p.date, value: p.value })
        }
    }
    const csv = toCSV(rows)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'fear-greed-indices.csv'
    a.click()
    URL.revokeObjectURL(url)
}