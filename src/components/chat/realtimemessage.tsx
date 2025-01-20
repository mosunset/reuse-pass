'use client';
import { useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

interface ChatProps {
    buyId: number;
    userId: string;
}
const RealTileMessage = ({ buyId, userId }: ChatProps) => {
    const supabase = createClient();

    useEffect(() => {
        const channels = supabase
            .channel('custom-all-channel')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'Message',
                },
                (payload) => {
                    console.log('Change received!', payload);
                }
            )
            .subscribe();
        return () => {
            supabase.removeChannel(channels);
        };
    }, []);
    return <div>RealTileMessage</div>;
};

export default RealTileMessage;
