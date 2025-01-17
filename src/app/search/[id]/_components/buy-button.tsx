'use client';

import { Items } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { BuyItem } from '../buy-item';

interface BuyButtonProps {
    id: string;
    item: Items;
}

const BuyButton = ({ id, item }: BuyButtonProps) => {
    return (
        <Button
            disabled={id === item.userid}
            onClick={() => BuyItem({ buyerId: id, itemId: item.id })}
        >
            購入
        </Button>
    );
};

export default BuyButton;
