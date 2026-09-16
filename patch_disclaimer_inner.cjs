const fs = require('fs');
let code = fs.readFileSync('src/components/DisclaimerBanner.tsx', 'utf8');

code = code.replace(
  '<div className="flex items-start sm:items-center justify-between gap-3 sm:gap-4">',
  '<div className="max-w-7xl mx-auto flex items-start sm:items-center justify-between gap-3 sm:gap-4 w-full">'
);

fs.writeFileSync('src/components/DisclaimerBanner.tsx', code);
