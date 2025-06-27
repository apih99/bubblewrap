# 🫧 Bubble Wrap Surprise

**Pop bubbles but expect the unexpected sounds! Perfect for TikTok content.**

[![Deploy to GitHub Pages](https://github.com/apih99/bubblewrap/actions/workflows/deploy.yml/badge.svg)](https://github.com/apih99/bubblewrap/actions/workflows/deploy.yml)

🎮 **[Live Demo](https://apih99.github.io/bubblewrap)** | 📱 **Mobile Optimized** | 🔊 **Sound ON Required**

## 🎯 What is this?

A hilarious twist on classic virtual bubble wrap! Each bubble you pop plays a completely random, unexpected sound - from Wilhelm screams to cat meows, dial-up internet to opera snippets. It's designed to create shareable, viral TikTok moments!

## ✨ Features

### 🎵 **Unexpected Audio Experience**
- 10+ hilarious sound effects that don't match bubble popping
- Special golden bubble sounds for rare finds
- Fallback synthetic sounds if audio files are missing

### 🎮 **Gamification**
- **Score System**: Normal bubbles = 1 point, Golden bubbles = 10 points
- **Streak Counter**: Track consecutive pops
- **Combo System**: Pop bubbles quickly for multipliers
- **Real-time Stats**: Beautiful UI showing progress

### ✨ **Visual Effects**
- **Particle Explosions**: Colorful particles burst from each pop
- **Golden Bubbles**: Rare 5% spawn rate with special animations
- **Screen Shake**: Dynamic feedback based on bubble type
- **Rainbow Combos**: Special effects for milestone combos

### 📱 **Mobile Optimized**
- **Haptic Feedback**: Different vibration patterns for different bubbles
- **Touch Controls**: Optimized for mobile screens
- **Responsive Design**: Works perfectly on all devices
- **PWA Ready**: Can be installed as an app

### 🚀 **Social Features**
- **Easy Sharing**: Built-in social media sharing
- **Pre-written Viral Text**: Ready-to-share content with hashtags
- **Platform Integration**: Direct sharing to TikTok, Twitter, Facebook
- **Score Sharing**: Share your achievements

### 🔄 **Dynamic Content**
- **Auto-Regeneration**: Bubbles slowly respawn over time
- **Random Golden Spawns**: Keep the experience fresh
- **Endless Gameplay**: Perfect for long TikTok videos

## 🎬 TikTok Content Ideas

1. **"Sound ON" Challenge** - React to unexpected sounds
2. **High Score Attempts** - Try to beat your best score
3. **Golden Bubble Hunting** - Hunt for rare golden bubbles
4. **Combo Challenges** - Go for mega combo streaks
5. **Sound Compilation** - Showcase the funniest sound combinations
6. **Reaction Videos** - Film friends' reactions during first play

## 🔧 Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
git clone https://github.com/apih99/bubblewrap.git
cd bubblewrap/bubble-wrap-surprise
npm install
```

### Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🔊 Sound Setup

The app includes a complete guide in `/public/sounds/README.md` with instructions on where to get hilarious sound effects from free sources:

- **Freesound.org** - High quality, free sounds
- **Zapsplat.com** - Professional sound effects
- **BBC Sound Effects Library** - Free for personal use
- **YouTube Audio Library** - Copyright-free sounds

### Required Sound Files:
1. `wilhelm-scream.mp3` - Classic movie scream
2. `cat-meow.mp3` - Cute cat sound
3. `dial-up.mp3` - Nostalgic internet sound
4. `opera.mp3` - Dramatic opera snippet
5. `no-sound.mp3` - Someone yelling "NO!"
6. `rubber-duck.mp3` - Duck squeak
7. `airhorn.mp3` - Obnoxious airhorn
8. `wow.mp3` - Owen Wilson "wow"
9. `vine-boom.mp3` - Famous Vine boom
10. `bruh.mp3` - Disappointed "bruh"

## 🚀 Deployment

This project is automatically deployed to GitHub Pages using GitHub Actions.

### Automatic Deployment
- Push to `main` or `master` branch triggers deployment
- Manual deployment available from Actions tab
- Live at: https://apih99.github.io/bubblewrap

### Manual Deployment Setup
1. Enable GitHub Pages in repository settings
2. Set source to "GitHub Actions"
3. Push code to trigger workflow

## 🛠️ Tech Stack

- **React 19** - Modern React with hooks
- **Vite** - Lightning-fast build tool
- **CSS Grid** - Responsive bubble layout
- **Web Audio API** - Fallback sound generation
- **CSS Animations** - Smooth interactions
- **PWA Features** - Mobile app-like experience

## 📊 Performance

- **Optimized Bundle**: Vendor chunks for better caching
- **60fps Animations**: Hardware-accelerated CSS
- **Memory Efficient**: Automatic particle cleanup
- **Mobile First**: Touch and haptic optimizations

## 🎨 Customization

### Colors
Edit CSS variables in `src/App.css`:
```css
:root {
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --golden-color: #FFD700;
  --particle-colors: #ff6b6b, #4ecdc4, #45b7d1, #96ceb4;
}
```

### Bubble Count
Modify in `src/App.jsx`:
```javascript
const rows = 20  // Change number of rows
const cols = 15  // Change number of columns
```

### Golden Bubble Rate
```javascript
const isGolden = Math.random() < 0.05 // 5% chance - adjust as needed
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use for your own viral content!

## 🙏 Credits

- Sound effects from various free sources (see `/public/sounds/README.md`)
- Inspired by classic bubble wrap stress relief
- Built for the TikTok generation

---

**Made for viral moments** 🚀 **Perfect for TikTok** 📱 **Sound ON required** 🔊
