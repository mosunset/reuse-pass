'use client';

import { useEffect, useState } from 'react';
import { updatePremium } from '@/actions/users';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

const PremiumDialog = ({
    className,
    id,
}: {
    className: string;
    id: string;
}) => {
    const [isPaid, setIsPaid] = useState(false);

    useEffect(() => {
        updatePremium({ userid: id, premium: isPaid });
    }, [id, isPaid]);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className={className}
                    style={{
                        background:
                            'linear-gradient(45deg, #B67B03 0%, #DAAF08 45%, #FEE9A0 70%, #DAAF08 85%, #B67B03 90% 100%)',
                    }}
                >
                    プレミアム課金
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>プレミアム課金</DialogTitle>
                    <DialogDescription>
                        プレミアム課金により、特典を受け取ることができます。
                        <br />
                        広告を非表示にすることができます。
                    </DialogDescription>
                </DialogHeader>
                <div
                    className="my-8 flex items-center justify-center space-x-2 py-4"
                    style={
                        isPaid
                            ? {
                                  background:
                                      'linear-gradient(45deg, #B67B03 0%, #DAAF08 45%, #FEE9A0 70%, #DAAF08 85%, #B67B03 90% 100%)',
                              }
                            : { background: 'inherit' }
                    }
                >
                    <Switch
                        id="payment-switch"
                        checked={isPaid}
                        onCheckedChange={setIsPaid}
                    />
                    <Label htmlFor="payment-switch">
                        {isPaid ? '課金' : '未課金'}
                    </Label>
                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button
                            type="button"
                            variant="secondary"
                        >
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default PremiumDialog;
