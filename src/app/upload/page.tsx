// src/app/upload/page.tsx
'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import { Button } from '@/components/ui/button'

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [parsedText, setParsedText] = useState<string>('')
  const [loading, setLoading] = useState(false)

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setParsedText('')
    if (e.target.files?.[0]) setFile(e.target.files[0])
  }

  // ← Replace your old handleSubmit with this block:
  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!file) return
    setLoading(true)
    setParsedText('')

    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/parse-resume', {
        method: 'POST',
        body: formData,
      })

      // Grab the raw response body (could be HTML or JSON)
      const text = await res.text()

      if (!res.ok) {
        // Display status code + full body so we can see HTML errors
        setParsedText(`Error ${res.status}:\n${text}`)
        return
      }

      // If it was OK, parse JSON and show the extracted text
      const data = JSON.parse(text)
      setParsedText(data.text)
    } catch (err: any) {
      console.error('Network error:', err)
      setParsedText(`Upload failed: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }
  // ← End of replacement

  return (
    <div className="max-w-xl mx-auto py-8">
      <h1 className="text-2xl font-semibold mb-4">Upload Your PDF Resume</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          accept="application/pdf"
          onChange={handleChange}
          className="block w-full text-sm text-foreground
                     file:mr-4 file:py-2 file:px-4 file:rounded
                     file:border-0 file:text-sm file:font-semibold
                     file:bg-primary file:text-primary-foreground
                     hover:file:bg-primary/90"
        />
        <Button type="submit" disabled={!file || loading}>
          {loading ? 'Parsing…' : 'Upload & Parse'}
        </Button>
      </form>

      {parsedText && (
        <section className="mt-6">
          <h2 className="text-xl font-medium mb-2">Parsed Text</h2>
          <pre className="whitespace-pre-wrap bg-muted p-4 rounded text-sm">
            {parsedText}
          </pre>
        </section>
      )}
    </div>
  )
}
