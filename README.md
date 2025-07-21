# ResumeMagnet
ResumeMagnet extracts text from your PDF resume in a Next.js app so you can feed it into any AI or processing pipeline.

# ResumeMagnet

ResumeMagnet is a simple AI-powered resume parser built with Next.js, Tailwind CSS, TypeScript, and pdf-parse. It allows users to upload their PDF resumes and instantly see the extracted text content. This project is built specifically with international students and early career job seekers in mind, helping them process and optimize their resumes quickly.

## Features

- 📄 Upload a PDF resume
- ⚙️ Parse and extract raw text content using `pdf-parse`
- 🎨 Styled with Tailwind CSS and `shadcn/ui` components
- 🌗 Dark mode support via `next-themes`
- 🧠 AI-ready foundation for future smart resume suggestions

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- pdf-parse
- shadcn/ui
- next-themes

## Getting Started

Follow these steps to run the app locally.

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/ResumeMagnet.git
cd ResumeMagnet
```

### 2. Install dependencies

```bash
npm install
```

### 3. Patch pdf-parse to avoid debug mode error

```bash
npx patch-package pdf-parse
```

Ensure the following line is present in your `package.json` under `"scripts"`:

```json
"postinstall": "patch-package"
```

### 4. Start the development server

```bash
npm run dev
```

### 5. Visit the app

Open your browser and go to:

```
http://localhost:3000/upload
```

## Folder Structure

```
src/
├── app/
│   ├── upload/         # Upload page with form
│   └── api/
│       └── parse-resume/  # API route to parse uploaded PDF
├── components/
│   └── ui/             # Reusable UI components from shadcn
├── lib/
│   └── utils.ts        # Utility functions (e.g., file validation)
```

## Known Issues

- If you see `ENOENT: no such file or directory` referring to `05-versions-space.pdf`, it means `pdf-parse` entered its debug path. Use the patch step above to fix it.
- Windows users: the `rm -rf` command won’t work in CMD. Use `rmdir /s /q node_modules` instead.

## License

MIT © 2025 Shubham Gupta
