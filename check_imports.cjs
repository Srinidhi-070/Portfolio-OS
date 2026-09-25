const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    if (fs.statSync(dirPath).isDirectory()) {
      walk(dirPath, callback);
    } else {
      callback(dirPath);
    }
  });
}

const fileMap = new Map();
walk('src', (p) => {
  const norm = p.replace(/\\/g, '/');
  fileMap.set(norm.toLowerCase(), norm);
});

let errorCount = 0;
walk('src', (file) => {
  if (!file.endsWith('.ts') && !file.endsWith('.tsx')) return;
  const content = fs.readFileSync(file, 'utf8');
  const importRegex = /import\s+.*?\s+from\s+['"](\..*?)['"]/g;
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1];
    const targetDir = path.dirname(file);
    const resolvedPath = path.resolve(targetDir, importPath).replace(/\\/g, '/');
    
    // Convert to relative from project root to match fileMap format
    const relativeToProject = path.relative(process.cwd(), resolvedPath).replace(/\\/g, '/');
    
    // Check if the requested file exists, trying extensions
    const extensions = ['', '.ts', '.tsx', '/index.ts', '/index.tsx', '.css', '.jpg', '.png'];
    let found = false;
    let correctCasePath = null;
    let actualRequestedPath = null;

    for (const ext of extensions) {
      const checkPath = (relativeToProject + ext).toLowerCase();
      if (fileMap.has(checkPath)) {
        found = true;
        correctCasePath = fileMap.get(checkPath);
        actualRequestedPath = relativeToProject + ext;
        break;
      }
    }

    if (found) {
      if (actualRequestedPath !== correctCasePath) {
        console.log(`CASE MISMATCH in ${file}: imported '${importPath}' (resolves to ${actualRequestedPath}), but actual file is ${correctCasePath}`);
        errorCount++;
      }
    }
  }
});
if (errorCount === 0) console.log("All local imports have correct casing!");
