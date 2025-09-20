import { APP_CONFIG } from "../config/app.config";
import { GoogleGenAI } from "@google/genai"

export class GeminiService {

    private geminiApiKey: string;
    private gemini : GoogleGenAI;

    private static instance: GeminiService;

    public static getInstance(): GeminiService {
        if (!GeminiService.instance) {
            GeminiService.instance = new GeminiService();
        }   
        return GeminiService.instance;
    }

    private constructor() {
        this.geminiApiKey = APP_CONFIG.GEMINI_API_KEY || '';
        this.gemini = new GoogleGenAI({});

    }

    public async generateReply(message: string): Promise<string> {
        try {
            const response = await this.gemini.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: message,
            });
            return response.text || 'Cannot generate reply';
        } catch (error) {
            console.log(error);
            return 'Cannot generate reply';


}
    }
}