const fs = require('fs');

const leafPath = "M 0,-45 L 6,-18 L 24,-28 L 15,-5 L 45,-12 L 30,12 L 45,35 L 20,25 L 10,40 L 4,35 L 4,75 L -4,75 L -4,35 L -10,40 L -20,25 L -45,35 L -30,12 L -45,-12 L -15,-5 L -24,-28 L -6,-18 Z";

const starPath = "M 0,-12 L 2.69,-3.71 L 11.41,-3.71 L 4.36,1.41 L 7.05,10.12 L 0,5 L -7.05,10.12 L -4.36,1.41 L -11.41,-3.71 L -2.69,-3.71 Z";

let stars = '';
const R = 60;
for(let i=0; i<12; i++) {
    const angle = (i * 30 - 90) * Math.PI / 180;
    const x = Math.cos(angle) * R;
    const y = Math.sin(angle) * R;
    stars += `  <path d="${starPath}" fill="#FFCC00" transform="translate(${x}, ${y})" />\n`;
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <style>
      .leaf { fill: #FF0000; }
      .bridge { fill: none; stroke: #003399; stroke-width: 24; stroke-linecap: round; }
    </style>
  </defs>

  <!-- Bridge -->
  <path class="bridge" d="M 120,380 Q 256,280 392,380" />
  <path class="bridge" d="M 120,380 L 120,440 M 392,380 L 392,440 M 188,348 L 188,440 M 324,348 L 324,440" stroke-width="16" />

  <!-- Canada Side -->
  <g transform="translate(140, 220) scale(2)">
    <path class="leaf" d="${leafPath}" />
  </g>

  <!-- EU Side -->
  <g transform="translate(372, 220) scale(1.1)">
${stars}
  </g>
</svg>`;

fs.writeFileSync('test_logo.svg', svg);
console.log("SVG generated.");
