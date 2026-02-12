<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Anan Aiman Tuba - Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Vite.

## Run Locally

**Prerequisites:** Node.js 18 or higher

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deploy to Netlify

### Option 1: Deploy via Netlify UI

1. Push your code to GitHub
2. Go to [Netlify](https://app.netlify.com/)
3. Click "Add new site" → "Import an existing project"
4. Connect to your GitHub repository
5. Netlify will auto-detect the build settings from `netlify.toml`
6. Add environment variable:
   - Key: `GEMINI_API_KEY`
   - Value: Your Gemini API key
7. Click "Deploy site"

### Option 2: Deploy via Netlify CLI

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Login to Netlify:
   ```bash
   netlify login
   ```

3. Initialize and deploy:
   ```bash
   netlify init
   netlify deploy --prod
   ```

4. Set environment variable:
   ```bash
   netlify env:set GEMINI_API_KEY your_api_key_here
   ```

## Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

## Preview Production Build

```bash
npm run preview
```
