# Lumina - Academic Assistant

A multilingual voice-controlled academic assistant designed for college teachers, built with React and featuring Gemini AI integration and PWA capabilities.

## Features

- 🎤 **Voice Input**: Web Speech API integration for hands-free interaction
- 🤖 **AI-Powered**: Gemini 1.5 Flash API for intelligent academic responses
- 🗣️ **Text-to-Speech**: Puter.js TTS with multilingual support
- 🌍 **Multilingual**: Support for English, Hindi, Tamil, and Telugu
- 🌓 **Dark/Light Mode**: Automatic theme switching with user preference
- 📱 **PWA Ready**: Installable as a Progressive Web App
- 💬 **Chat History**: Maintains last 5 question-answer pairs
- ♿ **Accessible**: Large buttons and clear contrast for classroom use

## Tech Stack

- **Frontend**: React 18 + Vite + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **AI**: Google Gemini 1.5 Flash API
- **Speech**: Web Speech API + Puter.js TTS
- **PWA**: Service Worker + Web App Manifest

## Setup Instructions

### Prerequisites

- Node.js 18+ and npm
- A Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd lumina
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory and add your Gemini API key:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

   Or if using Replit, add `GEMINI_API_KEY` to your Secrets.

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:5000`

### Getting a Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key and add it to your environment variables

## Usage

### Voice Interaction

1. **Start Listening**: Click the floating microphone button
2. **Speak Your Question**: Ask any academic-related question
3. **Auto-Stop**: The system stops listening after 3 seconds of silence
4. **Get Response**: Lumina processes your question and provides an answer
5. **Hear Response**: The answer is automatically spoken back in your selected language

### Language Support

- **English** 🇺🇸: Full support for voice input and TTS
- **Hindi** 🇮🇳: हिंदी में आवाज पहचान और उत्तर
- **Tamil** 🇮🇳: தமிழில் குரல் அங்கீகாரம் மற்றும் பதில்
- **Telugu** 🇮🇳: తెలుగులో వాయిస్ గుర్తింపు మరియు సమాధానం

### PWA Installation

#### Desktop (Chrome/Edge)
1. Look for the install icon in the address bar
2. Click "Install App" button in the header
3. Confirm installation in the popup

#### Mobile (Android/iOS)
1. Open in Chrome/Safari
2. Tap browser menu (⋮ or share icon)
3. Select "Add to Home Screen"
4. Confirm installation

## Features in Detail

### Voice Recognition
- Uses Web Speech API for accurate speech-to-text
- Supports multilingual recognition
- Auto-detects silence and stops listening
- Real-time transcript display

### AI Integration
- Powered by Gemini 1.5 Flash for fast responses
- Contextual prompts optimized for educators
- Language-specific system prompts
- Error handling with user feedback

### Text-to-Speech
- Primary: Puter.js TTS for enhanced voices
- Fallback: Web Speech API for universal support
- Language-appropriate voice selection
- Playback controls and error handling

### User Interface
- Clean, professional design
- Responsive for mobile and desktop
- High contrast for accessibility
- Smooth animations and transitions

## Browser Support

### Required Features
- **Web Speech API**: Chrome, Edge, Safari (iOS 14.5+)
- **Service Workers**: All modern browsers
- **CSS Grid/Flexbox**: All modern browsers

### Recommended Browsers
- **Desktop**: Chrome 85+, Edge 85+, Firefox 80+
- **Mobile**: Chrome Mobile 85+, Safari iOS 14.5+

## Troubleshooting

### Voice Recognition Issues
- **Not working**: Check microphone permissions
- **Poor accuracy**: Speak clearly and reduce background noise
- **Wrong language**: Verify language selection matches your speech

### API Issues
- **No responses**: Verify Gemini API key is correct
- **Rate limits**: Wait a moment before trying again
- **Network errors**: Check internet connection

### PWA Installation
- **Install button not showing**: Try using Chrome or Edge
- **Installation fails**: Clear browser cache and try again

## Deployment on Render

### Prerequisites for Render Deployment

1. **GitHub Repository**: Push your code to GitHub
2. **Gemini API Key**: Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
3. **Render Account**: Sign up at [render.com](https://render.com)

### Quick Deployment Steps

1. **Connect Repository**:
   - Log in to Render dashboard
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Configure Service**:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Environment**: Node.js (auto-detected)

3. **Set Environment Variables**:
   - `GEMINI_API_KEY`: Your Google Gemini API key
   - `NODE_ENV`: `production`

4. **Deploy**: Click "Create Web Service"

### Deployment Files Included

- **render.yaml**: Service configuration
- **.nvmrc**: Node.js version (20)
- **Procfile**: Start command
- **.renderignore**: Files to exclude from deployment
- **deploy/**: Deployment documentation and utilities

### Production Features

✅ **HTTPS**: Required for microphone access (automatic on Render)  
✅ **PWA**: Service worker and manifest included  
✅ **Performance**: Optimized build with asset compression  
✅ **Monitoring**: Health checks configured  
✅ **Scaling**: Ready for Render's auto-scaling  

### Post-Deployment Testing

1. Test voice recognition (needs microphone permission)
2. Verify AI responses with different languages
3. Test PWA installation
4. Check theme switching
5. Test all multilingual features

For detailed deployment instructions, see `deploy/render-deploy.md`.

## Development

### Project Structure
