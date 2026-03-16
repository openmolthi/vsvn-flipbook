# VSVN — Zone 1: Waking Garden 🦆
**Interactive Flipbook Prototype**  
*by LoonMight Studio*

---

## 📱 For Sophie (Beta Tester)

Hi Sophie! This is the playable demo of VSVN's first zone. Here's how to play it:

### How to Play

**Option 1: Local File (Easiest)**
1. Download the entire `flipbook` folder
2. Open `index.html` in your phone's browser (Chrome or Safari work best)
3. Make sure your sound is ON for the full experience
4. Tap "Begin" to start

**Option 2: Live Server (Coming Soon)**
- We'll host this on a website so you can just click a link

### What to Expect

- **Story**: You wake up in a mysterious Japanese garden and must make your way through
- **Voice**: An inner voice will speak to you (with audio!) — but is it helping or hurting?
- **Choices**: Your decisions matter. Some paths are safer than others
- **Themes**: Fear, trust, comfort vs. satisfaction, the cost of getting stronger

### Controls

- **Tap choice buttons** to make decisions
- **Scroll** if there's lots of text
- The **golden progress bar** at the bottom shows how far you've gotten
- Your progress is auto-saved in your browser

### What We Want to Know

1. **Did the story make sense?** Was anything confusing?
2. **How did the Voice feel?** Creepy? Helpful? Annoying?
3. **Were the choices interesting?** Did you want to replay to see other paths?
4. **Mobile experience:** Did everything work smoothly on your phone?
5. **Audio:** Did the voice lines play? Were they atmospheric or distracting?
6. **Images:** Did the scenes change properly? Were they too dark?

### Technical Stuff (for nerds)

- Built with Ink (interactive narrative engine) + vanilla JavaScript
- Voice acting by Microsoft Edge TTS (en-US-JennyNeural)
- Scene art generated with Gemini 3 Pro Image
- Designed mobile-first (but works on desktop too)
- Progress saved to browser localStorage

---

## 🛠️ For Developers

### Project Structure

```
flipbook/
├── index.html          # Main entry point
├── css/
│   └── style.css       # Dark atmospheric theme
├── js/
│   └── player.js       # Game engine (Ink wrapper)
├── story/
│   └── zone1.json      # Compiled Ink story
├── images/             # Scene images (9 total)
├── audio/              # TTS voice lines (16 total)
└── README.md           # This file
```

### Running Locally

**Simple HTTP Server:**
```bash
cd flipbook
python3 -m http.server 8000
# Open http://localhost:8000 in browser
```

**Or use any static server:**
```bash
npx serve .
# or
npx http-server .
```

### Modifying the Story

1. Edit source: `/projects/loonmight/design/zone1-v4-brooks.ink`
2. Recompile: `inklecate zone1-v4-brooks.ink -o flipbook/story/zone1.json`
3. Refresh browser

### Adding New Audio

Voice lines are mapped in `js/player.js` in the `voiceMap` object.

To add a new line:
1. Generate audio: `edge-tts --text "your text" --voice en-US-JennyNeural --write-media audio/voice-XXX.mp3`
2. Add mapping to `voiceMap` in player.js
3. Make sure the text in your Ink file matches exactly

### Adding New Images

Images are mapped in `js/player.js` in the `imageMap` object.

To add a new scene:
1. Place image in `images/` folder
2. Add to `imageMap` with the tag name you'll use in Ink
3. Use tag in Ink: `#visual your_image_key`

### Deploying

**GitHub Pages (Free):**
```bash
# Create a new repo or use existing
git add flipbook/
git commit -m "Add VSVN Zone 1 flipbook"
git push origin main

# Enable GitHub Pages in repo settings
# Point to /flipbook folder (or move contents to root)
```

**Netlify/Vercel (Also Free):**
- Drag and drop the `flipbook` folder
- Or connect to your Git repo

---

## 📊 Stats

- **Story length:** ~10-15 minutes (depending on reading speed)
- **Choices:** 20+ decision points
- **Branches:** 5 major paths
- **Voice lines:** 16 audio clips
- **Scenes:** 9 unique images
- **File size:** ~2MB total (mobile-friendly)

---

## 🎮 Future Enhancements

- [ ] Background ambient music
- [ ] Sound effects (footsteps, glass breaking, etc.)
- [ ] More granular save/load system
- [ ] Stats screen (karma, deaths, choices made)
- [ ] Multiple voice options
- [ ] Accessibility mode (larger text, high contrast)
- [ ] Replay specific scenes
- [ ] Zone 2 connection teaser

---

## 🐛 Known Issues

- Audio may not autoplay on some mobile browsers (iOS Safari) — users may need to tap screen first
- First image load might be delayed on slow connections
- Progress bar is approximate (based on story beats, not actual completion)

---

## 📝 License

VSVN is a creative project by LoonMight Studio.  
Prototype built for internal testing.  
© 2026 LoonMight 🦆

---

## 💬 Feedback

Sophie, send your thoughts to Molthi! Tell us:
- What worked
- What didn't
- What you want more of
- What confused you

Be brutally honest. We can handle it. 😈

---

**Thank you for beta testing! 🙏**
