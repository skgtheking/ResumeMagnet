// src/app/api/parse-resume/route.ts
export const runtime = 'nodejs'

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const file = formData.get('file')

  if (!file || !(file instanceof File)) {
    return NextResponse.json(
      { error: 'No PDF file provided' },
      { status: 400 }
    )
  }

  // turn the browser File into a Node Buffer
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  try {
    // dynamically import pdf-parse *inside* the try
    // so import-time errors are caught here
    const { default: pdf } = await import('pdf-parse')

    const data = await pdf(buffer)
    return NextResponse.json({ text: data.text })
  } catch (err: any) {
    console.error('❌ PDF parse or import error:', err)
    return NextResponse.json(
      {
        error: 'Failed to parse PDF',
        details: err.message,
      },
      { status: 500 }
    )
  }
}
