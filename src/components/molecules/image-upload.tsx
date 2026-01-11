'use client'

import { Image as ImageIcon, X } from '@phosphor-icons/react'
import { useCallback, useState } from 'react'

interface ImageUploadProps {
  images: string[]
  onImagesChange: (images: string[]) => void
  maxImages?: number
  className?: string
}

export function ImageUpload({ images, onImagesChange, maxImages = 5, className }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleFileChange = useCallback(
    (files: FileList | null) => {
      if (!files) return

      const remainingSlots = maxImages - images.length
      const filesToProcess = Array.from(files).slice(0, remainingSlots)

      filesToProcess.forEach((file) => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader()
          reader.onloadend = () => {
            const base64String = reader.result as string
            onImagesChange([...images, base64String])
          }
          reader.readAsDataURL(file)
        }
      })
    },
    [images, maxImages, onImagesChange]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setIsDragging(false)
      handleFileChange(e.dataTransfer.files)
    },
    [handleFileChange]
  )

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback(() => {
    setIsDragging(false)
  }, [])

  const removeImage = useCallback(
    (index: number) => {
      const newImages = images.filter((_, i) => i !== index)
      onImagesChange(newImages)
    },
    [images, onImagesChange]
  )

  const canAddMore = images.length < maxImages

  return (
    <div className={className}>
      {/* Upload Area */}
      {canAddMore && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`relative rounded-lg border-2 border-dashed p-6 text-center transition-colors ${
            isDragging ? 'border-primary bg-red-50' : 'border-slate-300 bg-slate-50'
          }`}
        >
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleFileChange(e.target.files)}
            className="absolute inset-0 cursor-pointer opacity-0"
            id="image-upload-input"
          />
          <label htmlFor="image-upload-input" className="cursor-pointer">
            <ImageIcon size={32} className="mx-auto mb-2 text-slate-400" />
            <p className="text-sm font-medium text-slate-600">Drag & drop atau klik untuk upload gambar</p>
            <p className="mt-1 text-xs text-slate-500">
              Max {maxImages} gambar ({images.length}/{maxImages})
            </p>
          </label>
        </div>
      )}

      {/* Image Previews */}
      {images.length > 0 && (
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {images.map((image, index) => (
            <div key={index} className="group relative aspect-square overflow-hidden rounded-lg border border-slate-200">
              <img src={image} alt={`Preview ${index + 1}`} className="h-full w-full object-cover" />
              <button
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 rounded-full bg-primary p-1 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-primary/90"
                type="button"
              >
                <X size={16} weight="bold" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
