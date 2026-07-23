import { Injectable, Logger } from '@nestjs/common';
import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Anthropic from '@anthropic-ai/sdk';

type AIProvider = 'openai' | 'gemini' | 'anthropic';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private readonly provider: AIProvider;
  
  private openai?: OpenAI;
  private gemini?: GoogleGenerativeAI;
  private anthropic?: Anthropic;

  constructor() {
    this.provider = (process.env.AI_PROVIDER as AIProvider) || 'openai';
    
    if (this.provider === 'openai' && process.env.OPENAI_API_KEY) {
      this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    } else if (this.provider === 'gemini' && process.env.GEMINI_API_KEY) {
      this.gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    } else if (this.provider === 'anthropic' && process.env.ANTHROPIC_API_KEY) {
      this.anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    }
  }

  async summarizeCommunity(description: string, platform: string, rawData: string): Promise<string> {
    const prompt = `Summarize this ${platform} community description into a short, engaging 2-sentence summary:
    Description: ${description}
    Raw Context: ${rawData}`;

    try {
      switch (this.provider) {
        case 'openai':
          if (!this.openai) throw new Error("OpenAI key not set");
          const oRes = await this.openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }]
          });
          return oRes.choices[0].message.content || "";

        case 'gemini':
          if (!this.gemini) throw new Error("Gemini key not set");
          const model = this.gemini.getGenerativeModel({ model: "gemini-1.5-flash" });
          const gRes = await model.generateContent(prompt);
          return gRes.response.text();

        case 'anthropic':
          if (!this.anthropic) throw new Error("Anthropic key not set");
          const aRes = await this.anthropic.messages.create({
            model: "claude-3-haiku-20240307",
            max_tokens: 150,
            messages: [{ role: "user", content: prompt }]
          });
          return aRes.content[0].type === 'text' ? aRes.content[0].text : "";

        default:
          return "AI Summary is currently unavailable.";
      }
    } catch (error) {
      this.logger.error(`AI Summary failed: ${error.message}`);
      return "Community description available.";
    }
  }

  async generateTags(description: string): Promise<string[]> {
    const prompt = `Extract 3 to 5 relevant tags from this description. Output only a comma separated list of tags. Description: ${description}`;
    
    try {
      let resultText = "";
      if (this.provider === 'openai' && this.openai) {
        const res = await this.openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: prompt }]
        });
        resultText = res.choices[0].message.content || "";
      } else if (this.provider === 'gemini' && this.gemini) {
        const res = await this.gemini.getGenerativeModel({ model: "gemini-1.5-flash" }).generateContent(prompt);
        resultText = res.response.text();
      } else if (this.provider === 'anthropic' && this.anthropic) {
        const res = await this.anthropic.messages.create({
          model: "claude-3-haiku-20240307",
          max_tokens: 50,
          messages: [{ role: "user", content: prompt }]
        });
        resultText = res.content[0].type === 'text' ? res.content[0].text : "";
      }
      
      return resultText.split(',').map(t => t.trim()).filter(Boolean);
    } catch (error) {
      this.logger.error(`Tag generation failed: ${error.message}`);
      return [];
    }
  }
}
