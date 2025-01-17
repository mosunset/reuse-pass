'use server';

import { Buy } from '@prisma/client'; // Prisma ClientからBuy型をインポート
import { db } from '@/lib/db'; // データベース接続をインポート

export interface CreateItemProps {
    data: Omit<Buy, 'id' | 'createdAt' | 'updatedAt'>;
}

export const CreateBuy = ({ data }: CreateItemProps) => {
    try {
        const item = db.buy.create({
            data: {
                ...data,
            },
        });
        return item;
    } catch (error) {
        throw new Error(`エラーが発生しました: ${error}`);
    }
};
