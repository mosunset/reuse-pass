'use server';

import { Message } from '@prisma/client'; // Prisma ClientからMessage型をインポート
import { db } from '@/lib/db'; // データベース接続をインポート

export interface CreateMessageProps {
    data: Omit<Message, 'id' | 'createdAt' | 'updatedAt'>;
}

export const CreateMessage = ({ data }: CreateMessageProps) => {
    try {
        const message = db.message.create({
            data: {
                ...data,
            },
        });
        return message;
    } catch (error) {
        throw new Error(`エラーが発生しました: ${error}`);
    }
};

export const GetMessageBybuyIds = async (buyId: number) => {
    try {
        const message = await db.message.findMany({
            where: {
                buyId,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return message;
    } catch (error) {
        throw new Error(`エラーが発生しました: ${error}`);
    }
};
