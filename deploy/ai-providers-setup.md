# AI Providers Setup Guide for Lumina

Lumina now supports multiple AI providers with automatic fallback for maximum reliability and quota flexibility.

## 🚀 Provider Priority Order

The system automatically tries providers in this order:

1. **DeepSeek V3** (Primary) - Best for educational content, generous free tier
2. **Gemini 1.5 Flash** (Fallback) - Your current provider
3. **Hugging Face** (Backup) - Unlimited free usage for many models
4. **Mistral AI** (Final) - High quotas, excellent multilingual support

## 🔑 Getting API Keys

### 1. DeepSeek V3 (Recommended - Free)
**Why:** Best educational content, 100+ languages, generous quotas

**How to get:**
1. Go to [deepseek.com](https://www.deepseek.com/en)
2. Sign up with email or GitHub
3. Navigate to "API Keys" in dashboard
4. Click "Generate New Key"
5. Copy your API key

**Environment Variable:** `DEEPSEEK_API_KEY`

### 2. Hugging Face (Unlimited Free)
**Why:** Completely free, no quotas, 200+ models

**How to get:**
1. Go to [huggingface.co](https://huggingface.co)
2. Sign up for free account
3. Go to Settings → Access Tokens
4. Create "New token" with "Read" permission
5. Copy your token

**Environment Variable:** `HUGGINGFACE_API_KEY`

### 3. Mistral AI (High Quotas)
**Why:** Excellent for multilingual responses, fast inference

**How to get:**
1. Go to [console.mistral.ai](https://console.mistral.ai)
2. Sign up for free account
3. Navigate to "API Keys"
4. Create new API key
5. Copy your key

**Environment Variable:** `MISTRAL_API_KEY`

### 4. Gemini (Current)
You already have this configured as `GEMINI_API_KEY`

## 📊 Quota Comparison

| Provider | Free Tier | Best For | Languages |
|----------|-----------|----------|-----------|
| **DeepSeek V3** | Very generous | Educational, reasoning | 100+ |
| **Hugging Face** | Unlimited | Development, experiments | 50+ |
| **Mistral AI** | High quotas | Speed, multilingual | 100+ |
| **Gemini Flash** | 15 RPM | Real-time, multimodal | 100+ |

## 🔧 Render Deployment Setup

### Required Environment Variables:
- `DEEPSEEK_API_KEY` (Recommended for unlimited educational usage)
- `GEMINI_API_KEY` (Your current key - keep as fallback)
- `HUGGINGFACE_API_KEY` (Optional - provides free unlimited backup)
- `MISTRAL_API_KEY` (Optional - provides additional multilingual support)

### Setup Priority:
1. **Minimum Setup:** Keep your existing `GEMINI_API_KEY`
2. **Recommended:** Add `DEEPSEEK_API_KEY` for much higher quotas
3. **Maximum Reliability:** Add all keys for complete fallback chain

## ✅ Benefits of Multi-Provider Setup

- **No more quota issues:** Automatic fallback to different providers
- **Higher reliability:** If one service is down, others continue working
- **Cost optimization:** Uses free/cheap providers first
- **Better responses:** Each provider excels at different types of questions
- **Educational focus:** DeepSeek V3 specifically optimized for educational content

## 🧪 Testing Your Setup

You can test which provider is being used by checking the browser console:
```
🤖 Response from: DeepSeek V3 (Very generous free tier)
```

## 📈 Expected Performance Improvement

With DeepSeek as primary provider:
- **10x higher quotas** compared to Gemini free tier
- **Better educational responses** due to model optimization
- **Excellent multilingual support** for Hindi, Tamil, Telugu
- **Faster response times** for academic questions
- **No quota exhaustion** for typical teaching workloads

## 🛠️ Manual Provider Testing

You can test individual providers:

```bash
# Test DeepSeek
curl -X POST https://your-app.onrender.com/api/ai \
  -H "Content-Type: application/json" \
  -d '{"question": "Best teaching methods for mathematics", "language": "en"}'

# Response will show which provider was used
```

---

**Need help?** The system works with just your existing Gemini key, but adding DeepSeek will dramatically improve your quota limits for heavy usage.