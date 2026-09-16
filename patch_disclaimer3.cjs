const fs = require('fs');
let code = fs.readFileSync('src/components/DisclaimerBanner.tsx', 'utf8');

code = code.replace(
  /const containerStyles = "bg-amber-100\/95 backdrop-blur-sm border border-amber-300 text-amber-950 px-4 sm:px-5 py-3 sm:py-4 rounded-xl shadow-sm mb-8 w-full max-w-4xl";/s,
  `const containerStyles = variant === "light"
    ? "bg-amber-100/95 backdrop-blur-sm border border-amber-300 text-amber-950 px-4 sm:px-5 py-3 sm:py-4 rounded-xl shadow-sm mb-8 w-full"
    : "bg-slate-800/80 backdrop-blur-sm border-b border-slate-700 text-slate-200 px-4 sm:px-5 py-3 sm:py-4 shadow-sm w-full rounded-none";`
);

code = code.replace(
  /const iconStyles = "text-amber-700";/s,
  `const iconStyles = variant === "light" ? "text-amber-700" : "text-amber-400";`
);

code = code.replace(
  /const btnStyles = "hover:bg-amber-200 text-amber-800 hover:text-amber-950";/s,
  `const btnStyles = variant === "light" 
    ? "hover:bg-amber-200 text-amber-800 hover:text-amber-950"
    : "hover:bg-slate-700 text-slate-400 hover:text-white";`
);

fs.writeFileSync('src/components/DisclaimerBanner.tsx', code);
