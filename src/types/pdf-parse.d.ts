// src/types/pdf-parse.d.ts

declare function pdf(
  buffer: Buffer
): Promise<{
  text: string
  info?: any
  metadata?: any
  numpages?: number
  numrender?: number
  version?: string
}>

export = pdf
