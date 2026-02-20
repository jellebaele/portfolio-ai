import { config } from '@/config';
import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { ILlmProvider } from '../ILlmProvider';

export default class GeminiProvider implements ILlmProvider {
  private model: GenerativeModel;

  constructor(systemInstruction: string) {
    const genAi = new GoogleGenerativeAI(config.llm.apiKey as string);

    this.model = genAi.getGenerativeModel({
      model: config.llm.primaryModel,
      systemInstruction: systemInstruction
    });
  }
  async generateContent(prompt: string): Promise<string> {
    const aiContent = await this.model.generateContent(prompt);
    return aiContent.response.text();
  }
}
