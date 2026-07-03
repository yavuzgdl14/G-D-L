import fs from 'fs';
import path from 'path';
import AdmZip from 'adm-zip';

const zip = new AdmZip();

const ignoreList = [
  'node_modules',
  'dist',
  '.git',
  'gudul_stok.zip',
  'node-compile-cache',
];

function addFilesRecursively(dirPath, targetZipPath = '') {
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    if (ignoreList.includes(file)) continue;

    const fullPath = path.join(dirPath, file);
    const zipPath = targetZipPath ? `${targetZipPath}/${file}` : file;

    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      addFilesRecursively(fullPath, zipPath);
    } else {
      zip.addLocalFile(fullPath, targetZipPath);
    }
  }
}

try {
  console.log('Zipping current project files...');
  addFilesRecursively(process.cwd());
  
  // Save zip file to root workspace
  const rootZipPath = path.join(process.cwd(), 'gudul_stok.zip');
  zip.writeZip(rootZipPath);
  console.log(`ZIP created at: ${rootZipPath}`);

  // Also write to public folder for direct browser download
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }
  const publicZipPath = path.join(publicDir, 'gudul_stok.zip');
  zip.writeZip(publicZipPath);
  console.log(`ZIP also written to public: ${publicZipPath}`);
} catch (error) {
  console.error('Error creating ZIP:', error);
}
