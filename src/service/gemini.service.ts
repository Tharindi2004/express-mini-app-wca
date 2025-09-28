import { APP_CONFIG } from "../config/app.config";
import { GoogleGenAI } from "@google/genai"
import { IMessageHistory } from "../dto/messageHistory.dto";

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

    public async generateReply(message: string, history: IMessageHistory[]): Promise<string> {
        try {
            const Chat = await this.gemini.chats.create({
                model: "gemini-2.5-flash",
                
                history: history,
            });
            const response = await Chat.sendMessage({
                message: message,

            });

            return response.text || 'Cannot generate reply';
            
           
        } catch (error) {
            console.log(error);
            return 'Cannot generate reply';


}
    }
}