#!/usr/bin/env node

const { chromium } = require('playwright');

const CHROME_PATH = process.env.CHROME_PATH || '';
const LIB_PATH = process.env.CHROME_LIB_PATH || '/tmp/chrome-libs/extracted/usr/lib/x86_64-linux-gnu:/tmp/chrome-libs/extracted/lib/x86_64-linux-gnu';

function buildEnv() {
  const env = { ...process.env };
  const ldPath = env.LD_LIBRARY_PATH || '';
  env.LD_LIBRARY_PATH = [LIB_PATH, ldPath].filter(Boolean).join(':');
  return env;
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes('-h') || args.includes('--help')) {
    console.log(`
Usage: pdf-export <url> [options]

Arguments:
  url                  The URL to export as PDF (required)

Options:
  -o, --output <path>  Output file path (default: ./output.pdf)
  -w, --wait <ms>      Extra wait time in ms after page load (default: 1000)
  -f, --format <size>  PDF format, e.g. A4, Letter (default: A4)
  -l, --landscape      Use landscape orientation
  --no-background      Omit page background
  -h, --help           Show this help
`);
    process.exit(0);
  }

  const url = args[0];
  try {
    new URL(url);
  } catch {
    console.error(`Error: Invalid URL "${url}"`);
    process.exit(1);
  }

  const output = args.includes('-o') ? args[args.indexOf('-o') + 1]
    : args.includes('--output') ? args[args.indexOf('--output') + 1]
    : 'output.pdf';

  const waitMs = args.includes('-w') ? parseInt(args[args.indexOf('-w') + 1], 10)
    : args.includes('--wait') ? parseInt(args[args.indexOf('--wait') + 1], 10)
    : 1000;

  const format = args.includes('-f') ? args[args.indexOf('-f') + 1]
    : args.includes('--format') ? args[args.indexOf('--format') + 1]
    : 'A4';

  const landscape = args.includes('-l') || args.includes('--landscape');
  const printBackground = !args.includes('--no-background');

  console.log(`Exporting ${url} ...`);

  const launchOptions = {
    headless: true,
    env: buildEnv(),
  };

  if (CHROME_PATH) {
    launchOptions.executablePath = CHROME_PATH;
  }

  const browser = await chromium.launch(launchOptions);

  try {
    const page = await browser.newPage();

    await page.goto(url, {
      waitUntil: 'networkidle',
      timeout: 60000,
    });

    console.log(`Page loaded, waiting ${waitMs}ms for rendering ...`);
    await page.waitForTimeout(waitMs);

    await page.pdf({
      path: output,
      format,
      landscape,
      printBackground,
    });

    const { size } = require('fs').statSync(output);
    console.log(`Done! PDF saved to ${require('path').resolve(output)} (${(size / 1024).toFixed(1)} KB)`);
  } finally {
    await browser.close();
  }
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
