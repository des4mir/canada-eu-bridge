import { NewsItem } from "../types";

/**
 * =========================================================================
 * STATIC NEWS HIGHLIGHTS DATA / DONNÉES STATIQUES DES ACTUALITÉS
 * =========================================================================
 * 
 * YOU CAN SAFELY EDIT, ADD, OR REMOVE ARTICLES IN THIS ARRAY.
 * Each article supports both English and French titles, summaries, and key points.
 * 
 * Instructions:
 * 1. To change an existing news item: Update 'titleEn', 'titleFr', 'summaryEn', 'summaryFr', etc.
 * 2. To add a new article: Copy one of the objects below and append it to the array.
 * 3. To remove an article: Delete or comment out the object block.
 * =========================================================================
 */

export const STATIC_NEWS_ITEMS: NewsItem[] = [
  {
    id: "news-1",
    titleEn: "CETA Transatlantic Trade Surpasses New Milestones",
    titleFr: "Le commerce transatlantique sous l'AECG franchit de nouveaux caps",
    categoryEn: "Trade & Economy",
    categoryFr: "Commerce et Économie",
    date: "August 2026",
    summaryEn: "Bilateral merchandise trade between Canada and the European Union has expanded significantly since the provisional application of the Comprehensive Economic and Trade Agreement (CETA), eliminating tariffs on 98% of tariff lines.",
    summaryFr: "Le commerce bilatéral de marchandises entre le Canada et l'Union européenne a connu une croissance soutenue depuis la mise en application provisoire de l'AECG, éliminant les droits de douane sur 98 % des lignes tarifaires.",
    highlightsEn: [
      "98% of EU-Canada customs duties eliminated on industrial goods and agriculture.",
      "Record exports in clean energy components, aerospace equipment, and specialty agri-food.",
      "Streamlined customs clearance and mutual recognition of conformity assessments."
    ],
    highlightsFr: [
      "Suppression de 98 % des droits de douane canado-européens sur les biens industriels et agricoles.",
      "Exportations records dans les technologies propres, l'aérospatiale et l'agroalimentaire spécialisé.",
      "Dédouanement simplifié et reconnaissance mutuelle des évaluations de conformité."
    ],
    source: "Global Affairs Canada & European Commission DG Trade",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-200"
  },
  {
    id: "news-2",
    titleEn: "Canada Formally Associates with Horizon Europe Pillar II",
    titleFr: "Le Canada s'associe formellement au Pilier II d'Horizon Europe",
    categoryEn: "Science & Innovation",
    categoryFr: "Science et Innovation",
    date: "July 2026",
    summaryEn: "Canadian researchers and enterprises can now lead and participate in collaborative research consortiums across Europe with direct access to the €95.5 billion Horizon Europe research and innovation framework.",
    summaryFr: "Les chercheurs et entreprises canadiennes peuvent désormais diriger et intégrer des consortiums de recherche à travers l'Europe avec un accès direct au programme-cadre Horizon Europe de 95,5 milliards d'euros.",
    highlightsEn: [
      "Focus on Global Challenges and European Industrial Competitiveness.",
      "Co-funded consortia in artificial intelligence, cancer research, and climate resilience.",
      "Reciprocal talent exchanges for doctoral researchers and university labs."
    ],
    highlightsFr: [
      "Concentration sur les défis mondiaux et la compétitivité industrielle.",
      "Consortiums conjoints en intelligence artificielle, recherche oncologique et climat.",
      "Échanges réciproques de talents pour les doctorants et laboratoires universitaires."
    ],
    source: "European Commission Research & Innovation",
    badgeColor: "bg-amber-100 text-amber-900 border-amber-200"
  },
  {
    id: "news-3",
    titleEn: "Expansion of Direct Transatlantic Flight Corridors",
    titleFr: "Expansion des liaisons aériennes transatlantiques directes",
    categoryEn: "Travel & Tourism",
    categoryFr: "Voyage et Tourisme",
    date: "June 2026",
    summaryEn: "Major European carriers and Canadian airlines have added nonstop frequencies connecting Paris, Frankfurt, Dublin, and Rome to Montreal, Toronto, Calgary, and Halifax, easing European travel to Canada.",
    summaryFr: "Les principales compagnies européennes et canadiennes ont inauguré de nouvelles liaisons sans escale reliant Paris, Francfort, Dublin et Rome à Montréal, Toronto, Calgary et Halifax, facilitant le tourisme européen.",
    highlightsEn: [
      "Direct flights to Western Canada's Rocky Mountain gateway (Calgary).",
      "Streamlined eTA (Electronic Travel Authorization) electronic gates at Canadian airports.",
      "High-speed rail connection integrations between Canadian airport terminals."
    ],
    highlightsFr: [
      "Vols directs vers la porte des Rocheuses canadiennes à Calgary.",
      "Portiques électroniques accélérés pour les détenteurs d'AVE aux aéroports canadiens.",
      "Interconnexions renforcées entre terminaux aéroportuaires et réseaux de transport."
    ],
    source: "Destination Canada / Transport Canada",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200"
  },
  {
    id: "news-4",
    titleEn: "Canada-EU Critical Raw Materials & Clean Hydrogen Alliance",
    titleFr: "Alliance Canada-UE sur les matières premières critiques et l'hydrogène propre",
    categoryEn: "Green Transition",
    categoryFr: "Transition Écologique",
    date: "May 2026",
    summaryEn: "Strategic pact between European manufacturing giants and Canadian mineral producers secures responsible supply chains for lithium, nickel, cobalt, and Atlantic Canada green hydrogen export corridors.",
    summaryFr: "Un pacte stratégique entre leaders industriels européens et producteurs canadiens garantit des chaînes d'approvisionnement durables pour le lithium, le nickel et l'hydrogène vert d'Atlantique.",
    highlightsEn: [
      "Direct supply pipelines for European battery gigafactories meeting strict ESG standards.",
      "Green ammonia export terminals under construction in Newfoundland and Nova Scotia.",
      "Joint regulatory alignment on sustainable mining taxonomies and lifecycle reporting."
    ],
    highlightsFr: [
      "Canaux d'approvisionnement directs pour les gigafactories de batteries européennes selon les normes ESG.",
      "Terminaux d'exportation d'ammoniac vert en cours de déploiement à Terre-Neuve et en Nouvelle-Écosse.",
      "Harmonisation des standards de traçabilité et taxonomie minière durable."
    ],
    source: "EU-Canada Strategic Partnership on Raw Materials",
    badgeColor: "bg-purple-100 text-purple-800 border-purple-200"
  }
];
