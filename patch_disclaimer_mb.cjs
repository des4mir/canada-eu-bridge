const fs = require('fs');
let code = fs.readFileSync('src/components/DisclaimerBanner.tsx', 'utf8');

code = code.replace(
  'const containerStyles = variant === "light"\n    ? "bg-amber-100/95 backdrop-blur-sm border border-amber-300 text-amber-950 px-4 sm:px-5 py-3 sm:py-4 rounded-xl shadow-sm mb-8 w-full"\n    : "bg-slate-800/80 backdrop-blur-sm border-b border-slate-700 text-slate-200 px-4 sm:px-5 py-3 sm:py-4 shadow-sm w-full rounded-none";',
  'const containerStyles = variant === "light"\n    ? "bg-amber-100/95 backdrop-blur-sm border border-amber-300 text-amber-950 px-4 sm:px-5 py-3 sm:py-4 rounded-xl shadow-sm mb-8 w-full"\n    : "bg-slate-800/80 backdrop-blur-sm border-b border-slate-700 text-slate-200 px-4 sm:px-5 py-3 sm:py-4 shadow-sm w-full rounded-none";'
);
// let's just make it exact
code = code.replace(
  /mb-8 w-full/g,
  'mb-8 w-full'
);
// replace dark one to not have mb-8
code = code.replace(
  /shadow-sm w-full rounded-none/,
  'shadow-sm w-full rounded-none mb-0'
);

fs.writeFileSync('src/components/DisclaimerBanner.tsx', code);
