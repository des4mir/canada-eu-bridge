const fs = require('fs');
let code = fs.readFileSync('src/components/Hero.tsx', 'utf8');

const oldStatsMap = `{t.hero.stats.map((stat, idx) => (
            <div
              key={idx}
              className={\`flex flex-col h-full justify-between \${idx !== 0 && idx !== 2 ? 'md:pl-8 md:border-l border-slate-800/60' : ''} \${idx % 2 !== 0 ? 'pl-6 border-l border-slate-800/60 md:border-l-0 md:pl-0' : ''}\`}
            >
              <span className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-light text-white tracking-tight font-serif mb-4 leading-none md:leading-tight">
                {stat.value}
              </span>
              <div className="mt-auto">
                <h2 className="text-xs sm:text-sm font-semibold text-slate-200 uppercase tracking-widest mb-1">
                  {stat.label}
                </h2>
                <p className="text-sm text-slate-400">
                  {stat.sub}
                </p>
              </div>
            </div>
          ))}`;

const newStatsMap = `{t.hero.stats.map((stat, idx) => (
            <div
              key={idx}
              className={\`flex flex-col justify-start \${idx !== 0 && idx !== 2 ? 'md:pl-8 md:border-l border-slate-800/60' : ''} \${idx % 2 !== 0 ? 'pl-6 border-l border-slate-800/60 md:border-l-0 md:pl-0' : ''}\`}
            >
              <span className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-light text-white tracking-tight font-serif mb-3 leading-none md:leading-tight">
                {stat.value}
              </span>
              <div>
                <h2 className="text-xs sm:text-sm font-semibold text-slate-200 uppercase tracking-widest mb-1">
                  {stat.label}
                </h2>
                <p className="text-sm text-slate-400">
                  {stat.sub}
                </p>
              </div>
            </div>
          ))}`;

if (code.includes(oldStatsMap)) {
  code = code.replace(oldStatsMap, newStatsMap);
  fs.writeFileSync('src/components/Hero.tsx', code);
  console.log('Successfully applied top alignment');
} else {
  console.log('Failed to find old code');
}
