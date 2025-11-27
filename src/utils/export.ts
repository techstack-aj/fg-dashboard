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
    return lines.join('\n')
}


export function exportAllAsCSV(items: IndexItem[]) {
    // CSV-Format: name,category,tags (kompatibel mit Import)
    const rows: Array<Record<string, string | number>> = []
    for (const it of items) {
        rows.push({ 
            name: it.name, 
            category: it.category, 
            tags: it.tags.join(';') 
        })
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