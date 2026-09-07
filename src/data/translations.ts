import { QuickPrompt } from "../types";

export const translations = {
  en: {
    siteTitle: "Canada-EU Bridge",
    siteSubtitle: "Transatlantic Gateway for Tourism, Investment & Strategic Partnership",
    nav: {
      visit: "Visit Canada",
      invest: "Invest in Canada",
      partnership: "Canada-EU Partnership",
      news: "News Highlights",
      chat: "Bridge Assistant",
    },
    hero: {
      badge: "Official Bilateral Information Portal",
      title: "Connecting Canada and the European Union",
      subtitle: "A modern informational bridge highlighting transatlantic tourism, business investment under CETA, and our historic strategic partnership for a sustainable, democratic world.",
      ctaVisit: "Plan Your Visit",
      ctaInvest: "Explore Investment",
      ctaChat: "Ask Bridge Assistant",
      stats: [
        { label: "Bilateral Trade", value: "€75B+", sub: "Under CETA agreement" },
        { label: "EU Citizen Entry", value: "eTA", sub: "Online in minutes, $7 CAD" },
        { label: "Research Program", value: "Horizon Europe", sub: "Pillar II Association" },
        { label: "Tariff-Free Goods", value: "98%", sub: "Immediate customs relief" },
      ],
    },
    news: {
      title: "News Highlights",
      subtitle: "Transatlantic updates on commerce, bilateral agreements, aviation routes, and collaborative innovation.",
      editNotice: "Static Content: You can edit or add news items directly in src/data/news.ts.",
      source: "Official Source",
      readMore: "Key Highlights",
    },
    visit: {
      title: "Visit Canada",
      badge: "Travel & Tourism",
      tagline: "Experience breathtaking wilderness, cosmopolitan culture, and visa-free travel for European passport holders.",
      overview: "Canada warmly welcomes European visitors. As citizens of EU member states, travelers enjoy visa-exempt entry for tourism or business visits of up to six months. You simply need an Electronic Travel Authorization (eTA) before boarding your flight.",
      etaBox: {
        title: "eTA Requirements for EU Citizens",
        summary: "An Electronic Travel Authorization (eTA) is electronically linked to your passport and valid for up to 5 years (or until passport expiry).",
        steps: [
          { step: "1", title: "Valid Passport", desc: "Must be a biometric passport from an EU member state." },
          { step: "2", title: "Online Application", desc: "Takes ~5 minutes on the official Government of Canada portal (canada.ca)." },
          { step: "3", title: "Nominal Fee", desc: "Costs only $7 CAD (~€4.80) paid by credit card." },
          { step: "4", title: "Instant Approval", desc: "Most applications are automatically approved via email within minutes." },
        ],
        warning: "Always use the official Government of Canada site (canada.ca) to avoid third-party markups.",
      },
      destinations: [
        {
          region: "The Canadian Rockies & Alberta",
          places: "Banff, Lake Louise, Jasper & Calgary",
          desc: "World-renowned turquoise glacial lakes, majestic mountain peaks, iconic wildlife viewing, and premier hiking or winter ski resorts.",
          tag: "Nature & Adventure",
        },
        {
          region: "Quebec & Francophone Heritage",
          places: "Montreal, Quebec City & Charlevoix",
          desc: "Cobblestone historic quarters, European culinary heritage, vibrant arts and festivals, and the historic heart of French North America.",
          tag: "Culture & Gastronomy",
        },
        {
          region: "Ontario & Greater Toronto",
          places: "Toronto, Niagara Falls & Ottawa",
          desc: "The economic powerhouse and multicultural mosaic, the awe-inspiring Niagara Falls, and national museums in the federal capital.",
          tag: "Metropolis & Icons",
        },
        {
          region: "Pacific Coast & British Columbia",
          places: "Vancouver, Victoria & Whistler",
          desc: "Where coastal rainforests meet temperate ocean shores, offering world-class dining, Indigenous cultural tours, and outdoor sports.",
          tag: "Coastal Pacific",
        },
        {
          region: "Atlantic Maritime Coast",
          places: "Nova Scotia, Newfoundland & PEI",
          desc: "Dramatic lighthouses, coastal fjords, Celtic music traditions, fresh seafood, and warm maritime hospitality.",
          tag: "Oceanic & Heritage",
        },
        {
          region: "The Great North & Aurora",
          places: "Yukon, Yellowknife & Nunavut",
          desc: "Spectacular Northern Lights (Aurora Borealis), midnight sun, untouched Arctic tundra, and rich First Nations & Inuit cultures.",
          tag: "Northern Wonders",
        },
      ],
      tips: [
        { title: "Direct Flights", desc: "Nonstop flights operate daily between Paris, Frankfurt, London, Amsterdam, Dublin, Rome and Montreal/Toronto/Vancouver." },
        { title: "Currency & Cards", desc: "Canadian Dollar ($ CAD). Contactless payment and European credit cards (Visa/Mastercard) are accepted everywhere." },
        { title: "Best Travel Seasons", desc: "Summer (June–Sept) for hiking and lakes; Autumn (Sept–Oct) for spectacular foliage; Winter (Dec–March) for snow and aurora." },
      ],
    },
    invest: {
      title: "Invest in Canada",
      badge: "Trade & Economic Opportunities",
      tagline: "Your North American launchpad with low corporate taxes, preferential EU market access via CETA, and top-tier talent.",
      overview: "Canada offers European corporations one of the world's most stable, predictable, and innovative business environments. Under CETA, European businesses enjoy preferred investor protections and tariff elimination across virtually all product lines.",
      cetaBenefits: [
        {
          title: "98% Tariff Elimination",
          desc: "Immediate duty-free access for almost all industrial and agricultural goods exported between the EU and Canada.",
        },
        {
          title: "Government Procurement Access",
          desc: "EU companies can bid on federal, provincial, and municipal government procurement contracts in Canada—an unprecedented market opening.",
        },
        {
          title: "Service Market Liberalization",
          desc: "Extensive market access for European professional service providers, including engineering, architecture, IT, and environmental services.",
        },
        {
          title: "Temporary Mobility of Professionals",
          desc: "Streamlined temporary entry for intra-corporate transferees, key personnel, and contractual service suppliers.",
        },
      ],
      sectors: [
        {
          title: "Clean Technology & Green Hydrogen",
          desc: "Leading producer of zero-emission electricity with massive green hydrogen export hubs along the Atlantic and robust clean tech tax credits.",
          stats: "Up to 30% Clean Tech Investment Tax Credit",
        },
        {
          title: "Artificial Intelligence & Quantum",
          desc: "Pioneering hubs in Montreal (Mila), Toronto (Vector), and Edmonton (Amii), alongside premier quantum research institutions in Waterloo and Sherbrooke.",
          stats: "#1 G7 Growth in AI Researchers",
        },
        {
          title: "Critical Minerals & Battery Ecosystem",
          desc: "The only Western hemisphere nation with all key raw materials for EV batteries (Lithium, Nickel, Cobalt, Graphite) and direct transatlantic logistics.",
          stats: "Top 5 Global Mineral Potential",
        },
        {
          title: "Life Sciences & Bio-Manufacturing",
          desc: "Rapidly expanding vaccine and therapeutic production facilities, world-class clinical research hospitals, and streamlined health tech approvals.",
          stats: "$2.2B Federal Biomanufacturing Strategy",
        },
      ],
      advantages: [
        { title: "Lowest Net Debt-to-GDP in G7", desc: "Fiscal discipline ensuring economic resilience and steady sovereign credit ratings." },
        { title: "Global Skills Strategy", desc: "Fast-track 2-week processing for highly skilled international workers and engineers." },
        { title: "R&D Tax Incentives (SR&ED)", desc: "Generous tax credits and cash refunds for scientific research and experimental development." },
      ],
    },
    partnership: {
      title: "Canada-EU Partnership",
      badge: "Diplomacy, Security & Shared Values",
      tagline: "A strategic alliance bound by common democratic values, rules-based international order, and joint climate leadership.",
      overview: "The relationship between Canada and the European Union is built on mutual trust, shared historical bonds, and deep commitment to peace, human rights, and sustainable development. Formalized by the Strategic Partnership Agreement (SPA) and CETA, the alliance tackles 21st-century challenges together.",
      pillars: [
        {
          title: "Strategic Partnership Agreement (SPA)",
          desc: "The comprehensive political treaty governing cooperation on foreign policy, crisis management, non-proliferation, cyber defense, and democratic resilience.",
        },
        {
          title: "Transatlantic Green Alliance",
          desc: "Coordinated carbon pricing policies, methane emissions reduction, ocean conservation, and bilateral trade in clean energy technology.",
        },
        {
          title: "Horizon Europe Research Alliance",
          desc: "Canada's formal association with Horizon Europe Pillar II unites leading scientists from both continents on cancer research, climate science, and quantum computing.",
        },
        {
          title: "Raw Materials & Supply Chain Security",
          desc: "Strategic partnership securing transparent, responsible, and ESG-compliant supply chains for critical minerals needed for the clean and digital transition.",
        },
      ],
      milestones: [
        { year: "1976", title: "Framework Agreement", desc: "First formal bilateral cooperation agreement signed between Canada and the European Communities." },
        { year: "2016", title: "Signing of CETA & SPA", desc: "Historic signature of the Comprehensive Economic and Trade Agreement and the Strategic Partnership Agreement." },
        { year: "2017", title: "Provisional Application of CETA", desc: "Bilateral tariffs eliminated on 98% of trade lines, initiating rapid transatlantic commerce expansion." },
        { year: "2021", title: "Strategic Partnership on Raw Materials", desc: "Bilateral accord focused on integrating critical raw materials supply chains between Canada and the EU." },
        { year: "2024–2026", title: "Horizon Europe Association", desc: "Canada formally joins Horizon Europe Pillar II, opening transatlantic collaborative research funding." },
      ],
    },
    chat: {
      title: "Bridge Assistant",
      subtitle: "Gemini-powered AI assistant",
      badge: "Scoped to Visit, Invest & Partnership",
      greeting: "Hello! I am your Canada-EU Bridge AI assistant. I can answer questions about Visiting Canada (eTA, destinations, tips), Investing in Canada (CETA, key sectors, incentives), and the Canada-EU Partnership. How may I assist you today?",
      inputPlaceholder: "Ask about travel, investing, or the Canada-EU partnership...",
      send: "Send",
      clear: "Clear",
      open: "Ask Bridge Assistant",
      minimize: "Minimize",
      expand: "Expand",
      close: "Close",
      thinking: "Bridge Assistant is thinking...",
      disclaimer: "Answers are scoped to Canada-EU Bridge topics and processed through a secure server proxy.",
      scopeWarning: "I specialize strictly in Visiting Canada, Investing in Canada, and the Canada-EU Partnership. Please feel free to ask about travel requirements, CETA benefits, or transatlantic relations!",
      quickSuggestionsTitle: "Suggested Questions:",
    },
    disclaimer: {
      text: "This is an independent, unofficial informational project and is not affiliated with, endorsed by, or representative of the Government of Canada, the European Union, or any government agency. Information here may be outdated or incomplete. For accurate, up-to-date, and official information, please consult Canada.ca, the European Commission's official site, or your relevant embassy/consulate.",
      dismiss: "Dismiss notice",
    },
    footer: {
      brandDesc: "An informational portal dedicated to strengthening transatlantic ties, tourism, economic cooperation, and democratic partnerships between Canada and the European Union.",
      sections: "Sections",
      links: "Official Resources",
      linksList: [
        { label: "Government of Canada (canada.ca)", url: "https://www.canada.ca" },
        { label: "European Commission (europa.eu)", url: "https://ec.europa.eu" },
        { label: "Invest in Canada", url: "https://www.investcanada.ca" },
        { label: "Destination Canada", url: "https://www.destinationcanada.com" },
        { label: "EU Delegation to Canada", url: "https://www.eeas.europa.eu/delegations/canada_en" },
      ],
      legal: "Bilingual platform for Canadian-European transatlantic cooperation. Content verified against official bilateral treaties.",
    },
  },

  fr: {
    siteTitle: "Pont Canada-UE",
    siteSubtitle: "Passerelle transatlantique pour le tourisme, l'investissement et le partenariat stratégique",
    nav: {
      visit: "Visiter le Canada",
      invest: "Investir au Canada",
      partnership: "Partenariat Canada-UE",
      news: "Actualités en vedette",
      chat: "Assistant du Pont",
    },
    hero: {
      badge: "Portail d'information bilatérale officielle",
      title: "Rapprocher le Canada et l'Union européenne",
      subtitle: "Une passerelle moderne mettant en lumière le tourisme transatlantique, les investissements commerciaux sous l'AECG et notre partenariat stratégique historique au service d'un monde démocratique et durable.",
      ctaVisit: "Planifier votre visite",
      ctaInvest: "Découvrir l'investissement",
      ctaChat: "Interroger l'assistant",
      stats: [
        { label: "Commerce bilatéral", value: "75 Mds €+", sub: "Sous l'accord de l'AECG" },
        { label: "Entrée citoyen UE", value: "AVE", sub: "En ligne en 5 min, 7 $ CAD" },
        { label: "Recherche scientifique", value: "Horizon Europe", sub: "Association Pilier II" },
        { label: "Lignes sans douane", value: "98 %", sub: "Exemption tarifaire directe" },
      ],
    },
    news: {
      title: "Actualités en vedette",
      subtitle: "Les faits marquants transatlantiques sur le commerce, les accords bilatéraux, les liaisons aériennes et l'innovation conjointe.",
      editNotice: "Contenu statique : Vous pouvez modifier ou ajouter des actualités directement dans src/data/news.ts.",
      source: "Source officielle",
      readMore: "Points saillants",
    },
    visit: {
      title: "Visiter le Canada",
      badge: "Voyage et Tourisme",
      tagline: "Découvrez des étendues sauvages majestueuses, une culture cosmopolite et une entrée facilitée pour les ressortissants européens.",
      overview: "Le Canada accueille chaleureusement les voyageurs européens. Les citoyens des pays membres de l'UE bénéficient d'une dispense de visa pour des séjours touristiques ou d'affaires allant jusqu'à six mois. Une simple Autorisation de voyage électronique (AVE) est requise avant le vol.",
      etaBox: {
        title: "Conditions d'AVE pour les citoyens de l'UE",
        summary: "L'Autorisation de voyage électronique (AVE) est liée numériquement à votre passeport et reste valide jusqu'à 5 ans (ou jusqu'à l'expiration du passeport).",
        steps: [
          { step: "1", title: "Passeport valide", desc: "Passeport biométrique d'un État membre de l'Union européenne." },
          { step: "2", title: "Demande en ligne", desc: "Prend environ 5 minutes sur le portail officiel du gouvernement du Canada (canada.ca)." },
          { step: "3", title: "Frais minimes", desc: "Seulement 7 $ CAD (~4,80 €) payables par carte bancaire." },
          { step: "4", title: "Approbation rapide", desc: "La grande majorité des demandes sont confirmées par courriel en quelques minutes." },
        ],
        warning: "Effectuez toujours votre démarche sur le site officiel (canada.ca) pour éviter les surcoûts d'intermédiaires non autorisés.",
      },
      destinations: [
        {
          region: "Les Rocheuses et l'Alberta",
          places: "Banff, lac Louise, Jasper et Calgary",
          desc: "Lacs glaciaires turquoise de renommée mondiale, sommets alpins vertigineux, faune emblématique et stations de ski prestigieuses.",
          tag: "Nature et Aventure",
        },
        {
          region: "Québec et héritage francophone",
          places: "Montréal, Québec et Charlevoix",
          desc: "Quartiers historiques pavés, gastronomie réputée, scènes artistiques vibrantes et cœur vibrant de la francophonie nord-américaine.",
          tag: "Culture et Art de vivre",
        },
        {
          region: "Ontario et Grand Toronto",
          places: "Toronto, chutes du Niagara et Ottawa",
          desc: "Mosaïque multiculturelle cosmopolite, chutes du Niagara spectaculaires et musées nationaux de la capitale fédérale.",
          tag: "Métropoles et Symboles",
        },
        {
          region: "Côte Pacifique et Colombie-Britannique",
          places: "Vancouver, Victoria et Whistler",
          desc: "Rencontre des forêts pluviales tempérées et de l'océan Pacifique, gastronomie de la mer et circuits culturels autochtones.",
          tag: "Pacifique Côtier",
        },
        {
          region: "Provinces atlantiques et maritimes",
          places: "Nouvelle-Écosse, Terre-Neuve et Î.-P.-É.",
          desc: "Phares pittoresques, fjords spectaculaires, traditions musicales celtiques, homard frais et hospitalité maritime réputée.",
          tag: "Côtes Océaniques",
        },
        {
          region: "Le Grand Nord et les aurores",
          places: "Yukon, Yellowknife et Nunavut",
          desc: "Aurores boréales envoûtantes, soleil de minuit, toundra arctique préservée et traditions millénaires des Premières Nations et Inuits.",
          tag: "Merveilles Boréales",
        },
      ],
      tips: [
        { title: "Vols directs", desc: "Liaisons sans escale quotidiennes reliant Paris, Francfort, Dublin, Rome ou Amsterdam à Montréal, Toronto et Vancouver." },
        { title: "Monnaie et paiements", desc: "Dollar canadien ($ CAD). Le paiement sans contact et les cartes européennes sont universellement acceptés." },
        { title: "Saisons idéales", desc: "Été (juin à sept.) pour les lacs et randonnées ; Automne (sept. à oct.) pour les couleurs flamboyantes ; Hiver pour les aurores et la neige." },
      ],
    },
    invest: {
      title: "Investir au Canada",
      badge: "Opportunités économiques et commerciales",
      tagline: "Votre tremplin en Amérique du Nord avec une fiscalité compétitive, l'accès au marché de l'UE via l'AECG et des talents de premier rang.",
      overview: "Le Canada offre aux entreprises européennes l'un des environnements d'affaires les plus stables, prévisibles et dynamiques au monde. Grâce à l'AECG (CETA), les investisseurs de l'UE bénéficient d'une sécurité juridique renforcée et de l'élimination des barrières tarifaires.",
      cetaBenefits: [
        {
          title: "Élimination de 98 % des droits de douane",
          desc: "Accès immédiat en franchise de droits pour la quasi-totalité des produits industriels et agricoles échangés entre le Canada et l'UE.",
        },
        {
          title: "Accès aux marchés publics",
          desc: "Les entreprises européennes peuvent soumissionner aux appels d'offres publics fédéraux, provinciaux et municipaux au Canada.",
        },
        {
          title: "Libéralisation du secteur des services",
          desc: "Large ouverture pour les professionnels européens de l'ingénierie, de l'architecture, des technologies numériques et des services environnementaux.",
        },
        {
          title: "Mobilité facilitée des professionnels",
          desc: "Dispositions simplifiées pour les mutations intra-entreprise, les cadres supérieurs et les prestataires de services contractuels.",
        },
      ],
      sectors: [
        {
          title: "Technologies propres et hydrogène vert",
          desc: "Leader en électricité décarbonée avec des corridors d'exportation d'hydrogène vert en Atlantique et de puissants crédits d'impôt à l'investissement propre.",
          stats: "Jusqu'à 30 % de crédit d'impôt d'investissement propre",
        },
        {
          title: "Intelligence artificielle et quantique",
          desc: "Pôles mondiaux à Montréal (Mila), Toronto (Vector) et Edmonton (Amii), complétés par des instituts quantiques de pointe à Waterloo et Sherbrooke.",
          stats: "1er rang du G7 pour la croissance en chercheurs IA",
        },
        {
          title: "Minéraux critiques et filière batterie",
          desc: "Seul pays occidental disposant de l'ensemble des minéraux nécessaires aux batteries de VE (Lithium, Nickel, Cobalt, Graphite) avec logistique directe vers l'Europe.",
          stats: "Top 5 mondial du potentiel minéral",
        },
        {
          title: "Sciences de la vie et biomanufacture",
          desc: "Capacités accrues de production vaccinale et pharmaceutique, réseaux d'hôpitaux universitaires de classe mondiale et homologations accélérées.",
          stats: "2,2 Mds $ de stratégie fédérale en biomanufacture",
        },
      ],
      advantages: [
        { title: "Dette nette/PIB la plus faible du G7", desc: "Rigueur budgétaire garantissant la stabilité macroéconomique et de solides notations souveraines." },
        { title: "Stratégie pour les compétences mondiales", desc: "Délai de traitement accéléré de deux semaines pour les ingénieurs et spécialistes hautement qualifiés." },
        { title: "Crédits d'impôt pour la R&D (RS&DE)", desc: "Incitations fiscales généreuses et remboursements directs pour la recherche scientifique et le développement expérimental." },
      ],
    },
    partnership: {
      title: "Partenariat Canada-UE",
      badge: "Diplomatie, Sécurité et Valeurs communes",
      tagline: "Une alliance stratégique fondée sur des principes démocratiques partagés, l'ordre international fondé sur des règles et l'action pour le climat.",
      overview: "La relation entre le Canada et l'Union européenne repose sur une confiance mutuelle, des liens historiques profonds et un attachement sans faille à la paix, aux droits de l'homme et au développement durable. Structurée par l'Accord de partenariat stratégique (APS) et l'AECG, cette alliance façonne l'avenir transatlantique.",
      pillars: [
        {
          title: "Accord de partenariat stratégique (APS)",
          desc: "Le traité politique global régissant la coopération en matière de politique étrangère, de gestion des crises, de lutte contre la désinformation et de résilience démocratique.",
        },
        {
          title: "Alliance verte transatlantique",
          desc: "Concertation sur la tarification du carbone, la réduction du méthane, la protection des océans et le commerce des technologies d'énergie renouvelable.",
        },
        {
          title: "Association à Horizon Europe",
          desc: "L'association formelle du Canada au Pilier II d'Horizon Europe permet aux chercheurs des deux rives de collaborer sur le cancer, le climat et les technologies quantiques.",
        },
        {
          title: "Sécurité des chaînes d'approvisionnement",
          desc: "Partenariat stratégique garantissant des approvisionnements traçables, responsables et conformes aux critères ESG en matières premières critiques pour les transitions verte et numérique.",
        },
      ],
      milestones: [
        { year: "1976", title: "Accord-cadre fondateur", desc: "Premier accord bilatéral officiel de coopération économique signé entre le Canada et les Communautés européennes." },
        { year: "2016", title: "Signature de l'AECG et de l'APS", desc: "Signature historique de l'Accord économique et commercial global et de l'Accord de partenariat stratégique." },
        { year: "2017", title: "Application provisoire de l'AECG", desc: "Suppression des droits de douane sur 98 % des échanges, dynamisant les flux commerciaux transatlantiques." },
        { year: "2021", title: "Partenariat sur les matières premières", desc: "Accord bilatéral visant l'intégration durable des chaînes de valeur de minéraux critiques entre le Canada et l'UE." },
        { year: "2024–2026", title: "Association à Horizon Europe", desc: "Intégration officielle du Canada au programme de recherche européen Horizon Europe Pilier II." },
      ],
    },
    chat: {
      title: "Assistant du Pont",
      subtitle: "Assistant IA propulsé par Gemini",
      badge: "Périmètre : Visite, Investissement & Partenariat",
      greeting: "Bonjour ! Je suis l'assistant officiel du Pont Canada-UE. Je réponds à vos questions sur les séjours au Canada (AVE, destinations, logistique), l'investissement (AECG, secteurs porteurs, fiscalité) et le partenariat Canada-UE. En quoi puis-je vous renseigner ?",
      inputPlaceholder: "Posez votre question sur les voyages, l'investissement ou le partenariat...",
      send: "Envoyer",
      clear: "Effacer",
      open: "Assistant du Pont",
      minimize: "Réduire",
      expand: "Agrandir",
      close: "Fermer",
      thinking: "L'assistant analyse votre demande...",
      disclaimer: "Réponses strictement limitées aux trois thématiques du site, sécurisées par le serveur proxy.",
      scopeWarning: "Mon domaine est strictement réservé à la visite au Canada, à l'investissement et au partenariat Canada-UE. N'hésitez pas à m'interroger sur l'AVE, les opportunités sous l'AECG ou nos accords bilatéraux !",
      quickSuggestionsTitle: "Questions suggérées :",
    },
    disclaimer: {
      text: "Ce projet d'information est indépendant et non officiel, et n'est ni affilié à, ni approuvé par, ni représentatif du gouvernement du Canada, de l'Union européenne ou de toute agence gouvernementale. Les informations présentées ici peuvent être obsolètes ou incomplètes. Pour des informations précises, à jour et officielles, veuillez consulter Canada.ca, le site officiel de la Commission européenne, ou votre ambassade/consulat concerné.",
      dismiss: "Fermer l'avis",
    },
    footer: {
      brandDesc: "Portail d'information dédié au renforcement des liens transatlantiques, du tourisme, des synergies économiques et des partenariats démocratiques entre le Canada et l'Union européenne.",
      sections: "Thématiques",
      links: "Ressources officielles",
      linksList: [
        { label: "Gouvernement du Canada (canada.ca)", url: "https://www.canada.ca/fr.html" },
        { label: "Commission européenne (europa.eu)", url: "https://commission.europa.eu/index_fr" },
        { label: "Investir au Canada", url: "https://www.investcanada.ca/fr" },
        { label: "Destination Canada", url: "https://www.destinationcanada.com/fr" },
        { label: "Délégation de l'UE au Canada", url: "https://www.eeas.europa.eu/delegations/canada_fr" },
      ],
      legal: "Plateforme bilingue pour la coopération transatlantique canado-européenne. Données alignées sur les traités bilatéraux officiels.",
    },
  },
};

export const QUICK_PROMPTS: QuickPrompt[] = [
  {
    category: "visit",
    labelEn: "eTA requirements for EU citizens",
    labelFr: "Conditions d'AVE pour citoyens UE",
    promptEn: "What are the exact eTA travel authorization requirements and application steps for European Union citizens traveling to Canada?",
    promptFr: "Quelles sont les conditions et étapes exactes d'obtention de l'AVE pour un citoyen de l'Union européenne voyageant au Canada ?",
  },
  {
    category: "invest",
    labelEn: "How CETA eliminates tariffs",
    labelFr: "Avantages douaniers de l'AECG (CETA)",
    promptEn: "How does the CETA agreement eliminate tariffs and facilitate market access for European companies investing in Canada?",
    promptFr: "Comment l'AECG (CETA) élimine-t-il les droits de douane et favorise-t-il les entreprises européennes qui investissent au Canada ?",
  },
  {
    category: "partnership",
    labelEn: "Horizon Europe & science ties",
    labelFr: "Horizon Europe et recherche conjointe",
    promptEn: "What does Canada's association with Horizon Europe Pillar II mean for transatlantic scientific research collaboration?",
    promptFr: "Que permet l'association officielle du Canada au Pilier II d'Horizon Europe pour la recherche scientifique conjointe ?",
  },
  {
    category: "visit",
    labelEn: "Best season for Canadian Rockies",
    labelFr: "Meilleure saison pour les Rocheuses",
    promptEn: "Which seasons are best for European travelers visiting the Canadian Rockies and what are the flight options?",
    promptFr: "Quelle est la meilleure saison pour les voyageurs européens visitant les Rocheuses canadiennes et quelles sont les liaisons aériennes directes ?",
  },
  {
    category: "invest",
    labelEn: "Clean tech & green hydrogen",
    labelFr: "Technologies propres et hydrogène vert",
    promptEn: "What opportunities exist in Canada for European investors in green hydrogen, critical minerals, and clean technologies?",
    promptFr: "Quelles sont les opportunités d'investissement au Canada pour les entreprises européennes dans l'hydrogène vert et les minéraux critiques ?",
  },
];
