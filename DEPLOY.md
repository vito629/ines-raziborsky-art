# Deploy to Vercel - Quick Guide

## Step 1: Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `ines-raziborsky-art`
3. Description: "Contemporary art portfolio for Ines Raziborsky"
4. Keep it **Public** (or Private if you prefer)
5. **Don't** initialize with README (we already have one)
6. Click **"Create repository"**

## Step 2: Push Code to GitHub

GitHub will show you commands. Use these:

```bash
cd /root/atelier-gallery
git remote add origin https://github.com/YOUR-USERNAME/ines-raziborsky-art.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your actual GitHub username.

## Step 3: Deploy to Vercel

### 3a. Sign Up / Log In
1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" or "Log In"
3. Use "Continue with GitHub" (easiest)
4. Authorize Vercel to access your GitHub

### 3b. Import Project
1. Click "Add New" → "Project"
2. Find `ines-raziborsky-art` in your repository list
3. Click "Import"

### 3c. Configure Project
Vercel will auto-detect Next.js. You just need to add environment variables:

**Environment Variables** (click "Environment Variables" tab):
```
Name: NEXT_PUBLIC_SANITY_PROJECT_ID
Value: wx3ya3cb

Name: NEXT_PUBLIC_SANITY_DATASET
Value: production
```

### 3d. Deploy!
1. Click **"Deploy"**
2. Wait 2-3 minutes
3. You'll get a URL like: `ines-raziborsky-art.vercel.app`

## Step 4: Configure Sanity CORS

**IMPORTANT:** After deploying, you need to allow Vercel to access Sanity:

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project (Atelier Gallery)
3. Go to **"API"** → **"CORS Origins"**
4. Click **"Add CORS origin"**
5. Add these URLs:
   ```
   http://localhost:3001
   https://your-vercel-url.vercel.app
   ```
   Replace with your actual Vercel URL!
6. Check **"Allow credentials"**
7. Click **"Save"**

## Step 5: Test Your Site!

Visit your Vercel URL:
- **Public site**: `https://your-site.vercel.app`
- **CMS Studio**: `https://your-site.vercel.app/studio`

## 🎉 You're Live!

### What Just Happened?

- ✅ Code is on GitHub (version controlled, backed up)
- ✅ Website is live on Vercel (automatically rebuilds on git push)
- ✅ CMS is embedded at `/studio` route
- ✅ Any changes in Studio appear instantly

### Future Updates

To make changes to the code:
```bash
cd /root/atelier-gallery
# make changes
git add .
git commit -m "Description of changes"
git push
```

Vercel automatically redeploys when you push to GitHub!

### Custom Domain (Optional)

1. Buy a domain (e.g., `inesraziborsky.com`)
2. In Vercel: Settings → Domains → Add
3. Follow DNS instructions
4. Done! Your site is now at your custom domain

---

## Quick Reference

| What | Where |
|------|-------|
| **Public Website** | `your-site.vercel.app` |
| **CMS/Studio** | `your-site.vercel.app/studio` |
| **Sanity Dashboard** | `sanity.io/manage` |
| **Vercel Dashboard** | `vercel.com/dashboard` |
| **GitHub Repo** | `github.com/you/ines-raziborsky-art` |

## Need Help?

- **Vercel Issues**: Check build logs in Vercel dashboard
- **CMS Not Working**: Check CORS settings in Sanity
- **Images Not Loading**: Verify Sanity Project ID in Vercel env vars

That's it! 🚀
