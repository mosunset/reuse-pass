'use server';

import { Items } from '@prisma/client'; // Prisma ClientからItems型をインポート
import { db } from '@/lib/db'; // データベース接続をインポート

export interface CreateItemProps {
    data: Omit<Items, 'id' | 'createdAt' | 'updatedAt'>;
}

export const CreateItem = ({ data }: CreateItemProps) => {
    try {
        const item = db.items.create({
            data: {
                ...data,
            },
        });
        return item;
    } catch (error) {
        throw new Error(`エラーが発生しました: ${error}`);
    }
};
