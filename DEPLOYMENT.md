# Deployment Guide

This guide covers deploying the Manpower Management System to various platforms.

## Vercel (Recommended)

Vercel is the recommended platform as it's built by the creators of Next.js and offers the best performance.

### Method 1: GitHub Integration (Easiest)

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Next.js settings
6. Click "Deploy"

Your app will be live at `https://your-project.vercel.app`

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd manpower-view
vercel

# Follow the prompts
# For production deployment
vercel --prod
```

### Environment Variables (if needed)

In Vercel dashboard:
1. Go to Project Settings
2. Navigate to Environment Variables
3. Add any required variables

## Netlify

### Deploy via Git

1. Push code to GitHub/GitLab/Bitbucket
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Connect your repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Click "Deploy site"

### Deploy via CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build the project
npm run build

# Deploy
netlify deploy --prod
```

## Railway

1. Go to [railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository
5. Railway auto-detects Next.js
6. Click "Deploy"

## AWS Amplify

1. Go to AWS Amplify Console
2. Click "New app" → "Host web app"
3. Connect your Git repository
4. Build settings (auto-detected):
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```
5. Click "Save and deploy"

## DigitalOcean App Platform

1. Go to DigitalOcean App Platform
2. Click "Create App"
3. Connect your GitHub repository
4. Configure:
   - Build Command: `npm run build`
   - Run Command: `npm start`
5. Click "Next" and deploy

## Docker Deployment

### Create Dockerfile

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### Build and Run

```bash
# Build image
docker build -t manpower-view .

# Run container
docker run -p 3000:3000 manpower-view
```

## Self-Hosted (VPS/Dedicated Server)

### Prerequisites
- Node.js 18+ installed
- PM2 for process management
- Nginx for reverse proxy

### Setup Steps

1. **Install dependencies:**
```bash
cd manpower-view
npm install
npm run build
```

2. **Install PM2:**
```bash
npm install -g pm2
```

3. **Start with PM2:**
```bash
pm2 start npm --name "manpower-view" -- start
pm2 save
pm2 startup
```

4. **Configure Nginx:**
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

5. **Enable SSL with Let's Encrypt:**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## Environment Configuration

### Production Environment Variables

Create `.env.production` if needed:
```env
NEXT_PUBLIC_APP_URL=https://your-domain.com
NODE_ENV=production
```

## Performance Optimization

### Before Deployment

1. **Optimize Images:**
   - Use Next.js Image component
   - Compress images

2. **Enable Compression:**
   - Gzip/Brotli enabled by default in Next.js

3. **Analyze Bundle:**
```bash
npm run build
# Check .next/analyze for bundle size
```

4. **Enable Caching:**
   - Static assets cached automatically
   - Configure CDN if needed

## Post-Deployment Checklist

- [ ] Test all features in production
- [ ] Verify mobile responsiveness
- [ ] Check dark mode functionality
- [ ] Test data persistence (Local Storage)
- [ ] Verify export functionality
- [ ] Test on different browsers
- [ ] Check loading performance
- [ ] Verify SSL certificate
- [ ] Set up monitoring (optional)
- [ ] Configure analytics (optional)

## Monitoring (Optional)

### Vercel Analytics
```bash
npm install @vercel/analytics
```

Add to `app/layout.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

## Troubleshooting

### Build Fails
- Check Node.js version (18+)
- Clear `.next` folder and rebuild
- Check for TypeScript errors

### App Not Loading
- Verify build completed successfully
- Check server logs
- Ensure port 3000 is accessible

### Data Not Persisting
- Local Storage works only in browser
- Check browser settings allow Local Storage
- Consider backend database for production

## Scaling Considerations

For high-traffic scenarios:
1. Use CDN for static assets
2. Implement server-side caching
3. Consider database instead of Local Storage
4. Use load balancer for multiple instances
5. Implement rate limiting

## Backup Strategy

Since data is stored in Local Storage:
1. Implement export functionality (already included)
2. Regular data exports recommended
3. Consider backend database for critical data

## Support

For deployment issues:
- Check platform-specific documentation
- Review build logs
- Test locally first with `npm run build && npm start`

---

Happy Deploying! 🚀