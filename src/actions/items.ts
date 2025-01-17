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

/**
 *
 * @param limit
 * @returns
 */
export const GetAllItems = async (limit: number = 0) => {
    try {
        const items = await db.items.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            ...(limit > 0 && { take: limit }),
        });
        return items;
    } catch (error) {
        throw new Error(`エラーが発生しました: ${error}`);
    }
};

export const GetItemById = async (id: number) => {
    try {
        const item = await db.items.findUnique({
            where: {
                id,
            },
        });
        return item;
    } catch (error) {
        throw new Error(`エラーが発生しました: ${error}`);
    }
};
