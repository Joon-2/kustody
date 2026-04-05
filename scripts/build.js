const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const TEMPLATE = fs.readFileSync(path.join(ROOT, 'templates', 'index.html'), 'utf8');
const LOCALES_DIR = path.join(ROOT, 'locales');
const PUBLIC_DIR = path.join(ROOT, 'public');

const localeFiles = fs.readdirSync(LOCALES_DIR).filter(f => f.endsWith('.json'));

for (const file of localeFiles) {
  const locale = JSON.parse(fs.readFileSync(path.join(LOCALES_DIR, file), 'utf8'));
  const lang = locale.lang;
  const isDefault = lang === 'en';

  // Set basePath and active language classes
  const basePath = isDefault ? '' : '../';
  const vars = {
    ...locale,
    basePath,
    activeLangEn: lang === 'en' ? 'active' : '',
    activeLangKo: lang === 'ko' ? 'active' : '',
    activeLangJa: lang === 'ja' ? 'active' : '',
  };

  // Replace all {{key}} placeholders
  let html = TEMPLATE.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    if (key in vars) return vars[key];
    console.warn(`  Warning: missing key "${key}" in ${file}`);
    return match;
  });

  // Write output
  const outDir = isDefault ? PUBLIC_DIR : path.join(PUBLIC_DIR, lang);
  if (!isDefault) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  const outPath = path.join(outDir, 'index.html');
  fs.writeFileSync(outPath, html, 'utf8');
  console.log(`  ✓ ${path.relative(ROOT, outPath)}`);
}

console.log('\nBuild complete.');
