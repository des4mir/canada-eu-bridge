const fs = require('fs');
let code = fs.readFileSync('src/components/Hero.tsx', 'utf8');

if (!code.includes('DisclaimerBanner')) {
  code = code.replace(
    'import { Language } from "../types";',
    'import { Language } from "../types";\nimport { DisclaimerBanner } from "./DisclaimerBanner";'
  );
  
  code = code.replace(
    '{/* Bilateral Tag Badge */}',
    '<DisclaimerBanner currentLang={currentLang} />\n\n        {/* Bilateral Tag Badge */}'
  );
  
  fs.writeFileSync('src/components/Hero.tsx', code);
}
