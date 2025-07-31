import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { AI_PROVIDERS, getSystemPrompt } from "./ai-providers";

export async function registerRoutes(app: Express): Promise<Server> {
  // Smart AI API route with multiple providers and automatic fallback
  app.post("/api/ai", async (req, res) => {
    try {
      const { question, language = 'en' } = req.body;
      
      if (!question) {
        return res.status(400).json({ error: 'Question is required' });
      }

      // Priority order: DeepSeek -> Gemini -> Hugging Face -> Mistral
      const providerPriority = ['deepseek', 'gemini', 'huggingface', 'mistral'];
      
      for (const providerId of providerPriority) {
        try {
          const response = await tryProvider(providerId, question, language);
          if (response) {
            console.log(`✅ AI Response from ${AI_PROVIDERS[providerId].name}`);
            return res.json({ 
              response,
              provider: AI_PROVIDERS[providerId].name,
              quotaStatus: AI_PROVIDERS[providerId].quotaLimits
            });
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          console.log(`❌ ${AI_PROVIDERS[providerId].name} failed:`, errorMessage);
          continue; // Try next provider
        }
      }

      // If all providers fail, return error
      res.status(500).json({ 
        error: 'All AI providers are currently unavailable. Please try again later.',
        availableProviders: Object.keys(AI_PROVIDERS).map(key => AI_PROVIDERS[key].name)
      });

    } catch (error) {
      console.error('AI API Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Legacy Gemini endpoint for backward compatibility
  app.post("/api/gemini", async (req, res) => {
    const { question, language = 'en' } = req.body;
    try {
      const response = await tryProvider('gemini', question, language);
      res.json({ response });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('Gemini API Error:', error);
      res.status(500).json({ error: errorMessage });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

async function tryProvider(providerId: string, question: string, language: string): Promise<string | null> {
  const provider = AI_PROVIDERS[providerId];
  if (!provider) return null;

  // Get API key based on provider
  const apiKeyMap: Record<string, string> = {
    deepseek: process.env.DEEPSEEK_API_KEY || '',
    gemini: process.env.GEMINI_API_KEY || '',
    huggingface: process.env.HUGGINGFACE_API_KEY || 'hf_demo', // HF has free tier
    mistral: process.env.MISTRAL_API_KEY || ''
  };

  const apiKey = apiKeyMap[providerId];
  
  // Skip if no API key (except HuggingFace which has free tier)
  if (!apiKey && providerId !== 'huggingface') {
    throw new Error(`${provider.name} API key not found`);
  }

  const systemPrompt = getSystemPrompt(language);
  const requestBody = provider.formatRequest(question, systemPrompt);
  
  // Special handling for Gemini endpoint format
  let endpoint = provider.endpoint;
  if (providerId === 'gemini') {
    endpoint = `${provider.endpoint}?key=${apiKey}`;
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: provider.headers(apiKey),
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => response.statusText);
    throw new Error(`HTTP ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  return provider.parseResponse(data);
}
