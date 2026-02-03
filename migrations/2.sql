
CREATE TABLE portfolio_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  description TEXT,
  problem TEXT,
  solution TEXT,
  tools TEXT,
  image TEXT,
  demo_url TEXT,
  github_url TEXT,
  is_featured BOOLEAN DEFAULT 0,
  display_order INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_portfolio_items_slug ON portfolio_items(slug);
CREATE INDEX idx_portfolio_items_is_featured ON portfolio_items(is_featured);
CREATE INDEX idx_portfolio_items_display_order ON portfolio_items(display_order);
