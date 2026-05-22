# pdf-export

Export any URL to PDF from the command line.

## Install

```bash
npm install -g .
```

## Usage

```bash
pdf-export <url> [options]
```

### Arguments

| Argument | Description |
|----------|-------------|
| `url`    | The URL to export as PDF (required) |

### Options

| Option | Default | Description |
|--------|---------|-------------|
| `-o, --output <path>` | `./output.pdf` | Output file path |
| `-w, --wait <ms>` | `1000` | Extra wait time in ms after page load |
| `-f, --format <size>` | `A4` | PDF format (e.g. A4, Letter) |
| `-l, --landscape` | `false` | Use landscape orientation |
| `--no-background` | `false` | Omit page background |
| `-h, --help` | | Show help |

### Examples

```bash
# Basic usage
pdf-export https://example.com

# Custom output path and format
pdf-export https://example.com -o report.pdf -f Letter

# Landscape with extra wait time
pdf-export https://example.com -l -w 3000
```

## How It Works

Uses [Playwright](https://playwright.dev) to launch a headless Chromium browser, navigate to the provided URL, and save the rendered page as a PDF.

## Requirements

- Node.js
- Chromium browser (Playwright will download one automatically via `npx playwright install chromium`)
