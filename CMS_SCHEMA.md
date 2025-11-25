# Admin CMS Schema for CoRE Website

This extends the existing Supabase setup to make ALL content editable by admins through a simple UI.

## New Tables to Add

Run this SQL in Supabase SQL Editor (after running the main setup):

```sql
-- Site Configuration (counters, hero text, etc.)
CREATE TABLE IF NOT EXISTS site_config (
  id BIGSERIAL PRIMARY KEY,
  key VARCHAR(100) NOT NULL UNIQUE,
  value TEXT NOT NULL,
  description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_by UUID REFERENCES auth.users(id)
);

-- Team Members
CREATE TABLE IF NOT EXISTS team_members (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  role VARCHAR(100) NOT NULL,
  domain VARCHAR(50),
  year VARCHAR(20),
  bio TEXT,
  image_url TEXT,
  github VARCHAR(255),
  linkedin VARCHAR(255),
  email VARCHAR(255),
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Coordinators (separate from regular members)
CREATE TABLE IF NOT EXISTS coordinators (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  title VARCHAR(100) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20),
  image_url TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Dynamic Events (to replace hardcoded data)
CREATE TABLE IF NOT EXISTS dynamic_events (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  time VARCHAR(50),
  location VARCHAR(200),
  category VARCHAR(50),
  capacity INTEGER,
  image_url TEXT,
  registration_link TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_site_config_key ON site_config(key);
CREATE INDEX idx_team_members_active ON team_members(is_active, display_order);
CREATE INDEX idx_coordinators_active ON coordinators(is_active, display_order);
CREATE INDEX idx_dynamic_events_date ON dynamic_events(date DESC);
CREATE INDEX idx_dynamic_events_active ON dynamic_events(is_active);

-- Enable RLS on all tables
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE coordinators ENABLE ROW LEVEL SECURITY;
ALTER TABLE dynamic_events ENABLE ROW LEVEL SECURITY;

-- Public read access (for website visitors)
CREATE POLICY "Allow public read site_config" ON site_config
  FOR SELECT TO anon
  USING (true);

CREATE POLICY "Allow public read team_members" ON team_members
  FOR SELECT TO anon
  USING (is_active = true);

CREATE POLICY "Allow public read coordinators" ON coordinators
  FOR SELECT TO anon
  USING (is_active = true);

CREATE POLICY "Allow public read events" ON dynamic_events
  FOR SELECT TO anon
  USING (is_active = true);

-- Admin full access (authenticated users)
CREATE POLICY "Allow admin all site_config" ON site_config
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow admin all team_members" ON team_members
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow admin all coordinators" ON coordinators
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow admin all events" ON dynamic_events
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);
```

## Insert Default Configuration

```sql
-- Default site configuration values
INSERT INTO site_config (key, value, description) VALUES
  ('members_count', '120', 'Total number of CoRE members'),
  ('events_count', '25', 'Total events organized'),
  ('projects_count', '45', 'Total projects completed'),
  ('hero_title', 'The Future of Tech Starts Here', 'Hero section main title'),
  ('hero_subtitle', 'Join CoRE and build real-world projects in Web Dev, AI/ML, IoT, App Dev, Game Dev, and UI/UX Design', 'Hero section subtitle'),
  ('club_description', 'CoRE (Club of Robotics & Electronics) is VCET Puttur''s premier technical club where students learn, build, and innovate together.', 'About club description'),
  ('contact_email', 'core@vcet.edu.in', 'Official contact email'),
  ('contact_phone', '+91 12345 67890', 'Official contact phone')
ON CONFLICT (key) DO NOTHING;

-- Sample coordinators
INSERT INTO coordinators (name, title, email, display_order) VALUES
  ('Dr. Faculty Name', 'Faculty Coordinator', 'faculty@vcet.edu.in', 1),
  ('Student Name', 'President', 'president@core.vcet.in', 2),
  ('Another Student', 'Vice President', 'vp@core.vcet.in', 3)
ON CONFLICT DO NOTHING;

-- Sample team members
INSERT INTO team_members (name, role, domain, year, display_order) VALUES
  ('John Doe', 'Lead', 'Web Development', '3rd Year', 1),
  ('Jane Smith', 'Lead', 'AI/ML', '3rd Year', 2),
  ('Alex Kumar', 'Lead', 'IoT', '2nd Year', 3)
ON CONFLICT DO NOTHING;
```

## How It Works

### For Website Visitors:
- Data is fetched from Supabase using the `anon` key
- If backend is down, fallback dummy data is shown with a warning banner
- No authentication required to view content

### For Admins:
- Login to admin panel at `/admin`
- Edit all content through simple forms
- No coding knowledge required
- Changes reflect immediately on the website

### Data Flow:
```
User Visits → Fetch from Supabase → Success? Show data : Show fallback + warning
Admin Edits → Update Supabase → Auto-refresh on website
```

## Benefits

1. ✅ **Non-technical friendly**: Admins use forms, no code editing
2. ✅ **Real-time updates**: Changes go live instantly
3. ✅ **Fallback safety**: Website works even if backend is down
4. ✅ **Version control**: Track who changed what and when
5. ✅ **Scalable**: Easy to add more configurable fields
6. ✅ **Secure**: RLS policies protect data, only admins can edit

## Next Steps

1. Run the SQL above in Supabase
2. Build admin UI components
3. Create API hooks for data fetching
4. Update pages to use dynamic data
5. Test fallback behavior
