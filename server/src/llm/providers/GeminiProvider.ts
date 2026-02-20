import { Message } from '@/schemas/chatSchema';
import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { ILlmProvider, LlmConfig } from '../ILlmProvider';
import { PromptUtils } from '../PromptUtils';

export default class GeminiProvider implements ILlmProvider {
  private model: GenerativeModel;

  constructor(llmConfig: LlmConfig) {
    const genAi = new GoogleGenerativeAI(llmConfig.apiKey as string);

    this.model = genAi.getGenerativeModel({
      model: llmConfig.modelName,
      systemInstruction: PromptUtils.buildSystemInstructions()
    });
  }

  public async generateContent(
    userPrompt: string,
    history: Message[],
    context: string
  ): Promise<string> {
    const prompt = PromptUtils.buildStrictPrompt(
      userPrompt,
      context,
      PromptUtils.mapHistoryToString(history)
    );

    const aiContent = await this.model.generateContent(prompt);
    return aiContent.response.text();
  }
}
