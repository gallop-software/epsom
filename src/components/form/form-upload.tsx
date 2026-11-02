'use client'

import arrowUpTrayIcon from '@iconify/icons-heroicons/arrow-up-tray'
import { useEffect, useRef, useState } from 'react'
import { Icon } from '@/components/icon'
import { FormField } from './form-field'

// ============================================================================
// FormUpload Component (dropzone style)
// ============================================================================

export type FormUploadProps = {
  id?: string
  /** `files` sends the files as attachments (api/submit-form). */
  name: string
  multiple?: boolean
  accept?: string
  required?: boolean | undefined
  className?: string
  maxFiles?: number
  label?: string
}

export function FormUpload({
  id,
  name,
  multiple = false,
  accept = '.pdf,.doc,.docx',
  required,
  className = '',
  maxFiles = 1,
  label = '',
}: FormUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [files, setFiles] = useState<File[]>([])
  const [error, setError] = useState<string | null>(null)

  const keyOf = (f: File) => `${f.name}-${f.size}-${f.lastModified}`

  const syncInput = (list: File[]) => {
    const input = inputRef.current
    if (!input) return
    const dt = new DataTransfer()
    list.forEach((f) => dt.items.add(f))
    input.files = dt.files
  }

  const setWithLimit = (next: File[], addedCount = 0) => {
    const capped = next.slice(-maxFiles)
    if (capped.length < next.length && maxFiles > 1)
      setError(`Only ${maxFiles} files allowed.`)
    else if (addedCount) setError(null)
    setFiles(capped)
    syncInput(capped)
  }

  const addFiles = (incoming: FileList | File[]) => {
    const list = Array.from(incoming)
    const map = new Map(files.map((f) => [keyOf(f), f]))
    list.forEach((f) => map.set(keyOf(f), f))
    setWithLimit(Array.from(map.values()), list.length)
  }

  const removeAt = (i: number) => {
    const next = files.filter((_, idx) => idx !== i)
    setError(null)
    setFiles(next)
    syncInput(next)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) addFiles(e.target.files)
  }

  const prevent = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    prevent(e)
    if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files)
  }

  // Clear files when form is reset
  useEffect(() => {
    const formElement = inputRef.current?.form
    if (!formElement) return

    const handleFormCleared = () => {
      setFiles([])
      setError(null)
      if (inputRef.current) inputRef.current.value = ''
    }

    formElement.addEventListener('form-cleared', handleFormCleared)
    return () =>
      formElement.removeEventListener('form-cleared', handleFormCleared)
  }, [])

  return (
    <FormField
      htmlFor={id ?? name}
      label={label}
      required={required}
    >
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={prevent}
        onDragEnter={prevent}
        onDrop={handleDrop}
        className={`relative cursor-pointer border border-dashed border-upload-border bg-upload p-5 text-center ${className}`}
        aria-label="File uploader"
        role="button"
        tabIndex={0}
        onKeyDown={(e) =>
          (e.key === 'Enter' || e.key === ' ') && inputRef.current?.click()
        }
      >
        <input
          ref={inputRef}
          id={id ?? name}
          name={name}
          type="file"
          multiple={multiple}
          accept={accept}
          required={required && files.length === 0}
          onChange={handleChange}
          data-label={label}
          className="absolute bottom-0 left-1/2 h-px w-px opacity-0"
        />
        <div className="flex flex-col items-center text-[15px] leading-normal text-contrast-dark/70">
          <Icon
            icon={arrowUpTrayIcon}
            className="mb-[5px] h-10 w-10 opacity-50"
          />
          <span className="block">
            Drop a file here, or click to choose one.
          </span>
        </div>

        {error && <p className="mt-3 mb-0 text-sm text-required">{error}</p>}

        {files.length > 0 && (
          <ul className="mt-3 mb-0 list-none text-left text-sm">
            {files.map((file, i) => (
              <li
                key={keyOf(file)}
                className="flex items-center justify-between gap-3"
              >
                <span
                  className="truncate"
                  title={file.name}
                >
                  {file.name}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeAt(i)
                  }}
                  className="shrink-0 cursor-pointer text-accent2 underline"
                  aria-label={`Remove ${file.name}`}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </FormField>
  )
}
