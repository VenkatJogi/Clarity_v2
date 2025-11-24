/*
  # Dashboard Application Schema

  1. New Tables
    - `headlines`
      - `id` (uuid, primary key)
      - `title` (text)
      - `summary` (text)
      - `details` (text)
      - `created_at` (timestamp)
    
    - `insight_cards`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `category` (text)
      - `created_at` (timestamp)
    
    - `card_details`
      - `id` (uuid, primary key)
      - `card_id` (uuid, foreign key)
      - `insights` (text)
      - `insight_points` (jsonb)
      - `recommendations` (jsonb)
      - `chart_data` (jsonb)
      - `created_at` (timestamp)
    
    - `kpi_metrics`
      - `id` (uuid, primary key)
      - `title` (text)
      - `value` (text)
      - `trend` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access (demo purposes)
*/

CREATE TABLE IF NOT EXISTS headlines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  summary text NOT NULL,
  details text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS insight_cards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL DEFAULT 'general',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS card_details (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  card_id uuid NOT NULL REFERENCES insight_cards(id) ON DELETE CASCADE,
  insights text NOT NULL,
  insight_points jsonb DEFAULT '[]'::jsonb,
  recommendations jsonb DEFAULT '[]'::jsonb,
  chart_data jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS kpi_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  value text NOT NULL,
  trend text DEFAULT 'neutral',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE headlines ENABLE ROW LEVEL SECURITY;
ALTER TABLE insight_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE card_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE kpi_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to headlines"
  ON headlines FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public read access to insight_cards"
  ON insight_cards FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public read access to card_details"
  ON card_details FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public read access to kpi_metrics"
  ON kpi_metrics FOR SELECT
  TO anon
  USING (true);