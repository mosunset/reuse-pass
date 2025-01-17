import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import GetUserItems from './_components/get-user-items';

const Page = async () => {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error || !data?.user) {
        redirect('/login');
    }

    return (
        <main className="p-4 pb-[112px]">
            <h1 className="mb-4 w-full text-center text-2xl">出品物一覧</h1>
            <GetUserItems userid={data.user.id} />
        </main>
    );
};

export default Page;
