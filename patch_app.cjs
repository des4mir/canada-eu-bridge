const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  'import { DisclaimerBanner } from "./components/DisclaimerBanner";\n',
  ''
);

code = code.replace(
  '      <DisclaimerBanner currentLang={currentLang} />\n',
  ''
);

fs.writeFileSync('src/App.tsx', code);
