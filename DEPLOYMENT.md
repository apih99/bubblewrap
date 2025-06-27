# 🚀 Deployment Guide for GitHub Pages

## 📋 Pre-Deployment Checklist

### ✅ Repository Setup
- [ ] Create GitHub repository named `bubblewrap`
- [ ] Set repository to public (required for free GitHub Pages)
- [ ] Clone repository locally
- [ ] Copy all project files to repository

### ✅ GitHub Pages Configuration
1. Go to your repository settings: `https://github.com/apih99/bubblewrap/settings`
2. Scroll down to **"Pages"** section
3. Under **"Source"**, select **"GitHub Actions"**
4. Save the settings

### ✅ Code Preparation
- [ ] All files are in the correct structure
- [ ] `.github/workflows/deploy.yml` is present
- [ ] `vite.config.js` has correct base path (`/bubblewrap/`)
- [ ] `package.json` has correct homepage URL

## 🎯 Deployment Steps

### 1. Initialize Git Repository
```bash
cd bubble-wrap-surprise
git init
git add .
git commit -m "🎉 Initial commit: Bubble Wrap Surprise app"
```

### 2. Connect to GitHub
```bash
git remote add origin https://github.com/apih99/bubblewrap.git
git branch -M main
git push -u origin main
```

### 3. Verify Deployment
- GitHub Actions will automatically trigger
- Check the **Actions** tab in your repository
- Wait for the build and deployment to complete (2-3 minutes)
- Visit: `https://apih99.github.io/bubblewrap`

## 🔧 Troubleshooting

### Build Fails
- Check Node.js version in workflow (currently set to 20)
- Verify all dependencies are in `package.json`
- Check console errors in GitHub Actions logs

### Site Not Loading
- Ensure GitHub Pages is enabled with "GitHub Actions" source
- Check if repository is public
- Verify the base path in `vite.config.js` matches repository name

### 404 Errors
- Confirm the base URL: `https://apih99.github.io/bubblewrap`
- Check if the `base: '/bubblewrap/'` is correctly set in Vite config

### Sound Files Not Working
- Add sound files to `public/sounds/` directory
- Follow the guide in `public/sounds/README.md`
- Commit and push sound files to repository

## 🎵 Adding Sound Files

### Option 1: Manual Upload
1. Download sound files from sources listed in `public/sounds/README.md`
2. Place them in `bubble-wrap-surprise/public/sounds/`
3. Commit and push:
```bash
git add public/sounds/*.mp3
git commit -m "🔊 Add sound effects"
git push
```

### Option 2: GitHub Web Interface
1. Navigate to your repository online
2. Go to `bubble-wrap-surprise/public/sounds/`
3. Click "Add file" → "Upload files"
4. Drag and drop your sound files
5. Commit directly to main branch

## 📱 Testing Deployment

### Desktop Testing
- Visit the deployed site
- Test bubble popping
- Check sound functionality
- Test share buttons

### Mobile Testing
- Open on mobile device
- Test touch controls
- Verify haptic feedback works
- Test mobile sharing features

## 🔄 Future Updates

### Making Changes
1. Edit files locally
2. Test with `npm run dev`
3. Commit and push changes
4. GitHub Actions will automatically redeploy

### Quick Deploy Commands
```bash
# Make changes, then:
git add .
git commit -m "✨ Your update description"
git push
```

## 🎯 Success Checklist

- [ ] Site loads at `https://apih99.github.io/bubblewrap`
- [ ] Bubbles pop when clicked/tapped
- [ ] Score and streak tracking works
- [ ] Particle effects appear
- [ ] Golden bubbles spawn occasionally
- [ ] Share button functions
- [ ] Mobile responsiveness works
- [ ] Sound effects play (if added)

## 🆘 Need Help?

### Common Issues
1. **"Site not found"** → Check GitHub Pages settings
2. **"Build failed"** → Check Actions tab for error logs
3. **"Sounds not working"** → Add sound files to repository
4. **"White screen"** → Check browser console for errors

### Resources
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#github-pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

---

🎉 **Once deployed, your Bubble Wrap Surprise will be live and ready for viral TikTok content!**

📱 Share the link: `https://apih99.github.io/bubblewrap` 