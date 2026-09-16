const fs = require('fs');

const files = [
  'src/components/VisitSection.tsx',
  'src/components/InvestSection.tsx',
  'src/components/PartnershipSection.tsx',
  'src/components/NewsSection.tsx'
];

for (const file of files) {
  if (fs.existsSync(file)) {
    let code = fs.readFileSync(file, 'utf8');
    // Replace hover:shadow-md with a more refined interaction
    code = code.replace(/hover:shadow-md/g, 'hover:-translate-y-0.5 hover:shadow-sm');
    // Ensure font-extrabold is softened to font-bold or font-semibold for serif headings
    code = code.replace(/font-extrabold/g, 'font-semibold');
    code = code.replace(/font-bold/g, 'font-medium');
    
    fs.writeFileSync(file, code);
  }
}
console.log('Cards and headings patched');
