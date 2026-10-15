const fs = require('fs');
const path = require('path');

const targetSrc = path.resolve('../sidhivinayak/src');

function walkAndReplace(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkAndReplace(fullPath);
    } else if (file.endsWith('.js') || file.endsWith('.mjs') || file.endsWith('.css') || file.endsWith('.json')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      const original = content;

      content = content
        .replaceAll('K.R. Memorial Hospital', 'Siddhi Vinayak Hospital & Research Centre')
        .replaceAll('K.R. Memorial', 'Siddhi Vinayak Hospital')
        .replaceAll('KR Memorial', 'Siddhi Vinayak Hospital')
        .replaceAll('K. R. Memorial', 'Siddhi Vinayak Hospital')
        .replaceAll('wecare@krmemorialhospital.com', 'infosiddhi@gmail.com')
        .replaceAll('krmemorialhospital.com', 'siddhivinayakhospitalchomu.com')
        .replaceAll('krmhofficial', 'siddhivinayakhospitalchomu')
        .replaceAll('krmhospital', 'siddhivinayakhospital')
        .replaceAll('KRMHospital', 'SVHChomu')
        .replaceAll('8306005111', '01423-294228')
        .replaceAll('8306005105', '01423-294440')
        .replaceAll('01423-220320', '01423-294228')
        .replaceAll('01423220320', '01423294228');

      if (content !== original) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log('Cleaned and replaced in:', path.relative(targetSrc, fullPath));
      }
    }
  }
}

walkAndReplace(targetSrc);

// Also rename admin directory if needed
const oldAdmin = path.resolve('../sidhivinayak/src/app/admin-kr-memorial');
const newAdmin = path.resolve('../sidhivinayak/src/app/admin-siddhi-vinayak');
if (fs.existsSync(oldAdmin) && !fs.existsSync(newAdmin)) {
  fs.renameSync(oldAdmin, newAdmin);
  console.log('Renamed admin-kr-memorial to admin-siddhi-vinayak');
}

// Update top-level files
const targetRoot = path.resolve('../sidhivinayak');
const rootFiles = ['README.md', 'sitemap.js'];
for (const rf of rootFiles) {
  const fp = path.join(targetRoot, rf);
  if (fs.existsSync(fp)) {
    let c = fs.readFileSync(fp, 'utf8');
    c = c
      .replaceAll('K.R. Memorial Hospital', 'Siddhi Vinayak Hospital & Research Centre')
      .replaceAll('K.R. Memorial', 'Siddhi Vinayak Hospital')
      .replaceAll('KR Memorial', 'Siddhi Vinayak Hospital')
      .replaceAll('krmemorialhospital.com', 'siddhivinayakhospitalchomu.com');
    fs.writeFileSync(fp, c, 'utf8');
    console.log('Updated root file:', rf);
  }
}

console.log('Comprehensive sweep complete.');
