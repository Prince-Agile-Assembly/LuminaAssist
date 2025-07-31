# Render Deployment Guide for Lumina

## Prerequisites

1. **GitHub Repository**: Push your Lumina project to a GitHub repository
2. **Gemini API Key**: Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
3. **Render Account**: Sign up at [render.com](https://render.com)

## Deployment Steps

### 1. Connect GitHub Repository

1. Log in to your Render dashboard
2. Click "New +" and select "Web Service"
3. Connect your GitHub account and select the Lumina repository
4. Choose the branch you want to deploy (usually `main` or `master`)

### 2. Configure Build Settings

Render will automatically detect the Node.js project. Verify these settings:

- **Environment**: `Node`
- **Build Command**: `npm install && npm run build && node deploy/post-build.js`
- **Start Command**: `npm start`
- **Node Version**: `20` (specified in `.nvmrc`)

### 3. Set Environment Variables

In the Render dashboard, add these environment variables:

**Required:**
- **GEMINI_API_KEY**: Your Google Gemini API key (current)
- **NODE_ENV**: `production`

**Recommended for Higher Quotas:**
- **DEEPSEEK_API_KEY**: DeepSeek V3 API key (much higher quotas)
- **HUGGINGFACE_API_KEY**: Hugging Face token (unlimited free)
- **MISTRAL_API_KEY**: Mistral AI key (high quotas)

> See `deploy/ai-providers-setup.md` for detailed setup instructions

### 4. Deploy

1. Click "Create Web Service"
2. Render will automatically build and deploy your application
3. The deployment process takes 5-10 minutes

### 5. Access Your App

Once deployed, your app will be available at:
`https://your-service-name.onrender.com`

## Configuration Files Included

- **render.yaml**: Render service configuration
- **.nvmrc**: Node.js version specification
- **Procfile**: Process file for deployment
- **package.json**: Updated with production build scripts

## Post-Deployment

### Test Features
- Voice recognition (requires HTTPS for microphone access)
- AI responses from Gemini
- PWA installation
- Theme switching
- Multi-language support

### Monitoring
- Check logs in Render dashboard for any issues
- Monitor performance and response times
- Set up health checks (already configured)

## Troubleshooting

### Common Issues

1. **Microphone not working**: 
   - Voice recognition requires HTTPS (automatically provided by Render)
   - User must grant microphone permissions

2. **API errors**:
   - Verify GEMINI_API_KEY is correctly set
   - Check API quota and usage limits

3. **Build failures**:
   - Check Node.js version compatibility
   - Verify all dependencies are in package.json
   
4. **White screen after deployment**:
   - Ensure the post-build script runs successfully
   - Check that static files are properly symlinked from public/ to dist/public/

4. **PWA not installing**:
   - HTTPS is required (provided by Render)
   - Check manifest.json is accessible

### Performance Optimization

- Render free tier includes:
  - 512 MB RAM
  - 0.1 CPU
  - Sleeps after 15 minutes of inactivity
  
- For production use, consider upgrading to a paid plan for:
  - No sleep mode
  - More resources
  - Custom domains
  - SSL certificates

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| GEMINI_API_KEY | Yes | Google Gemini API key for AI responses |
| NODE_ENV | Yes | Set to 'production' for deployment |
| PORT | No | Automatically set by Render |

## Support

If you encounter issues:
1. Check Render logs for error messages
2. Verify environment variables are set correctly
3. Test API key independently
4. Contact Render support for platform-specific issues