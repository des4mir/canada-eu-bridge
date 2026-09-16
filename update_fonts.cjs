const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');
if (!html.includes('fonts.googleapis.com')) {
  const fontLink = `
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet">
  `;
  html = html.replace('</head>', fontLink + '</head>');
  fs.writeFileSync('index.html', html);
}

let css = fs.readFileSync('src/index.css', 'utf8');
if (!css.includes('@theme')) {
  const tailwindTheme = `
@theme {
  --font-sans: "Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif;
  --font-serif: "Playfair Display", ui-serif, Georgia, serif;
}

`;
  css = css.replace('@import "tailwindcss";', '@import "tailwindcss";\n' + tailwindTheme);
  fs.writeFileSync('src/index.css', css);
}

console.log('Fonts updated');
