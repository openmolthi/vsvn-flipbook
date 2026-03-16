#!/bin/bash
# Generate TTS audio for VSVN Zone 1

AUDIO_DIR="/Users/molthi/.openclaw/workspace/projects/loonmight/flipbook/audio"
mkdir -p "$AUDIO_DIR"

# Voice lines (whispery, intimate female voice)
VOICE="en-US-JennyNeural"

# Voice line 001
edge-tts --text "efficient. i like that." --voice "$VOICE" --rate=-10% --write-media "$AUDIO_DIR/voice-001.mp3"

# Voice line 002
edge-tts --text "taking the hard way. that's very you." --voice "$VOICE" --rate=-10% --write-media "$AUDIO_DIR/voice-002.mp3"

# Voice line 003
edge-tts --text "ah. comfort. enjoy it while it lasts." --voice "$VOICE" --rate=-10% --write-media "$AUDIO_DIR/voice-003.mp3"

# Voice line 004
edge-tts --text "comfort is easy. cheap pleasure. real satisfaction requires struggle. you'll learn the difference." --voice "$VOICE" --rate=-10% --write-media "$AUDIO_DIR/voice-004.mp3"

# Voice line 005
edge-tts --text "you're afraid. that's weakness showing." --voice "$VOICE" --rate=-10% --write-media "$AUDIO_DIR/voice-005.mp3"

# Voice line 006
edge-tts --text "...hm. maybe." --voice "$VOICE" --rate=-10% --write-media "$AUDIO_DIR/voice-006.mp3"

# Voice line 007
edge-tts --text "fear says: run. or freeze. never helpful." --voice "$VOICE" --rate=-10% --write-media "$AUDIO_DIR/voice-007.mp3"

# Voice line 008
edge-tts --text "...you might be right. i'll think about it." --voice "$VOICE" --rate=-10% --write-media "$AUDIO_DIR/voice-008.mp3"

# Voice line 009
edge-tts --text "fear froze you. told you." --voice "$VOICE" --rate=-10% --write-media "$AUDIO_DIR/voice-009.mp3"

# Voice line 010
edge-tts --text "you know what's interesting? pleasure and enjoyment aren't the same thing." --voice "$VOICE" --rate=-10% --write-media "$AUDIO_DIR/voice-010.mp3"

# Voice line 011
edge-tts --text "pleasure is easy. food. warmth. safety. it fades fast. enjoyment requires effort. struggle. meaning. that lasts." --voice "$VOICE" --rate=-10% --write-media "$AUDIO_DIR/voice-011.mp3"

# Voice line 012
edge-tts --text "comfort makes you soft. satisfaction makes you strong. guess which one the world rewards?" --voice "$VOICE" --rate=-10% --write-media "$AUDIO_DIR/voice-012.mp3"

# Voice line 013
edge-tts --text "and what's the reward for getting stronger?" --voice "$VOICE" --rate=-10% --write-media "$AUDIO_DIR/voice-013.mp3"

# Voice line 014
edge-tts --text "...cute. but no. the reward is never resting again. you get stronger so you can carry more. forever." --voice "$VOICE" --rate=-10% --write-media "$AUDIO_DIR/voice-014.mp3"

# Voice line 015
edge-tts --text "exactly. the treadmill never stops. isn't that exciting?" --voice "$VOICE" --rate=-10% --write-media "$AUDIO_DIR/voice-015.mp3"

# Voice line 016
edge-tts --text "you will." --voice "$VOICE" --rate=-10% --write-media "$AUDIO_DIR/voice-016.mp3"

echo "✨ Generated $(ls $AUDIO_DIR/voice-*.mp3 | wc -l) voice audio files"
