import { Message } from '@/schemas/chatSchema';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ILlmProvider, LlmConfig, LlmResponse } from '../ILlmProvider';

export default class GeminiProvider implements ILlmProvider {
  private client: GoogleGenerativeAI;
  private llmConfig: LlmConfig;

  constructor(llmConfig: LlmConfig) {
    this.llmConfig = llmConfig;
    this.client = new GoogleGenerativeAI(llmConfig.apiKey as string);
  }

  public async generateContent(messages: Message[]): Promise<LlmResponse> {
    const systemInstructions = messages.filter(m => m.role === 'system');
    const otherMessages = messages.filter(m => m.role !== 'system');

    const prompt = otherMessages.map(m => `${m.role}: ${m.content}`).join('\n');

    const model = this.client.getGenerativeModel({
      model: this.llmConfig.modelName,
      systemInstruction: systemInstructions.map(m => m.content).join('\n')
    });

    const aiContent = await model.generateContent(prompt);

    return {
      aiResponse: aiContent.response.text(),
      provider: this.llmConfig.type,
      modelName: this.llmConfig.modelName
    };
  }

  public getLlmModel(): string {
    return this.llmConfig.modelName;
  }
}
