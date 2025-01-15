import React from 'react';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import GetAll from './_components/get-all';

const Page = async () => {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        redirect('/login');
    }
    return (
        <main className="p-4">
            <h1 className="mb-4 w-full text-center text-2xl">検索</h1>
            <div>
                <GetAll />
            </div>
        </main>
    );
};

export default Page;
