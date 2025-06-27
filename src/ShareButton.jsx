import { useState } from 'react'

const ShareButton = ({ score, streak }) => {
  const [showShare, setShowShare] = useState(false)

  const shareText = `Just popped ${score} bubbles on Bubble Wrap Surprise! 🫧 My streak: ${streak} 🔥 The sounds are absolutely WILD! 😂 #BubbleWrapSurprise #TikTok #Viral`
  const shareUrl = window.location.href

  const handleShare = async (platform) => {
    const text = encodeURIComponent(shareText)
    const url = encodeURIComponent(shareUrl)
    
    let shareUrlFinal = ''
    
    switch (platform) {
      case 'twitter':
        shareUrlFinal = `https://twitter.com/intent/tweet?text=${text}&url=${url}`
        break
      case 'facebook':
        shareUrlFinal = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`
        break
      case 'tiktok':
        // TikTok doesn't have direct URL sharing, so we'll copy to clipboard with TikTok-friendly text
        const tiktokText = `Check out this hilarious bubble wrap app! The sounds are SO unexpected 😂 Link: ${shareUrl}`
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(tiktokText)
          alert('TikTok share text copied to clipboard! 📋')
          return
        }
        break
      case 'copy':
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(`${shareText} ${shareUrl}`)
          alert('Link copied to clipboard! 📋')
          return
        }
        break
      default:
        return
    }
    
    if (shareUrlFinal) {
      window.open(shareUrlFinal, '_blank', 'width=600,height=400')
    }
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '🫧 Bubble Wrap Surprise',
          text: shareText,
          url: shareUrl,
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      setShowShare(!showShare)
    }
  }

  return (
    <div className="share-container">
      <button 
        className="share-btn"
        onClick={handleNativeShare}
        title="Share your score!"
      >
        📤 Share
      </button>
      
      {showShare && (
        <div className="share-menu">
          <div className="share-menu-content">
            <h3>🎉 Share Your Score!</h3>
            <p>Score: {score} • Streak: {streak}</p>
            
            <div className="share-buttons">
              <button 
                onClick={() => handleShare('tiktok')}
                className="share-platform tiktok"
              >
                📱 TikTok
              </button>
              
              <button 
                onClick={() => handleShare('twitter')}
                className="share-platform twitter"
              >
                🐦 Twitter
              </button>
              
              <button 
                onClick={() => handleShare('facebook')}
                className="share-platform facebook"
              >
                📘 Facebook
              </button>
              
              <button 
                onClick={() => handleShare('copy')}
                className="share-platform copy"
              >
                📋 Copy Link
              </button>
            </div>
            
            <button 
              onClick={() => setShowShare(false)}
              className="close-share"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShareButton 