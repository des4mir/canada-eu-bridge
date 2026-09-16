const fs = require('fs');
let code = fs.readFileSync('src/components/DisclaimerBanner.tsx', 'utf8');

code = code.replace(
  /const containerStyles = variant === "light".*?: "bg-slate-800 border-t-2 border-slate-700 text-slate-100 px-4 py-3 sm:py-4 relative z-30 shadow-md";/s,
  `const containerStyles = "bg-amber-100/95 backdrop-blur-sm border border-amber-300 text-amber-950 px-4 sm:px-5 py-3 sm:py-4 rounded-xl shadow-sm mb-8 w-fit";`
);

// We no longer need variant prop really, but let's just replace the containerStyles definition.
fs.writeFileSync('src/components/DisclaimerBanner.tsx', code);
