const fs = require('fs');
let code = fs.readFileSync('src/components/DisclaimerBanner.tsx', 'utf8');

code = code.replace(
  'const containerStyles = "bg-amber-100/95 backdrop-blur-sm border border-amber-300 text-amber-950 px-4 sm:px-5 py-3 sm:py-4 rounded-xl shadow-sm mb-8 w-fit";',
  'const containerStyles = "bg-amber-100/95 backdrop-blur-sm border border-amber-300 text-amber-950 px-4 sm:px-5 py-3 sm:py-4 rounded-xl shadow-sm mb-8 w-full max-w-4xl";'
);

code = code.replace(
  'const iconStyles = variant === "light" ? "text-amber-700" : "text-amber-400";',
  'const iconStyles = "text-amber-700";'
);

code = code.replace(
  /const btnStyles = variant === "light".*?: "hover:bg-slate-700 text-slate-300 hover:text-white";/s,
  'const btnStyles = "hover:bg-amber-200 text-amber-800 hover:text-amber-950";'
);

code = code.replace(
  '<div className="max-w-7xl mx-auto flex items-start sm:items-center justify-between gap-3 sm:gap-4">',
  '<div className="flex items-start sm:items-center justify-between gap-3 sm:gap-4">'
);

fs.writeFileSync('src/components/DisclaimerBanner.tsx', code);
