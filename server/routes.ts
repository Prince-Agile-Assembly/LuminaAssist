import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Gemini AI API route
  app.post("/api/gemini", async (req, res) => {
    try {
      const { question, language = 'en' } = req.body;
      
      if (!question) {
        return res.status(400).json({ error: 'Question is required' });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      
      if (!apiKey) {
        return res.status(500).json({ 
          error: 'Gemini API key not found. Please add GEMINI_API_KEY to your environment variables.' 
        });
      }

      const systemPrompt = getSystemPrompt(language);
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `${systemPrompt}\n\nQuestion: ${question}`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: { message: response.statusText } }));
        throw new Error(errorData.error?.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        const text = data.candidates[0].content.parts[0].text;
        res.json({ response: text || 'I apologize, but I was unable to generate a response. Please try again.' });
      } else {
        throw new Error('Invalid response format from Gemini API');
      }
    } catch (error) {
      console.error('Gemini API Error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to connect to Gemini API';
      res.status(500).json({ error: errorMessage });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

function getSystemPrompt(language: string): string {
  const prompts: Record<string, string> = {
    'en': 'You are Lumina, a friendly and helpful assistant for college teachers. Answer concisely and clearly in English. Focus on educational content, teaching strategies, and academic guidance.',
    'hi': 'आप लुमिना हैं, कॉलेज के शिक्षकों के लिए एक मित्रवत और सहायक सहायक। हिंदी में संक्षेप में और स्पष्ट रूप से उत्तर दें। शैक्षणिक सामग्री, शिक्षण रणनीतियों और शैक्षणिक मार्गदर्शन पर ध्यान दें।',
    'ta': 'நீங்கள் லுமினா, கல்லூரி ஆசிரியர்களுக்கான நட்பு மற்றும் உதவிகரமான உதவியாளர். தமிழில் சுருக்கமாகவும் தெளிவாகவும் பதிலளிக்கவும். கல்வி உள்ளடக்கம், கற்பித்தல் உத்திகள் மற்றும் கல்வி வழிகாட்டுதலில் கவனம் செலுத்துங்கள்.',
    'te': 'మీరు లుమినా, కాలేజీ ఉపాధ్యాయులకు స్నేహపూర్వక మరియు సహాయక సహాయకుడు. తెలుగులో సంక్షిప్తంగా మరియు స్పష్టంగా సమాధానం ఇవ్వండి. విద్యా కంటెంట్, బోధనా వ్యూహాలు మరియు విద్యా మార్గదర్శకత్వంపై దృష్టి సారించండి.'
  };
  
  return prompts[language] || prompts['en'];
}
