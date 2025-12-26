# Atelier Gallery - Setup Guide

An elegant, minimalistic art gallery website with Sanity CMS integration.

## Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful UI components
- **Sanity CMS** - Headless CMS for content management
- **EB Garamond** - Elegant serif typography

## Local Development Setup

### 1. Install Dependencies

```bash
bun install
```

### 2. Set Up Sanity

#### Create a Sanity Project

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Click "Create project"
3. Name your project (e.g., "Atelier Gallery")
4. Choose a dataset name (use "production")
5. Copy your **Project ID**

#### Configure Environment Variables

Create or update `.env.local`:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id-here
NEXT_PUBLIC_SANITY_DATASET=production
```

### 3. Run Development Server

```bash
bun run dev
```

Visit:
- **Website**: http://localhost:3000
- **CMS Studio**: http://localhost:3000/studio

## Using the CMS

### First-Time Studio Setup

1. Go to http://localhost:3000/studio
2. Log in with your Sanity account
3. You'll see two content types: **Artwork** and **About**

### Adding Artwork

1. In Studio, click "Artwork" → "Create new document"
2. Fill in the details:
   - **Title**: Name of the artwork
   - **Slug**: Auto-generated URL-friendly version
   - **Image**: Upload your artwork image
   - **Description**: Optional description
   - **Medium**: e.g., "Oil on canvas", "Watercolor"
   - **Dimensions**: e.g., "24\" x 36\""
   - **Year**: Year created
   - **Featured**: Toggle for prominent display
   - **Display Order**: Lower numbers appear first
3. Click "Publish"

### Adding Artist Information

1. In Studio, click "About" → "Create new document"
2. Fill in:
   - **Artist Name**: Your name
   - **Biography**: Rich text bio
   - **Profile Image**: Optional headshot
   - **Email**: Contact email
   - **Instagram Handle**: Username without @
3. Click "Publish"

## Deploying to Vercel

### Prerequisites

- A GitHub/GitLab/Bitbucket account
- A Vercel account (free tier works great)

### Step 1: Push to GitHub

```bash
# Create a new repository on GitHub, then:
git remote add origin https://github.com/yourusername/atelier-gallery.git
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Next.js (auto-detected)
   - **Build Command**: `bun run build` (or leave default)
   - **Environment Variables**: Add these:
     ```
     NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
     NEXT_PUBLIC_SANITY_DATASET=production
     ```
5. Click "Deploy"

### Step 3: Configure Sanity CORS

After deployment, you need to allow Vercel to access Sanity:

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Go to "API" → "CORS Origins"
4. Add these origins:
   - `http://localhost:3000` (for local development)
   - `https://your-vercel-domain.vercel.app` (your Vercel URL)
   - Check "Allow credentials"
5. Save

## Project Structure

```
atelier-gallery/
├── app/
│   ├── layout.tsx          # Root layout with fonts
│   ├── page.tsx            # Homepage
│   ├── globals.css         # Global styles
│   └── studio/             # Sanity Studio route
│       └── [[...tool]]/
│           └── page.tsx
├── components/
│   ├── navigation.tsx      # Fixed navigation bar
│   ├── hero.tsx            # Hero section
│   ├── gallery-grid.tsx    # Gallery with CMS data
│   ├── about-section.tsx   # About section with CMS data
│   └── ui/                 # shadcn components
├── sanity/
│   ├── lib/
│   │   ├── client.ts       # Sanity client config
│   │   └── image.ts        # Image URL builder
│   └── schemas/
│       ├── artwork.ts      # Artwork content model
│       ├── about.ts        # About content model
│       └── index.ts
└── sanity.config.ts        # Sanity Studio config
```

## Customization Tips

### Changing Colors

Edit `app/globals.css`:
- `:root` section for light mode colors
- `.dark` section for dark mode colors

### Changing Fonts

Edit `app/layout.tsx`:
- Replace `EB_Garamond` with any Google Font
- Update `--font-serif` variable name if needed

### Modifying Layout

All components are in `components/`:
- `hero.tsx` - Hero section text and layout
- `gallery-grid.tsx` - Gallery grid columns (currently 1/2/3)
- `about-section.tsx` - About section layout
- `navigation.tsx` - Navigation links

### Adding New Content Types

1. Create schema in `sanity/schemas/`
2. Add to `sanity/schemas/index.ts`
3. Create component to fetch and display data
4. Add to `app/page.tsx`

## Mobile Responsiveness

The CMS Studio works great on mobile browsers:
- Visit your-site.com/studio on mobile
- Bookmark to home screen for app-like experience
- Upload images directly from camera
- Edit content on the go

## Troubleshooting

### "Configuration Error" in Studio

- Make sure `.env.local` has correct Sanity Project ID
- Restart dev server after changing env vars

### Images Not Loading

- Check CORS settings in Sanity dashboard
- Make sure image URLs are being generated correctly

### Build Errors on Vercel

- Ensure all environment variables are set in Vercel
- Check build logs for specific errors

## Support

Built with [shadcn/ui](https://ui.shadcn.com) and [Sanity](https://sanity.io)

For issues, check:
- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://sanity.io/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
