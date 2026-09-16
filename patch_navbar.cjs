const fs = require('fs');
let code = fs.readFileSync('src/components/Navbar.tsx', 'utf8');

code = code.replace(/shadow-md/g, 'shadow-sm');
code = code.replace(/font-extrabold/g, 'font-semibold');
code = code.replace(/font-bold/g, 'font-medium');

// Update header to slate-950 to match hero background
code = code.replace(/bg-slate-900\/95/g, 'bg-slate-950/95 border-slate-900');

fs.writeFileSync('src/components/Navbar.tsx', code);
