// AI Provider configurations for Lumina Academic Assistant
export interface AIProvider {
  name: string;
  endpoint: string;
  headers: (apiKey: string) => Record<string, string>;
  formatRequest: (prompt: string, systemPrompt: string) => any;
  parseResponse: (data: any) => string;
  supportsMultilingual: boolean;
  quotaLimits: string;
}

export const AI_PROVIDERS: Record<string, AIProvider> = {
  deepseek: {
    name: 'DeepSeek V3',
    endpoint: 'https://api.deepseek.com/chat/completions',
    headers: (apiKey: string) => ({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    }),
    formatRequest: (prompt: string, systemPrompt: string) => ({
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 1024
    }),
    parseResponse: (data: any) => {
      return data.choices?.[0]?.message?.content || 'Unable to generate response';
    },
    supportsMultilingual: true,
    quotaLimits: 'Very generous free tier'
  },

  huggingface: {
    name: 'Hugging Face',
    endpoint: 'https://api-inference.huggingface.co/models/microsoft/DialoGPT-large',
    headers: (apiKey: string) => ({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    }),
    formatRequest: (prompt: string, systemPrompt: string) => ({
      inputs: `${systemPrompt}\n\nUser: ${prompt}\nAssistant:`,
      parameters: {
        max_new_tokens: 512,
        temperature: 0.7,
        do_sample: true,
        return_full_text: false
      }
    }),
    parseResponse: (data: any) => {
      if (Array.isArray(data) && data[0]?.generated_text) {
        return data[0].generated_text.trim();
      }
      return 'Unable to generate response';
    },
    supportsMultilingual: true,
    quotaLimits: 'Unlimited free usage'
  },

  mistral: {
    name: 'Mistral AI',
    endpoint: 'https://api.mistral.ai/v1/chat/completions',
    headers: (apiKey: string) => ({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    }),
    formatRequest: (prompt: string, systemPrompt: string) => ({
      model: 'mistral-small-latest',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 1024
    }),
    parseResponse: (data: any) => {
      return data.choices?.[0]?.message?.content || 'Unable to generate response';
    },
    supportsMultilingual: true,
    quotaLimits: 'High free quotas'
  },

  gemini: {
    name: 'Gemini 1.5 Flash',
    endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent',
    headers: (apiKey: string) => ({
      'Content-Type': 'application/json'
    }),
    formatRequest: (prompt: string, systemPrompt: string) => ({
      contents: [{
        parts: [{
          text: `${systemPrompt}\n\nQuestion: ${prompt}`
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    }),
    parseResponse: (data: any) => {
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        return data.candidates[0].content.parts[0].text;
      }
      return 'Unable to generate response';
    },
    supportsMultilingual: true,
    quotaLimits: '15 RPM free, 2000 RPM paid'
  }
};

export function getSystemPrompt(language: string): string {
  const prompts: Record<string, string> = {
    'en': 'You are Lumina, a friendly and helpful assistant for college teachers. Answer concisely and clearly in English. Focus on educational content, teaching strategies, and academic guidance.',
    'hi': 'आप लुमिना हैं, कॉलेज के शिक्षकों के लिए एक मित्रवत और सहायक सहायक। हिंदी में संक्षेप में और स्पष्ट रूप से उत्तर दें। शैक्षणिक सामग्री, शिक्षण रणनीतियों और शैक्षणिक मार्गदर्शन पर ध्यान दें।',
    'ta': 'நீங்கள் லுமினா, கல்லூரி ஆசிரியர்களுக்கான நட்பு மற்றும் உதவிகரமான உதவியாளர். தமிழில் சுருக்கமாகவும் தெளிவாகவும் பதிலளிக்கவும். கல்வி உள்ளடக்கம், கற்பித்தல் உத்திகள் மற்றும் கல்வி வழிகாட்டுதலில் கவனம் செலுத்துங்கள்.',
    'te': 'మీరు లుమినా, కాలేజీ ఉపాధ్యాయులకు స్నేహపూర్వక మరియు సహాయక సహాయకుడు. తెలుగులో సంక్షిప్తంగా మరియు స్పష్టంగా సమాధానం ఇవ్వండి. విద్యా కంటెంట్, బోధనా వ్యూహాలు మరియు విద్యా మార్గదర్శకత్వంపై దృష్టి సారించండి.'
  };
  
  return prompts[language] || prompts['en'];
}