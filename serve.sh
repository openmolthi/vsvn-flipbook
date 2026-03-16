#!/bin/bash
# Quick server for testing VSVN Flipbook

echo "🦆 Starting VSVN Zone 1 Flipbook Server..."
echo ""
echo "📱 Open in your browser:"
echo "   http://localhost:8000"
echo ""
echo "📱 On phone (same network):"
echo "   http://$(ipconfig getifaddr en0):8000"
echo ""
echo "Press Ctrl+C to stop"
echo ""

python3 -m http.server 8000
