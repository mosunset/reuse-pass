import { redirect } from 'next/navigation';
import { GetMessageBybuyIds } from '@/actions/chat';
import { createClient } from '@/utils/supabase/server';
import { MyComponent } from './my-chat';
import RealTileMessage from './realtimemessage';
import { YourComponent } from './your-chat';

interface ChatProps {
    buyId: number;
    userId: string;
}

export const History = async ({ buyId, userId }: ChatProps) => {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        redirect('/login');
    }
    const messages = await GetMessageBybuyIds(buyId);

    return (
        <div className="pt-4">
            <div className="w-full space-y-4">
                {messages.map((message) =>
                    message.senderId === userId ? (
                        <MyComponent
                            key={message.id}
                            message={message.content}
                            email={data.user.email || ''}
                            src=""
                            createdAt={message.createdAt}
                        />
                    ) : (
                        <YourComponent
                            key={message.id}
                            message={message.content}
                            email={data.user.email || ''}
                            src=""
                            createdAt={message.createdAt}
                        />
                    )
                )}
                <RealTileMessage
                    buyId={buyId}
                    userId={userId}
                />
            </div>
        </div>
    );
};
