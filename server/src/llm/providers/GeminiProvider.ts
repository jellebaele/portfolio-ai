import { Message } from '@/schemas/chatSchema';
import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { ILlmProvider, LlmConfig, LlmResponse } from '../ILlmProvider';
import { PromptUtils } from '../PromptUtils';

export default class GeminiProvider implements ILlmProvider {
  private model: GenerativeModel;
  private llmConfig: LlmConfig;

  constructor(llmConfig: LlmConfig) {
    this.llmConfig = llmConfig;
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
  ): Promise<LlmResponse> {
    const prompt = PromptUtils.buildStrictPrompt(
      userPrompt,
      context,
      PromptUtils.mapHistoryToString(history)
    );

    const aiContent = await this.model.generateContent(prompt);
    return {
      aiResponse: aiContent.response.text(),
      provider: this.llmConfig.type,
      modelName: this.llmConfig.modelName
    };
  }
}
