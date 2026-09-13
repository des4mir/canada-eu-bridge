require('dotenv').config();
async function run() {
  const apiKey = process.env.NEWS_API_KEY;
  if (!apiKey) { console.log('no key'); return; }
  const queries = [
    '"Canada" AND ("CETA" OR "European Union" OR "EU" OR "Europe") AND ("trade" OR "investment" OR "tourism" OR "partnership")',
    '"Canada EU" OR "Canada Europe" OR ("Canada" AND "CETA")'
  ];
  for (const q of queries) {
    const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(q)}&lang=en&max=4&apikey=${apiKey}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log('Query:', q);
      if (data.articles) {
        data.articles.forEach(a => console.log(' -', a.title));
      } else {
        console.log(data);
      }
    } catch(e) {
      console.error(e);
    }
  }
}
run();
