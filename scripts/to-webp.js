// Convert jpg/jpeg/png images to .webp (same name/location, quality 82).
// Usage: npm run webp -- <file-or-dir> [...more files/dirs]
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const QUALITY = 82;
const EXTENSIONS = new Set(['.jpg', '.jpeg', '.png']);

function collectFiles(inputPath) {
    const stat = fs.statSync(inputPath);
    if (stat.isDirectory()) {
        const files = [];
        for (const entry of fs.readdirSync(inputPath, { withFileTypes: true })) {
            const full = path.join(inputPath, entry.name);
            if (entry.isDirectory()) {
                files.push(...collectFiles(full));
            } else if (EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
                files.push(full);
            }
        }
        return files;
    }
    return [inputPath];
}

async function convert(file) {
    const outFile = file.replace(/\.[^.]+$/, '.webp');
    await sharp(file).webp({ quality: QUALITY }).toFile(outFile);
    console.log(`${file} -> ${outFile}`);
}

async function main() {
    const inputs = process.argv.slice(2);
    if (inputs.length === 0) {
        console.error('Usage: npm run webp -- <file-or-dir> [...more]');
        process.exit(1);
    }
    const files = inputs.flatMap(collectFiles);
    if (files.length === 0) {
        console.log('No jpg/jpeg/png files found.');
        return;
    }
    for (const file of files) {
        await convert(file);
    }
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
