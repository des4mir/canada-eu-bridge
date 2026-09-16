const fs = require('fs');
let code = fs.readFileSync('src/components/Hero.tsx', 'utf8');

// Remove background blobs
code = code.replace(
  /<div className="absolute inset-0 opacity-15 pointer-events-none overflow-hidden">[\s\S]*?<\/div>/,
  ''
);

// Update section class
code = code.replace(
  'className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-slate-800"',
  'className="relative overflow-hidden bg-slate-950 text-white pt-16 pb-20 lg:pt-24 lg:pb-32 border-b border-slate-900"'
);

// Update stats bento row
const oldStats = `<div className="mt-12 lg:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {t.hero.stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4 sm:p-5 backdrop-blur-sm hover:border-slate-600 transition-all"
            >
              <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                {stat.value}
              </span>
              <h2 className="text-base font-semibold text-blue-300 mt-1">
                {stat.label}
              </h2>
              <p className="text-sm text-slate-400 mt-0.5">
                {stat.sub}
              </p>
            </div>
          ))}
        </div>`;

const newStats = `<div className="mt-16 lg:mt-24 grid grid-cols-2 md:grid-cols-4 border-t border-slate-800/60 pt-8 gap-y-8">
          {t.hero.stats.map((stat, idx) => (
            <div
              key={idx}
              className={\`flex flex-col \${idx !== 0 && idx !== 2 ? 'md:pl-8 md:border-l border-slate-800/60' : ''} \${idx % 2 !== 0 ? 'pl-6 border-l border-slate-800/60 md:border-l-0 md:pl-0' : ''}\`}
            >
              <span className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight font-serif mb-2">
                {stat.value}
              </span>
              <h2 className="text-sm font-semibold text-slate-200 uppercase tracking-widest mb-1">
                {stat.label}
              </h2>
              <p className="text-sm text-slate-400">
                {stat.sub}
              </p>
            </div>
          ))}
        </div>`;

code = code.replace(oldStats, newStats);

// Update buttons for exact 2x horizontal padding vs vertical padding (e.g. px-6 py-3)
code = code.replace(/px-5 py-3/g, 'px-6 py-3');
code = code.replace(/rounded-xl/g, 'rounded-none'); // Elegant sharp edges or slightly rounded (e.g. rounded-sm)
// Instead of rounded-none, let's use rounded-full for pills, or keep them rounded-sm
code = code.replace(/rounded-none/g, 'rounded-sm');

// Remove border from chat button
code = code.replace('border border-slate-700 ', '');

fs.writeFileSync('src/components/Hero.tsx', code);
