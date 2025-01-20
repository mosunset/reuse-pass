'use client';

import { useState } from 'react';
import { Send as SendIcon, X } from 'lucide-react';
import { CreateMessage } from '@/actions/chat';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ChatProps {
    buyId: number;
    userId: string;
}

export const Send = ({ buyId, userId }: ChatProps) => {
    const [value, setValue] = useState('');

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            CreateMessage({
                data: {
                    content: value,
                    buyId,
                    senderId: userId,
                },
            });
            setValue(''); // 送信後に入力値をクリア
        } catch (error) {
            console.error('メッセージの送信に失敗しました:', error);
        }
    };

    const onClear = () => {
        setValue('');
    };
    return (
        <form
            onSubmit={onSubmit}
            className="relative flex w-full items-center"
        >
            <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Type here..."
                className="mr-[1px] rounded-r-none bg-background focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
            />
            {value && (
                <X
                    onClick={onClear}
                    className="absolute right-14 top-2.5 h-5 w-5 cursor-pointer text-muted-foreground transition hover:opacity-75"
                />
            )}
            <Button
                type="submit"
                size="sm"
                variant="secondary"
                className="rounded-l-none"
            >
                <SendIcon className="h-5 w-5 text-muted-foreground" />
            </Button>
        </form>
    );
};
