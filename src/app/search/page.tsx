import React from 'react';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { Search } from './_components/search';
import SearchCards from './_components/search-result-cards';

const Page = async ({
    searchParams,
}: {
    searchParams: { keyword?: string };
}) => {
    // ユーザー認証
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        redirect('/login');
    }

    return (
        <main className="p-4 pb-[112px]">
            <h1 className="mb-4 w-full text-center text-2xl">検索</h1>
            <Search />
            <div className="mt-4">
                <SearchCards keyword={searchParams.keyword || ''} />
            </div>
        </main>
    );
};

export default Page;
