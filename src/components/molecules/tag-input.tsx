'use client'

import { X } from '@phosphor-icons/react'
import { KeyboardEvent, useCallback, useState } from 'react'

interface TagInputProps {
  tags: string[]
  onTagsChange: (tags: string[]) => void
  placeholder?: string
  className?: string
}

export function TagInput({ tags, onTagsChange, placeholder = 'Tambah tag...', className }: TagInputProps) {
  const [inputValue, setInputValue] = useState('')

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && inputValue.trim()) {
        e.preventDefault()
        const newTag = inputValue.trim().toLowerCase()
        if (!tags.includes(newTag)) {
          onTagsChange([...tags, newTag])
        }
        setInputValue('')
      } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
        // Remove last tag when backspace is pressed on empty input
        onTagsChange(tags.slice(0, -1))
      }
    },
    [inputValue, tags, onTagsChange]
  )

  const removeTag = useCallback(
    (tagToRemove: string) => {
      onTagsChange(tags.filter((tag) => tag !== tagToRemove))
    },
    [tags, onTagsChange]
  )

  return (
    <div className={className}>
      <div className="flex min-h-[42px] flex-wrap gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
          >
            {tag}
            <button
              onClick={() => removeTag(tag)}
              className="rounded-full hover:bg-primary/20"
              type="button"
              aria-label={`Remove ${tag}`}
            >
              <X size={14} weight="bold" />
            </button>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? placeholder : ''}
          className="min-w-[120px] flex-1 border-none bg-transparent text-sm outline-none focus:ring-0"
        />
      </div>
      <p className="mt-1 text-xs text-slate-500">Tekan Enter untuk menambah tag</p>
    </div>
  )
}
