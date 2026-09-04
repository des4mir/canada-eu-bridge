export type Language = "en" | "fr";

export interface NewsItem {
  id: string;
  titleEn: string;
  titleFr: string;
  categoryEn: string;
  categoryFr: string;
  date: string;
  summaryEn: string;
  summaryFr: string;
  highlightsEn: string[];
  highlightsFr: string[];
  source?: string;
  badgeColor?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  isOffTopicWarning?: boolean;
}

export interface QuickPrompt {
  labelEn: string;
  labelFr: string;
  promptEn: string;
  promptFr: string;
  category: "visit" | "invest" | "partnership";
}
