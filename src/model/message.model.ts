import mongoose from "mongoose";

export enum Role {
    USER = 'user',
    ASSISTANT = 'assistant',
    
}
export interface IMessage {
    userId: string;
    role: Role;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

export const MessageSchema = new mongoose.Schema ({
    userId: { type: String, required: true },
    role: { type: String, enum: Object.values(Role), required: true },
    content: { type: String, required: true },
},
 { timestamps: true

});

export const Message = mongoose.model<IMessage>('Message', MessageSchema);
