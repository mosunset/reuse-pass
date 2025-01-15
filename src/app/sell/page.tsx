import React from 'react';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import SellForm from './_components/form';

const Page = async () => {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        redirect('/login');
    }
    return (
        <main className="container p-4">
            <h1 className="mb-4 w-full text-center text-2xl">出品</h1>
            <SellForm userid={data.user.id} />
        </main>
    );
};

export default Page;
