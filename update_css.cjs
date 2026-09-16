const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

const baseRules = `
@layer base {
  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-serif);
  }
}
`;

if (!css.includes('@layer base')) {
  css += baseRules;
  fs.writeFileSync('src/index.css', css);
}
console.log('CSS updated');
