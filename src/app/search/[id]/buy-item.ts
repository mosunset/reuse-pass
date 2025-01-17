'use server';

import { CreateBuy } from '@/actions/buy';

interface BuyItemProps {
    buyerId: string;
    itemId: number;
}

export const BuyItem = ({ buyerId, itemId }: BuyItemProps) => {
    CreateBuy({
        data: {
            userid: buyerId,
            itemid: itemId,
            status: '',
        },
    });
};
