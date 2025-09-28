import { IMessage, Message } from "../model/message.model";

export class MessageDao {
    private static instance: MessageDao;
    public static getInstance(): MessageDao {
        if (!MessageDao.instance) {
            MessageDao.instance = new MessageDao();
        }
        return MessageDao.instance;
    }

    private constructor() {


    }

    public async createMessage(message: IMessage): Promise<IMessage> {
        try{
        const newMessage = new Message(message);
        return await newMessage.save();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public async bulkCreateMessages(messages: IMessage[]): Promise<IMessage[]> {
        try{
            return await Message.insertMany(messages);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public async getMessagesByUserId(userId: string): Promise<IMessage[]> {
        try {
            return await Message.find({ userId: userId })
            .sort({ createdAt: 1 })
            .limit(5)
            .lean()
            .exec();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}