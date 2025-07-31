# Lumina - Academic Assistant

## Overview

Lumina is a multilingual voice-controlled academic assistant designed for college teachers. It's built as a Progressive Web App (PWA) using React and TypeScript, featuring AI-powered responses through Google's Gemini API, voice recognition, and text-to-speech capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for development tooling
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: React hooks with local component state
- **Data Fetching**: TanStack Query (React Query) for server state management

### Backend Architecture
- **Server**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM (currently using in-memory storage as fallback)
- **API**: RESTful API structure with `/api` prefix
- **Build System**: ESBuild for production bundling

### Key Features
- **Voice Input**: Web Speech API integration for speech recognition
- **AI Integration**: Google Gemini 1.5 Flash API for generating academic responses
- **Text-to-Speech**: Dual implementation using Puter.js TTS (primary) and Web Speech API (fallback)
- **PWA Support**: Service worker, web app manifest, and offline capabilities
- **Multilingual**: Support for English, Hindi, Tamil, and Telugu
- **Theme System**: Dark/light mode with system preference detection

## Key Components

### Core Components
- **FloatingMic**: Main voice input interface with real-time transcription display
- **ChatHistory**: Displays conversation history with copy and speak functionality
- **Header**: Contains language selector, theme toggle, and PWA install button
- **StatusCard**: Shows current application state (listening, processing, ready)

### Custom Hooks
- **useSpeechRecognition**: Manages Web Speech API integration with language-specific settings
- **useTextToSpeech**: Handles TTS with fallback strategy (Puter.js → Web Speech API)
- **useGemini**: Manages AI API calls with error handling and loading states
- **useTheme**: Theme management with localStorage persistence
- **usePWAInstall**: Handles PWA installation prompt

### UI System
- Complete shadcn/ui component library implementation
- Custom Tailwind configuration with CSS variables for theming
- Responsive design optimized for both desktop and mobile

## Data Flow

1. **Voice Input**: User speaks → Web Speech API captures → Real-time transcription display
2. **AI Processing**: Transcript sent to Gemini API → Response generated → Added to chat history
3. **Audio Output**: AI response → TTS system (Puter.js or Web Speech API) → Audio playback
4. **State Management**: Chat history limited to last 5 question-answer pairs
5. **Persistence**: Theme preferences and PWA state stored in localStorage

## External Dependencies

### AI Services
- **Google Gemini 1.5 Flash API**: Primary AI service for generating academic responses
- **Puter.js**: Enhanced TTS service with multilingual support

### Browser APIs
- **Web Speech API**: Speech recognition and synthesis
- **Service Worker API**: PWA functionality and caching
- **MediaDevices API**: Microphone access for voice input

### Development Tools
- **Vite**: Development server and build tool
- **Drizzle Kit**: Database migrations and schema management
- **ESBuild**: Production bundling

## Deployment Strategy

### Development Environment
- Vite development server with hot module replacement
- Express.js server with middleware mode integration
- Environment variables: `VITE_GEMINI_API_KEY` or `GEMINI_API_KEY`

### Production Build
1. Frontend: Vite builds React app to `dist/public`
2. Backend: ESBuild bundles Express server to `dist/index.js`
3. Static assets served by Express with Vite middleware in development

### Render Deployment
- **Added**: Complete Render deployment configuration
- **Files**: render.yaml, .nvmrc, Procfile, .renderignore
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Environment**: Node.js 20, HTTPS enabled automatically
- **Documentation**: Comprehensive deployment guide in `deploy/` folder

### Database Configuration
- Drizzle ORM configured for PostgreSQL
- Connection via `DATABASE_URL` environment variable
- Fallback to in-memory storage for development/demo purposes
- Migration system ready via `npm run db:push`

### PWA Features
- Service worker for offline functionality
- Web app manifest for installability
- Icon assets (SVG format) for various device sizes
- Background sync capabilities for future enhancement
- HTTPS requirement met by Render for microphone access

The application is designed to work seamlessly across devices with a focus on accessibility and ease of use in educational environments. Ready for production deployment on Render without Docker.