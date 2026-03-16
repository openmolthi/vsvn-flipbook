// VSVN Flipbook Player
// LoonMight Studio 🦆

class VSVNPlayer {
    constructor() {
        this.story = null;
        this.currentImage = '';
        this.currentAudio = null;
        this.progress = 0;
        this.maxProgress = 0;
        
        // Image mapping
        this.imageMap = {
            'black': 'images/garden-wake.png',
            'fade_white': 'images/garden-wake.png',
            'greenhouse_broken': 'images/greenhouse-broken.png',
            'tangled_vines': 'images/glass-shards.png',
            'sunlit_clearing': 'images/joy-petal.png',
            'joy_glow': 'images/joy-petal.png',
            'rotten_bridge': 'images/rotten-bridge.png',
            'bardo_flash': 'images/garden-wake.png',
            'dying_trees': 'images/fear-shadow.png',
            'trees_burning': 'images/fear-shadow.png',
            'water_pour': 'images/fear-shadow.png',
            'cherry_tree_half_dead': 'images/cherry-tree.png',
            'gold_lines': 'images/cherry-tree.png',
            'title_card': 'images/compass-assembly.png'
        };
        
        // Voice audio mapping
        this.voiceMap = {
            "efficient. i like that.": "audio/voice-001.mp3",
            "taking the hard way. that's very you.": "audio/voice-002.mp3",
            "ah. comfort. enjoy it while it lasts.": "audio/voice-003.mp3",
            "comfort is easy. cheap pleasure. real satisfaction requires struggle. you'll learn the difference.": "audio/voice-004.mp3",
            "you're afraid. that's weakness showing.": "audio/voice-005.mp3",
            "...hm. maybe.": "audio/voice-006.mp3",
            "fear says: run. or freeze. never helpful.": "audio/voice-007.mp3",
            "...you might be right. i'll think about it.": "audio/voice-008.mp3",
            "fear froze you. told you.": "audio/voice-009.mp3",
            "you know what's interesting? pleasure and enjoyment aren't the same thing.": "audio/voice-010.mp3",
            "pleasure is easy. food. warmth. safety. it fades fast. enjoyment requires effort. struggle. meaning. that lasts.": "audio/voice-011.mp3",
            "comfort makes you soft. satisfaction makes you strong. guess which one the world rewards?": "audio/voice-012.mp3",
            "and what's the reward for getting stronger?": "audio/voice-013.mp3",
            "...cute. but no. the reward is never resting again. you get stronger so you can carry more. forever.": "audio/voice-014.mp3",
            "exactly. the treadmill never stops. isn't that exciting?": "audio/voice-015.mp3",
            "you will.": "audio/voice-016.mp3"
        };
        
        this.init();
    }
    
    async init() {
        // Load story JSON
        const response = await fetch('story/zone1.json');
        const storyData = await response.json();
        this.story = new inkjs.Story(storyData);
        
        // Calculate max progress
        this.maxProgress = this.estimateStoryLength();
        
        // Set up UI
        this.setupUI();
    }
    
    setupUI() {
        const startButton = document.getElementById('start-button');
        startButton.addEventListener('click', () => {
            this.startGame();
        });
        
        // Load saved progress
        const savedState = localStorage.getItem('vsvn-zone1-save');
        if (savedState) {
            // Could add "Continue" button here
        }
    }
    
    startGame() {
        const startScreen = document.getElementById('start-screen');
        startScreen.classList.add('hidden');
        
        setTimeout(() => {
            this.continueStory();
        }, 800);
    }
    
    continueStory() {
        if (!this.story.canContinue && this.story.currentChoices.length === 0) {
            this.endStory();
            return;
        }
        
        let storyText = '';
        
        // Continue until we hit choices or end
        while (this.story.canContinue) {
            const line = this.story.Continue();
            storyText += line;
            
            // Check for tags
            const tags = this.story.currentTags;
            this.processTags(tags);
        }
        
        // Update progress
        this.progress += 1;
        this.updateProgress();
        
        // Display text
        this.displayText(storyText);
        
        // Display choices
        if (this.story.currentChoices.length > 0) {
            this.displayChoices();
        }
        
        // Save state
        this.saveState();
    }
    
    processTags(tags) {
        tags.forEach(tag => {
            const [key, value] = tag.split(':');
            
            if (key === 'visual' || key === 'image') {
                this.changeImage(value.trim());
            }
        });
    }
    
    changeImage(imageKey) {
        const imagePath = this.imageMap[imageKey] || this.imageMap['black'];
        const sceneImage = document.getElementById('scene-image');
        
        // Fade out
        sceneImage.classList.add('scene-fade');
        
        setTimeout(() => {
            sceneImage.src = imagePath;
            sceneImage.classList.remove('scene-fade');
        }, 400);
        
        this.currentImage = imageKey;
    }
    
    displayText(text) {
        const storyTextDiv = document.getElementById('story-text');
        storyTextDiv.innerHTML = '';
        
        // Parse text for formatting
        const lines = text.split('\n').filter(line => line.trim());
        
        lines.forEach(line => {
            const p = document.createElement('p');
            
            // Check for Voice lines
            if (line.includes('<b>VOICE:</b>')) {
                const voiceText = line.replace('<b>VOICE:</b>', '').trim();
                p.className = 'voice-line';
                p.innerHTML = `<strong>VOICE:</strong> ${voiceText}`;
                
                // Play audio for this line
                this.playVoiceAudio(voiceText);
            }
            // Check for inner thoughts
            else if (line.includes('<i>') && line.includes('</i>')) {
                p.className = 'inner-thought';
                p.innerHTML = line.replace(/<\/?i>/g, '');
            }
            // Regular narration
            else {
                p.className = 'narration';
                p.innerHTML = line.replace(/<\/?[^>]+(>|$)/g, '');
            }
            
            storyTextDiv.appendChild(p);
        });
        
        // Scroll to bottom
        const textPanel = document.getElementById('text-panel');
        textPanel.scrollTop = textPanel.scrollHeight;
    }
    
    playVoiceAudio(text) {
        const cleanText = text.toLowerCase().replace(/<\/?[^>]+(>|$)/g, '').trim();
        
        // Find matching audio
        let audioPath = null;
        for (const [key, path] of Object.entries(this.voiceMap)) {
            if (key.toLowerCase() === cleanText) {
                audioPath = path;
                break;
            }
        }
        
        if (audioPath) {
            const audio = document.getElementById('voice-audio');
            audio.src = audioPath;
            
            // Try to play, but handle autoplay restrictions
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log('Audio autoplay blocked:', error);
                    // Could show a play button here
                });
            }
        }
    }
    
    displayChoices() {
        const choicesContainer = document.getElementById('choices-container');
        choicesContainer.innerHTML = '';
        
        this.story.currentChoices.forEach((choice, index) => {
            const button = document.createElement('button');
            button.className = 'choice-button';
            button.textContent = choice.text;
            button.addEventListener('click', () => {
                this.makeChoice(index);
            });
            choicesContainer.appendChild(button);
        });
    }
    
    makeChoice(index) {
        this.story.ChooseChoiceIndex(index);
        
        // Clear choices
        const choicesContainer = document.getElementById('choices-container');
        choicesContainer.innerHTML = '';
        
        // Continue story
        setTimeout(() => {
            this.continueStory();
        }, 300);
    }
    
    updateProgress() {
        const percentage = Math.min((this.progress / this.maxProgress) * 100, 100);
        const progressFill = document.getElementById('progress-fill');
        progressFill.style.width = percentage + '%';
    }
    
    estimateStoryLength() {
        // Rough estimate based on story structure
        return 30; // Approximate number of story beats
    }
    
    saveState() {
        const saveData = {
            state: this.story.state.ToJson(),
            progress: this.progress,
            image: this.currentImage,
            timestamp: Date.now()
        };
        localStorage.setItem('vsvn-zone1-save', JSON.stringify(saveData));
    }
    
    loadState() {
        const savedData = localStorage.getItem('vsvn-zone1-save');
        if (savedData) {
            const data = JSON.parse(savedData);
            this.story.state.LoadJson(data.state);
            this.progress = data.progress;
            this.currentImage = data.image;
            this.changeImage(this.currentImage);
            return true;
        }
        return false;
    }
    
    endStory() {
        const storyTextDiv = document.getElementById('story-text');
        storyTextDiv.innerHTML += '<p class="narration" style="text-align: center; margin-top: 30px; color: var(--text-voice);">— Zone 1 Complete —</p>';
        
        // Update progress to 100%
        const progressFill = document.getElementById('progress-fill');
        progressFill.style.width = '100%';
        
        // Could add restart button here
        setTimeout(() => {
            const choicesContainer = document.getElementById('choices-container');
            const restartBtn = document.createElement('button');
            restartBtn.className = 'choice-button';
            restartBtn.textContent = 'Start Over';
            restartBtn.addEventListener('click', () => {
                location.reload();
            });
            choicesContainer.appendChild(restartBtn);
        }, 2000);
    }
}

// Initialize when page loads
window.addEventListener('DOMContentLoaded', () => {
    const player = new VSVNPlayer();
});
