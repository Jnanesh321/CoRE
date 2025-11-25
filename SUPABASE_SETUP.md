# Supabase Setup Guide for CoRE Backend

## 🚀 Quick Setup (5 minutes)

### Step 1: Create Supabase Account
1. Go to https://supabase.com
2. Click "Start your project"
3. Sign up with GitHub (easiest)

### Step 2: Create New Project
1. Click "New Project"
2. **Organization**: Create "CoRE VCET" or use personal
3. **Name**: `core-backend`
4. **Database Password**: Generate strong password (SAVE THIS!)
5. **Region**: Choose closest to India (Southeast Asia - Singapore)
6. Click "Create new project" (takes ~2 minutes)

### Step 3: Create Database Tables

Go to SQL Editor in Supabase and run this:

```sql
-- Applications table
CREATE TABLE applications (
  id BIGSERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20) NOT NULL,
  college VARCHAR(100) NOT NULL DEFAULT 'VCET Puttur',
  year VARCHAR(10) NOT NULL,
  branch VARCHAR(50) NOT NULL,
  usn VARCHAR(20),
  interests TEXT NOT NULL,
  skills TEXT NOT NULL,
  experience TEXT,
  github VARCHAR(255),
  portfolio VARCHAR(255),
  preferred_team VARCHAR(100) NOT NULL,
  motivation TEXT NOT NULL,
  availability VARCHAR(20),
  status VARCHAR(20) DEFAULT 'pending',
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by UUID REFERENCES auth.users(id),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Newsletter subscriptions
CREATE TABLE newsletter_subscriptions (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE,
  unsubscribed_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for performance
CREATE INDEX idx_applications_email ON applications(email);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_applications_submitted ON applications(submitted_at DESC);
CREATE INDEX idx_newsletter_email ON newsletter_subscriptions(email);
CREATE INDEX idx_newsletter_active ON newsletter_subscriptions(is_active);

-- Enable Row Level Security (RLS)
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (for form submissions)
CREATE POLICY "Allow public insert applications" ON applications
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public insert newsletter" ON newsletter_subscriptions
  FOR INSERT TO anon
  WITH CHECK (true);

-- Allow authenticated users to view all (for admin dashboard)
CREATE POLICY "Allow authenticated users to view applications" ON applications
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to view newsletter" ON newsletter_subscriptions
  FOR SELECT TO authenticated
  USING (true);

-- Allow authenticated users to update applications
CREATE POLICY "Allow authenticated users to update applications" ON applications
  FOR UPDATE TO authenticated
  USING (true)
  WITH CHECK (true);
```

> IMPORTANT: When you copy the SQL into the Supabase SQL Editor, DO NOT include the ```sql and ``` fence lines. If you paste those backticks you will get: `syntax error at or near "```"`.

#### Raw SQL (Copy From Here Down To END RAW SQL)

START RAW SQL
-- Applications table
CREATE TABLE IF NOT EXISTS applications (
  id BIGSERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20) NOT NULL,
  college VARCHAR(100) NOT NULL DEFAULT 'VCET Puttur',
  year VARCHAR(10) NOT NULL,
  branch VARCHAR(50) NOT NULL,
  usn VARCHAR(20),
  interests TEXT NOT NULL,
  skills TEXT NOT NULL,
  experience TEXT,
  github VARCHAR(255),
  portfolio VARCHAR(255),
  preferred_team VARCHAR(100) NOT NULL,
  motivation TEXT NOT NULL,
  availability VARCHAR(20),
  status VARCHAR(20) DEFAULT 'pending',
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by UUID REFERENCES auth.users(id),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Newsletter subscriptions
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE,
  unsubscribed_at TIMESTAMP WITH TIME ZONE
);

-- Indexes (will error if already exist; safe to skip repeats)
DO $$ BEGIN
  CREATE INDEX idx_applications_email ON applications(email);
EXCEPTION WHEN duplicate_table THEN NULL; END $$;
DO $$ BEGIN
  CREATE INDEX idx_applications_status ON applications(status);
EXCEPTION WHEN duplicate_table THEN NULL; END $$;
DO $$ BEGIN
  CREATE INDEX idx_applications_submitted ON applications(submitted_at DESC);
EXCEPTION WHEN duplicate_table THEN NULL; END $$;
DO $$ BEGIN
  CREATE INDEX idx_newsletter_email ON newsletter_subscriptions(email);
EXCEPTION WHEN duplicate_table THEN NULL; END $$;
DO $$ BEGIN
  CREATE INDEX idx_newsletter_active ON newsletter_subscriptions(is_active);
EXCEPTION WHEN duplicate_table THEN NULL; END $$;

-- Enable Row Level Security (idempotent)
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Policies (drop if already exist then recreate to avoid duplicate name errors)
DO $$ BEGIN
  DROP POLICY IF EXISTS "Allow public insert applications" ON applications;
  CREATE POLICY "Allow public insert applications" ON applications
    FOR INSERT TO anon
    WITH CHECK (true);
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Allow public insert newsletter" ON newsletter_subscriptions;
  CREATE POLICY "Allow public insert newsletter" ON newsletter_subscriptions
    FOR INSERT TO anon
    WITH CHECK (true);
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Allow authenticated users to view applications" ON applications;
  CREATE POLICY "Allow authenticated users to view applications" ON applications
    FOR SELECT TO authenticated
    USING (true);
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Allow authenticated users to view newsletter" ON newsletter_subscriptions;
  CREATE POLICY "Allow authenticated users to view newsletter" ON newsletter_subscriptions
    FOR SELECT TO authenticated
    USING (true);
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Allow authenticated users to update applications" ON applications;
  CREATE POLICY "Allow authenticated users to update applications" ON applications
    FOR UPDATE TO authenticated
    USING (true)
    WITH CHECK (true);
END $$;
END RAW SQL

#### How To Use The Raw SQL
1. Open Supabase SQL Editor.
2. Paste ONLY the lines between `START RAW SQL` and `END RAW SQL`.
3. Run once. If tables already exist you'll see duplicate errors for indexes; those can be ignored.
4. Re-run later safely; idempotent blocks handle duplicates.

#### If You Already Ran The Original Script
- Just run from `ALTER TABLE ... ENABLE ROW LEVEL SECURITY;` down if tables exist but policies were missing.
- To verify: `SELECT * FROM pg_policies WHERE tablename IN ('applications','newsletter_subscriptions');`


### Step 4: Get API Keys

1. Go to **Project Settings** (gear icon)
2. Click **API** in sidebar
3. Copy these values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### Step 5: Configure Environment Variables

#### For Netlify:
1. Go to your Netlify dashboard
2. **Site settings** → **Environment variables**
3. Add:
   - `SUPABASE_URL` = (your project URL)
   - `SUPABASE_ANON_KEY` = (your anon key)

#### For Local Development:
Create `.env` file in project root:
```env
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_API_BASE_URL=http://localhost:8888/.netlify/functions
```

### Step 6: Install Dependencies

```bash
# In your CoRE project root
cd netlify/functions
npm install

# Or if you prefer installing in root
npm install @supabase/supabase-js --save
```

### Step 7: Update Frontend API Endpoints

Update `src/pages/Contact.jsx`:

```javascript
// Replace line 6 with:
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/.netlify/functions'

// Update handleSubmit (around line 75):
const res = await fetch(`${API_BASE_URL}/submit-application`, {
  method: 'POST',
  body: JSON.stringify({
    firstName: data.get('firstName'),
    lastName: data.get('lastName'),
    email: data.get('email'),
    phone: data.get('phone'),
    college: data.get('college'),
    year: data.get('year'),
    branch: data.get('branch'),
    usn: data.get('usn'),
    interests: data.get('interests'),
    skills: data.get('skills'),
    experience: data.get('experience'),
    github: data.get('github'),
    portfolio: data.get('portfolio'),
    preferredTeam: data.get('preferredTeam'),
    motivation: data.get('motivation'),
    availability: data.get('availability')
  }),
  headers: { 
    'Content-Type': 'application/json',
    'Accept': 'application/json' 
  }
})
const json = await res.json()
```

Update `src/components/Newsletter.jsx`:

```javascript
// Add at top (around line 5):
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/.netlify/functions'

// Update handleSubmit (around line 28):
const res = await fetch(`${API_BASE_URL}/newsletter-subscribe`, {
  method: 'POST',
  body: JSON.stringify({ email }),
  headers: { 
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})
```

### Step 8: Test Locally

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Link to your site (or init new site)
netlify init

# Run dev server (includes functions)
netlify dev
```

Your site will run at `http://localhost:8888`

Test the forms:
- Application form: http://localhost:8888/contact
- Newsletter: http://localhost:8888 (bottom of page)

### Step 9: Deploy to Netlify

```bash
# Deploy to production
netlify deploy --prod

# Or connect to GitHub for auto-deployment:
# 1. Push code to GitHub
# 2. Connect repo in Netlify dashboard
# 3. Set build command: npm run build
# 4. Set publish directory: dist
# 5. Add environment variables in Netlify
```

---

## 📊 View Submitted Data

### In Supabase Dashboard:
1. Go to **Table Editor**
2. Select `applications` or `newsletter_subscriptions`
3. View all submissions in real-time

### Query Examples:

```sql
-- View all applications
SELECT * FROM applications ORDER BY submitted_at DESC;

-- View pending applications
SELECT first_name, last_name, email, preferred_team, submitted_at 
FROM applications 
WHERE status = 'pending'
ORDER BY submitted_at DESC;

-- Count applications by status
SELECT status, COUNT(*) 
FROM applications 
GROUP BY status;

-- View newsletter subscribers
SELECT email, subscribed_at 
FROM newsletter_subscriptions 
WHERE is_active = true
ORDER BY subscribed_at DESC;

-- Export to CSV (in Supabase SQL Editor)
SELECT * FROM applications;
-- Then click "Download as CSV"
```

---

## 🔒 Security Features

✅ **Row Level Security (RLS)**: Only allows authenticated users to view/edit data
✅ **Input Validation**: Server-side validation for all fields
✅ **Email Uniqueness**: Prevents duplicate submissions
✅ **SQL Injection Protection**: Supabase uses parameterized queries
✅ **CORS Protection**: Configured for your domain only

---

## 🎯 Next Steps (Optional)

### 1. Add Email Notifications

Install SendGrid:
```bash
npm install @sendgrid/mail
```

Update functions to send emails on submission.

### 2. Create Admin Dashboard

Use Supabase Auth to create admin login:
```bash
netlify functions:create auth-login
```

### 3. Set Up Monitoring

- Enable Supabase monitoring in dashboard
- Set up alerts for errors
- Monitor function logs in Netlify

---

## 📞 Troubleshooting

### "Network error" when submitting form:
- Check if Supabase URL and key are correct
- Verify CORS is enabled (should work by default)
- Check browser console for specific error

### "Policy violation" error:
- RLS policies might be too restrictive
- Run the SQL policies again
- Check if `anon` key is being used

### Functions not working locally:
```bash
# Make sure you're using netlify dev, not vite
netlify dev

# Check function logs
netlify functions:log
```

### Can't see data in Supabase:
- Check if RLS policies allow viewing
- Use SQL Editor to query directly
- Check if data was actually inserted (look for errors)

---

## 💰 Pricing (All FREE for your use case)

**Supabase Free Tier:**
- 500MB database (plenty for 1000s of applications)
- 2GB file storage
- 50,000 monthly active users
- Unlimited API requests

**Netlify Free Tier:**
- 100GB bandwidth/month
- 300 build minutes/month
- 125k function invocations/month
- Automatic HTTPS

**Total Cost: $0/month** ✅

---

## ✅ Deployment Checklist

- [ ] Supabase project created
- [ ] Database tables created with SQL
- [ ] RLS policies enabled
- [ ] API keys copied
- [ ] Environment variables set in Netlify
- [ ] Frontend updated with API endpoints
- [ ] Tested locally with `netlify dev`
- [ ] Deployed to production
- [ ] Test form submission on live site
- [ ] Test newsletter signup
- [ ] Verify data appears in Supabase

---

**🎉 You're Done! Your backend is live and serverless!**

No server to maintain, no memory limits, scales automatically, and completely FREE! 🚀
