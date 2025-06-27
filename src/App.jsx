import { useState, useCallback, useRef, useEffect } from 'react'
import './App.css'
import ShareButton from './ShareButton'

function App() {
  const [bubbles, setBubbles] = useState([])
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [combo, setCombo] = useState(0)
  const [particles, setParticles] = useState([])
  const [lastPopTime, setLastPopTime] = useState(0)
  const audioRef = useRef(new Audio())
  const comboTimeoutRef = useRef(null)
  
  // Array of unexpected sounds (we'll create these files)
  const soundFiles = [
    '/sounds/wilhelm-scream.mp3',
    '/sounds/cat-meow.mp3',
    '/sounds/dial-up.mp3',
    '/sounds/opera.mp3',
    '/sounds/no-sound.mp3',
    '/sounds/rubber-duck.mp3',
    '/sounds/airhorn.mp3',
    '/sounds/wow.mp3',
    '/sounds/vine-boom.mp3',
    '/sounds/bruh.mp3'
  ]

  const specialSounds = [
    '/sounds/golden-pop.mp3',
    '/sounds/jackpot.mp3',
    '/sounds/magic.mp3'
  ]

  // Initialize bubble grid
  useEffect(() => {
    const generateBubbles = () => {
      const bubbleArray = []
      const rows = 20
      const cols = 15
      
      for (let i = 0; i < rows * cols; i++) {
        const isGolden = Math.random() < 0.05 // 5% chance for golden bubble
        bubbleArray.push({
          id: i,
          popped: false,
          size: Math.random() * 20 + 40, // Random size between 40-60px
          delay: Math.random() * 2, // Random animation delay
          isGolden,
          type: isGolden ? 'golden' : 'normal'
        })
      }
      return bubbleArray
    }
    
    setBubbles(generateBubbles())
  }, [])

  // Create particle effect
  const createParticles = useCallback((x, y, isGolden = false) => {
    const newParticles = []
    const particleCount = isGolden ? 15 : 8
    
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: Date.now() + i,
        x: x + (Math.random() - 0.5) * 100,
        y: y + (Math.random() - 0.5) * 100,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8,
        color: isGolden ? '#FFD700' : ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4'][Math.floor(Math.random() * 4)],
        size: Math.random() * 6 + 4,
        life: 1
      })
    }
    
    setParticles(prev => [...prev, ...newParticles])
    
    // Remove particles after animation
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.some(np => np.id === p.id)))
    }, 1000)
  }, [])

  // Haptic feedback for mobile
  const triggerHaptic = useCallback((intensity = 'medium') => {
    if ('vibrate' in navigator) {
      const patterns = {
        light: [10],
        medium: [20],
        heavy: [50],
        double: [20, 50, 20]
      }
      navigator.vibrate(patterns[intensity] || patterns.medium)
    }
  }, [])

  const playRandomSound = useCallback((isGolden = false) => {
    const soundArray = isGolden ? specialSounds : soundFiles
    const randomSound = soundArray[Math.floor(Math.random() * soundArray.length)]
    
    // Create new audio instance for each play to allow overlapping sounds
    const audio = new Audio(randomSound)
    audio.volume = isGolden ? 0.9 : 0.7
    
    // Handle error if sound file doesn't exist
    audio.onerror = () => {
      console.log(`Sound file ${randomSound} not found, using fallback`)
      // Create a simple beep sound as fallback
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      const baseFreq = isGolden ? 1200 : 800
      oscillator.frequency.setValueAtTime(baseFreq + Math.random() * 400, audioContext.currentTime)
      oscillator.type = isGolden ? 'triangle' : 'sine'
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
      
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.3)
    }
    
    audio.play().catch(console.error)
  }, [soundFiles, specialSounds])

  const popBubble = useCallback((bubbleId, event) => {
    const bubble = bubbles.find(b => b.id === bubbleId)
    if (!bubble || bubble.popped) return

    const currentTime = Date.now()
    const timeSinceLastPop = currentTime - lastPopTime
    
    setBubbles(prevBubbles => 
      prevBubbles.map(b => 
        b.id === bubbleId 
          ? { ...b, popped: true }
          : b
      )
    )
    
    // Update score and streak
    const points = bubble.isGolden ? 10 : 1
    setScore(prev => prev + points)
    setStreak(prev => prev + 1)
    
    // Combo system (if bubbles popped within 500ms)
    if (timeSinceLastPop < 500) {
      setCombo(prev => prev + 1)
      
      // Clear existing timeout
      if (comboTimeoutRef.current) {
        clearTimeout(comboTimeoutRef.current)
      }
      
      // Reset combo after 1 second of no pops
      comboTimeoutRef.current = setTimeout(() => {
        setCombo(0)
      }, 1000)
    } else {
      setCombo(1)
    }
    
    setLastPopTime(currentTime)
    
    // Create particle effect at bubble position
    if (event && event.target) {
      const rect = event.target.getBoundingClientRect()
      createParticles(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2,
        bubble.isGolden
      )
    }
    
    // Play sound
    playRandomSound(bubble.isGolden)
    
    // Haptic feedback
    triggerHaptic(bubble.isGolden ? 'heavy' : 'medium')
    
    // Add screen shake effect (stronger for golden bubbles)
    const shakeIntensity = bubble.isGolden ? 'shake-heavy' : 'shake'
    document.body.style.animation = `${shakeIntensity} 0.1s`
    setTimeout(() => {
      document.body.style.animation = ''
    }, 100)
    
    // Special effects for combos
    if (combo > 0 && combo % 5 === 0) {
      document.body.style.animation = 'rainbow-flash 0.5s'
      triggerHaptic('double')
      setTimeout(() => {
        document.body.style.animation = ''
      }, 500)
    }
  }, [bubbles, lastPopTime, combo, createParticles, playRandomSound, triggerHaptic])

  const resetBubbles = () => {
    setBubbles(prevBubbles =>
      prevBubbles.map(bubble => ({ 
        ...bubble, 
        popped: false,
        isGolden: Math.random() < 0.05 // Regenerate golden bubbles
      }))
    )
    setScore(0)
    setStreak(0)
    setCombo(0)
    setParticles([])
  }

  // Auto-regenerate some bubbles over time
  useEffect(() => {
    const interval = setInterval(() => {
      setBubbles(prevBubbles => {
        const poppedBubbles = prevBubbles.filter(b => b.popped)
        if (poppedBubbles.length === 0) return prevBubbles
        
        // Regenerate 1-2 random popped bubbles
        const toRegenerate = Math.min(2, poppedBubbles.length)
        const bubblesToRegenerate = []
        
        for (let i = 0; i < toRegenerate; i++) {
          if (Math.random() < 0.1) { // 10% chance to regenerate
            const randomIndex = Math.floor(Math.random() * poppedBubbles.length)
            bubblesToRegenerate.push(poppedBubbles[randomIndex].id)
          }
        }
        
        return prevBubbles.map(bubble => 
          bubblesToRegenerate.includes(bubble.id)
            ? { 
                ...bubble, 
                popped: false, 
                isGolden: Math.random() < 0.03, // 3% chance for regenerated golden
                size: Math.random() * 20 + 40 
              }
            : bubble
        )
      })
    }, 3000) // Check every 3 seconds
    
    return () => clearInterval(interval)
  }, [])

  const getComboText = () => {
    if (combo < 2) return ''
    if (combo < 5) return `${combo}x COMBO!`
    if (combo < 10) return `${combo}x MEGA COMBO!!`
    return `${combo}x ULTRA COMBO!!!`
  }

  return (
    <div className="app">
      {/* Particle Effects */}
      <div className="particles-container">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              backgroundColor: particle.color,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
          />
        ))}
      </div>

      <header className="header">
        <h1 className="title">🫧 Bubble Wrap Surprise 🫧</h1>
        <p className="subtitle">Pop the bubbles... but brace yourself for the sounds! 🔊</p>
        
        {/* Stats Display */}
        <div className="stats">
          <div className="stat">
            <span className="stat-label">Score:</span>
            <span className="stat-value">{score}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Streak:</span>
            <span className="stat-value">{streak}</span>
          </div>
          {combo > 1 && (
            <div className="combo-display">
              {getComboText()}
            </div>
          )}
        </div>
        
        <div className="action-buttons">
          <button className="reset-btn" onClick={resetBubbles}>
            Reset All Bubbles
          </button>
          <ShareButton score={score} streak={streak} />
        </div>
      </header>
      
      <div className="bubble-container">
        {bubbles.map((bubble) => (
          <div
            key={bubble.id}
            className={`bubble ${bubble.popped ? 'popped' : ''} ${bubble.isGolden ? 'golden' : ''}`}
            style={{
              '--size': `${bubble.size}px`,
              '--delay': `${bubble.delay}s`
            }}
            onClick={(e) => !bubble.popped && popBubble(bubble.id, e)}
          />
        ))}
      </div>
      
      <footer className="footer">
        <p>🎵 Sound ON for maximum chaos! Each bubble plays a random sound.</p>
        <p>✨ Look for golden bubbles for bonus points!</p>
        <p>🔥 Pop bubbles quickly for combos!</p>
        <p>Perfect for TikTok - expect the unexpected! 🤪</p>
      </footer>
    </div>
  )
}

export default App
