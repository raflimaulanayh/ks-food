'use client'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function RichTextEditor({ value, onChange, placeholder, className }: RichTextEditorProps) {
  return (
    <div className={className}>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={10}
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 font-mono text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
      />
      <p className="mt-1 text-xs text-slate-500">
        💡 Tip: Gunakan markdown untuk formatting (contoh: **bold**, *italic*, - list)
      </p>
    </div>
  )
}
