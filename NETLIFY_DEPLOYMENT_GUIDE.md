# Complete Netlify Deployment Guide for CoRE Website

## 📋 Prerequisites
- GitHub account
- Supabase account (already created)
- Your CoRE project code

---

## 🚀 Step-by-Step Netlify Setup

### Part 1: Create Netlify Account (5 minutes)

#### 1. Go to Netlify
Visit: https://www.netlify.com/

#### 2. Sign Up
- Click **"Sign up"** in the top right
- **Recommended**: Choose "Sign up with GitHub" (easiest for deployment)
- Authorize Netlify to access your GitHub account
- ✅ You now have a Netlify account!

---

### Part 2: Push Code to GitHub (If not done already)

#### 1. Create GitHub Repository
```bash
# Open your terminal in the CoRE project folder
cd C:\Users\jnane\OneDrive\Desktop\CoRE

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - CoRE website with CMS"
```

#### 2. Create Repository on GitHub
1. Go to https://github.com/new
2. Repository name: `core-website` (or your choice)
3. Description: "Official website for CoRE - Club of Robotics & Electronics"
4. Keep it **Private** or **Public** (your choice)
5. **Do NOT** initialize with README (we already have code)
6. Click "Create repository"

#### 3. Push to GitHub
```bash
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/core-website.git
git branch -M main
git push -u origin main
```

✅ Your code is now on GitHub!

---

### Part 3: Deploy on Netlify (10 minutes)

#### Step 1: Import from GitHub

1. Log in to Netlify: https://app.netlify.com/
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **"Deploy with GitHub"**
4. Authorize Netlify (if not already done)
5. Search for your repository: `core-website`
6. Click on it to select

#### Step 2: Configure Build Settings

Netlify will auto-detect these settings. Verify:

```
Base directory: (leave empty)
Build command: npm run build
Publish directory: dist
```

**Do NOT click Deploy yet!** We need to add environment variables first.

#### Step 3: Add Environment Variables

Click **"Add environment variables"** or go to **Site settings** → **Environment variables**

Add these variables:

| Variable Name | Value | Where to get it |
|--------------|-------|-----------------|
| `SUPABASE_URL` | `https://xxxxx.supabase.co` | Supabase Project Settings → API |
| `SUPABASE_ANON_KEY` | `eyJhbG...` | Supabase Project Settings → API |
| `VITE_SUPABASE_URL` | `https://xxxxx.supabase.co` | Same as above |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbG...` | Same as above |
| `VITE_API_BASE_URL` | `/.netlify/functions` | Type this exactly |

**Important**: 
- Frontend variables **must** start with `VITE_`
- Backend (Netlify Functions) variables don't need `VITE_` prefix

#### Step 4: Deploy!

1. Click **"Deploy [site-name]"**
2. Wait 2-3 minutes for the build to complete
3. ✅ Your site is live!

---

### Part 4: Get Your URLs

After deployment completes:

1. **Site URL**: `https://random-name-123.netlify.app`
2. **Admin Panel**: `https://random-name-123.netlify.app/admin`

---

### Part 5: Custom Domain (Optional)

#### If you have a custom domain (e.g., core-vcet.in):

1. Go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Enter your domain: `core-vcet.in`
4. Netlify will provide DNS settings:
   ```
   Type: A
   Name: @
   Value: 75.2.60.5
   
   Type: CNAME
   Name: www
   Value: your-site.netlify.app
   ```
5. Add these records in your domain registrar (GoDaddy, Namecheap, etc.)
6. Wait 10-60 minutes for DNS propagation
7. ✅ Your site is now at `https://core-vcet.in`!

#### Free Netlify Subdomain:
Just change the site name:
1. **Site settings** → **Site details** → **Change site name**
2. Enter: `core-vcet` (if available)
3. Now your site is: `https://core-vcet.netlify.app`

---

## 🔐 Setting Up Admin Access

### Step 1: Create Admin User in Supabase

1. Go to your Supabase project
2. Click **"Authentication"** in sidebar
3. Click **"Add user"** → **"Create new user"**
4. Fill in:
   - Email: `admin@core.vcet.in` (or your email)
   - Password: Create a strong password (save it!)
   - Auto-confirm email: **Yes**
5. Click **"Create user"**

### Step 2: Login to Admin Panel

1. Visit: `https://your-site.netlify.app/admin`
2. Enter the email and password you just created
3. ✅ You're in the admin dashboard!

### Step 3: Add More Admins

Repeat Step 1 for each admin:
- President
- Vice President
- Web Dev Lead
- etc.

---

## 📝 How to Edit Website Content

### For Non-Technical Admins (No Coding Required!)

#### Edit Counters (Members, Events, Projects)

1. Go to `https://your-site.netlify.app/admin`
2. Login
3. Click **"Counters"** tab
4. Change the numbers
5. Click **"Save"** for each one
6. ✅ Website updates instantly!

#### Edit Hero Section

1. Login to admin panel
2. Click **"Hero"** tab
3. Edit title and subtitle text
4. Click **"Save"**
5. ✅ Homepage updates!

#### Manage Coordinators

1. Login to admin panel
2. Click **"Coordinators"** tab
3. To add new:
   - Fill in Name, Title, Email
   - Click **"Add"**
4. To edit:
   - Click **"Edit"** on any coordinator
   - Change details
   - Click **"Update"**
5. To remove:
   - Click **"Remove"**
   - Confirm

#### Manage Team Members

1. Click **"Team"** tab
2. Same process as coordinators

---

## 🔄 How to Update Website Code

### For Developers:

```bash
# Make your changes to the code
# Test locally
npm run dev

# Commit changes
git add .
git commit -m "Description of changes"

# Push to GitHub
git push origin main
```

✅ Netlify automatically rebuilds and deploys!

**Auto-deployment happens in ~2-3 minutes every time you push to GitHub.**

---

## 📊 Monitoring & Analytics

### View Build Logs

1. Go to Netlify dashboard
2. Click on your site
3. Click **"Deploys"**
4. Click any deploy to see logs

### View Function Logs

1. **Functions** tab in Netlify
2. Click any function (e.g., `submit-application`)
3. See real-time logs

### Enable Analytics (Optional)

1. **Analytics** tab
2. Enable Netlify Analytics ($9/month) or integrate Google Analytics

---

## 🐛 Troubleshooting Common Issues

### Issue: Build Failed

**Solution:**
1. Check build logs in Netlify
2. Ensure all dependencies are in `package.json`
3. Test build locally: `npm run build`

### Issue: Environment Variables Not Working

**Solution:**
1. Verify variable names (frontend must have `VITE_` prefix)
2. Redeploy site after adding variables
3. Check: **Site settings** → **Environment variables**

### Issue: Functions Returning Errors

**Solution:**
1. Check function logs in Netlify dashboard
2. Verify Supabase URL and key are correct
3. Check Supabase RLS policies allow operations

### Issue: Admin Login Not Working

**Solution:**
1. Verify user exists in Supabase Authentication
2. Check if email is confirmed
3. Try resetting password in Supabase

### Issue: Backend shows as "Offline"

**Solution:**
1. Check if `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set
2. Verify Supabase project is active
3. Check browser console for errors

---

## 📞 Quick Reference

### Important URLs

| Purpose | URL Pattern |
|---------|-------------|
| Live Site | `https://your-site.netlify.app` |
| Admin Panel | `https://your-site.netlify.app/admin` |
| Netlify Dashboard | `https://app.netlify.com` |
| Supabase Dashboard | `https://supabase.com/dashboard` |

### Common Commands

```bash
# Local development
npm run dev

# Build for production
npm run build

# Test production build
npm run preview

# With Netlify Functions locally
netlify dev

# Deploy to production (manual)
netlify deploy --prod
```

### Key Files

```
CoRE/
├── netlify.toml              # Netlify configuration
├── .env.example              # Example environment variables
├── src/
│   ├── pages/
│   │   ├── AdminLogin.jsx    # Admin login page
│   │   └── AdminDashboard.jsx # Admin CMS
│   └── lib/
│       ├── supabaseClient.js # Supabase connection
│       └── cmsApi.js         # API functions
├── netlify/functions/        # Serverless functions
└── CMS_SCHEMA.md            # Database schema
```

---

## ✅ Final Checklist

Before going live:

- [ ] Supabase tables created (run SQL from `CMS_SCHEMA.md`)
- [ ] Environment variables set in Netlify
- [ ] Admin user created in Supabase Auth
- [ ] Test admin login works
- [ ] Test form submission (Contact page)
- [ ] Test newsletter subscription
- [ ] Edit counters in admin panel, verify homepage updates
- [ ] Test on mobile devices
- [ ] Check all pages load correctly
- [ ] Set up custom domain (if applicable)

---

## 🎉 You're Live!

Your CoRE website is now:
- ✅ Deployed on Netlify (Free hosting!)
- ✅ Auto-deploys on every GitHub push
- ✅ Has serverless backend (Netlify Functions + Supabase)
- ✅ Admin CMS for non-technical editors
- ✅ Fully responsive and optimized
- ✅ Secure with RLS policies

**Share your admin panel URL with coordinators so they can update content without touching code!**

---

## 📚 Additional Resources

- **Netlify Docs**: https://docs.netlify.com/
- **Supabase Docs**: https://supabase.com/docs
- **Vite Docs**: https://vitejs.dev/
- **React Router**: https://reactrouter.com/

Need help? Ask in the CoRE web dev team channel! 🚀
