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

export const GetBuyByitemId = async (itemid: number) => {
    try {
        const item = await db.buy.findUnique({
            where: {
                itemid,
            },
        });
        return item;
    } catch (error) {
        throw new Error(`エラーが発生しました: ${error}`);
    }
};

// userid で購入した商品をすべて取得
export const GetBuyByUserIds = async (userid: string) => {
    try {
        const items = await db.buy.findMany({
            where: {
                userid,
            },
            include: {
                item: true, // 関連する Item を含める
            },
        });
        return items;
    } catch (error) {
        throw new Error(`エラーが発生しました: ${error}`);
    }
};
