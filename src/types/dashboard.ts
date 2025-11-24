export interface Headline {
  id: string;
  title: string;
  summary: string;
  details: string;
  created_at: string;
}

export interface InsightCard {
  id: string;
  title: string;
  description: string;
  category: string;
  created_at: string;
}

export interface CardDetail {
  id: string;
  card_id: string;
  insights: string;
  insight_points: string[];
  recommendations: string[];
  chart_data: ChartData;
  created_at: string;
}

export interface ChartData {
  type: string;
  [key: string]: unknown;
}

export interface KPIMetric {
  id: string;
  title: string;
  value: string;
  trend: 'up' | 'down' | 'neutral';
  created_at: string;
}
