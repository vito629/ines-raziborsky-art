# Atelier Gallery

An elegant, minimalistic art gallery website with integrated CMS for easy content management.

## ✨ Features

- **Elegant Design** - Minimalistic layout with EB Garamond typography
- **Easy CMS** - Manage artwork via Sanity Studio at `/studio`
- **Mobile-Friendly** - Edit content from any device
- **Zero Config** - Deploy to Vercel in one click
- **Type-Safe** - Built with TypeScript for reliability
- **Modern Stack** - Next.js 16, Tailwind CSS, shadcn/ui

## 🚀 Quick Start

1. **Install dependencies**
   ```bash
   bun install
   ```

2. **Set up Sanity**
   - Create project at [sanity.io/manage](https://sanity.io/manage)
   - Add Project ID to `.env.local`:
     ```
     NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
     NEXT_PUBLIC_SANITY_DATASET=production
     ```

3. **Run development server**
   ```bash
   bun run dev
   ```

4. **Add content**
   - Visit http://localhost:3000/studio
   - Add artwork and artist information
   - Changes appear instantly on the site

## 📖 Documentation

See [SETUP.md](./SETUP.md) for detailed setup, deployment, and customization instructions.

## 🎨 Built With

- [Next.js](https://nextjs.org) - React framework
- [Sanity](https://sanity.io) - Headless CMS
- [shadcn/ui](https://ui.shadcn.com) - UI components
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [EB Garamond](https://fonts.google.com/specimen/EB+Garamond) - Typography

## 📝 License

MIT
