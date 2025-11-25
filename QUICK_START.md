# 🚀 Quick Start - Get Your CMS Running NOW

## Step 1: Set Up Database (5 minutes)

### 1.1 Login to Supabase
Go to: https://supabase.com/dashboard

### 1.2 Open SQL Editor
- Click your project: `core-backend`
- Click "SQL Editor" in left sidebar

### 1.3 Run This SQL
Copy and paste this ENTIRE block, then click "RUN":

```sql
-- Site Configuration
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

-- Coordinators
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

-- Dynamic Events
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

-- Indexes
CREATE INDEX IF NOT EXISTS idx_site_config_key ON site_config(key);
CREATE INDEX IF NOT EXISTS idx_team_members_active ON team_members(is_active, display_order);
CREATE INDEX IF NOT EXISTS idx_coordinators_active ON coordinators(is_active, display_order);
CREATE INDEX IF NOT EXISTS idx_dynamic_events_date ON dynamic_events(date DESC);
CREATE INDEX IF NOT EXISTS idx_dynamic_events_active ON dynamic_events(is_active);

-- Enable RLS
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE coordinators ENABLE ROW LEVEL SECURITY;
ALTER TABLE dynamic_events ENABLE ROW LEVEL SECURITY;

-- Public read access
DROP POLICY IF EXISTS "Allow public read site_config" ON site_config;
CREATE POLICY "Allow public read site_config" ON site_config
  FOR SELECT TO anon USING (true);

DROP POLICY IF EXISTS "Allow public read team_members" ON team_members;
CREATE POLICY "Allow public read team_members" ON team_members
  FOR SELECT TO anon USING (is_active = true);

DROP POLICY IF EXISTS "Allow public read coordinators" ON coordinators;
CREATE POLICY "Allow public read coordinators" ON coordinators
  FOR SELECT TO anon USING (is_active = true);

DROP POLICY IF EXISTS "Allow public read events" ON dynamic_events;
CREATE POLICY "Allow public read events" ON dynamic_events
  FOR SELECT TO anon USING (is_active = true);

-- Admin full access
DROP POLICY IF EXISTS "Allow admin all site_config" ON site_config;
CREATE POLICY "Allow admin all site_config" ON site_config
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow admin all team_members" ON team_members;
CREATE POLICY "Allow admin all team_members" ON team_members
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow admin all coordinators" ON coordinators;
CREATE POLICY "Allow admin all coordinators" ON coordinators
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow admin all events" ON dynamic_events;
CREATE POLICY "Allow admin all events" ON dynamic_events
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Insert default data
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

INSERT INTO coordinators (name, title, email, display_order) VALUES
  ('Dr. Faculty Name', 'Faculty Coordinator', 'faculty@vcet.edu.in', 1),
  ('Student Name', 'President', 'president@core.vcet.in', 2),
  ('Another Student', 'Vice President', 'vp@core.vcet.in', 3)
ON CONFLICT DO NOTHING;

INSERT INTO team_members (name, role, domain, year, display_order) VALUES
  ('John Doe', 'Lead', 'Web Development', '3rd Year', 1),
  ('Jane Smith', 'Lead', 'AI/ML', '3rd Year', 2),
  ('Alex Kumar', 'Lead', 'IoT', '2nd Year', 3)
ON CONFLICT DO NOTHING;
```

✅ Click "RUN" - Should see "Success" message

---

## Step 2: Create Admin User (2 minutes)

### 2.1 Go to Authentication
In Supabase, click "Authentication" in left sidebar

### 2.2 Add User
1. Click "Add user" button (top right)
2. Click "Create new user"
3. Fill in:
   - **Email**: `your-email@example.com` (use your real email)
   - **Password**: Create strong password (SAVE IT!)
   - **Auto Confirm User**: ✅ Check this box
4. Click "Create user"

✅ You now have admin access!

---

## Step 3: Update Environment Variables (3 minutes)

### 3.1 Create .env file locally
In your project folder, create `.env` file:

```env
# Frontend (MUST have VITE_ prefix)
VITE_SUPABASE_URL=YOUR_SUPABASE_URL_HERE
VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY_HERE
VITE_API_BASE_URL=http://localhost:8888/.netlify/functions

# Backend (for Netlify Functions)
SUPABASE_URL=YOUR_SUPABASE_URL_HERE
SUPABASE_ANON_KEY=YOUR_ANON_KEY_HERE
```

### 3.2 Get Your Supabase Keys
1. In Supabase, click gear icon (Settings) → Project Settings
2. Click "API" in left menu
3. Copy:
   - **Project URL** → paste as `VITE_SUPABASE_URL` and `SUPABASE_URL`
   - **anon public** key → paste as `VITE_SUPABASE_ANON_KEY` and `SUPABASE_ANON_KEY`

✅ Save the .env file

---

## Step 4: Test Locally (5 minutes)

### 4.1 Install and Run
```bash
# Make sure you're in the CoRE folder
cd C:\Users\jnane\OneDrive\Desktop\CoRE

# Already installed, just run
npm run dev
```

### 4.2 Test Admin Panel
1. Open: http://localhost:5173/admin
2. Login with the email/password you created
3. Click "Counters" tab
4. Change "Members Count" to 150
5. Click "Save"
6. Open homepage: http://localhost:5173
7. See if counter animates to 150

✅ If it works, CMS is working!

---

## Step 5: Deploy to Netlify (15 minutes)

### 5.1 Push to GitHub (if not already)
```bash
git add .
git commit -m "Added CMS system"
git push origin main
```

### 5.2 Sign Up for Netlify
1. Go to: https://www.netlify.com/
2. Click "Sign up"
3. Choose "Sign up with GitHub"
4. Authorize Netlify

### 5.3 Deploy Site
1. Click "Add new site" → "Import an existing project"
2. Choose "Deploy with GitHub"
3. Find your repository: `core-website`
4. **BEFORE DEPLOYING**, scroll down to "Environment variables"
5. Click "Add environment variables"
6. Add these 5 variables:

| Variable | Value |
|----------|-------|
| `VITE_SUPABASE_URL` | Your Supabase URL |
| `VITE_SUPABASE_ANON_KEY` | Your anon key |
| `SUPABASE_URL` | Your Supabase URL |
| `SUPABASE_ANON_KEY` | Your anon key |
| `VITE_API_BASE_URL` | `/.netlify/functions` |

7. Click "Deploy"

### 5.4 Wait for Build
- Takes 2-3 minutes
- Watch the build log
- Should see "Site is live!" when done

✅ Your site is now LIVE!

---

## Step 6: Test Live Site (3 minutes)

### 6.1 Get Your URL
Netlify will give you a URL like: `https://random-name-123.netlify.app`

### 6.2 Test Everything
1. Visit your site
2. Go to `/admin` (add /admin to your URL)
3. Login with your credentials
4. Edit counters, save
5. Go back to homepage
6. Verify changes appear

✅ **SUCCESS! You now have a live CMS!**

---

## 🎉 You're Done!

**What you now have:**
- ✅ Live website on Netlify (free hosting)
- ✅ Admin panel to edit content
- ✅ No coding required to update site
- ✅ Auto-deploys when you push to GitHub

**Share admin access:**
Give other coordinators the admin URL and create accounts for them in Supabase Auth.

**Admin URL:** `https://your-site.netlify.app/admin`

---

## 🆘 Troubleshooting

**Problem: Can't login to admin**
- Check email/password are correct
- Verify user is "Confirmed" in Supabase Auth
- Try password reset in Supabase

**Problem: Changes don't save**
- Check browser console for errors (F12)
- Verify environment variables are set in Netlify
- Check Supabase RLS policies allow updates

**Problem: Build fails on Netlify**
- Check build logs in Netlify dashboard
- Verify all environment variables are set
- Try building locally: `npm run build`

**Problem: Functions returning errors**
- Check Netlify function logs
- Verify SUPABASE_URL and SUPABASE_ANON_KEY are set (without VITE_ prefix for backend)

---

## 📞 Next Steps

1. **Customize Content**
   - Login to admin
   - Update all counters, text, coordinators
   - Make it yours!

2. **Add More Admins**
   - Supabase → Authentication → Add User
   - Share credentials securely

3. **Custom Domain** (Optional)
   - Netlify → Domain settings
   - Add your domain
   - Update DNS records

4. **Monitor Usage**
   - Netlify dashboard for deployments
   - Supabase dashboard for data

---

**Need help?** Read the full guides:
- `NETLIFY_DEPLOYMENT_GUIDE.md` - Detailed deployment steps
- `CMS_COMPLETE_SUMMARY.md` - How everything works
- `CMS_SCHEMA.md` - Database structure

**🚀 Enjoy your new CMS-powered website!**
