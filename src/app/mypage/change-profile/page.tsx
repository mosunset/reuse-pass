import { redirect } from 'next/navigation';
import { GetUserByUserId } from '@/actions/users';
import { createClient } from '@/utils/supabase/server';
import ChangeProfile from './_components/change-profile';

const Page = async () => {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        redirect('/login');
    }

    const user = await GetUserByUserId(data?.user.id);
    return (
        <main className="p-4 pb-[112px]">
            <h1 className="mb-4 w-full text-center text-2xl">
                プロフィール変更
            </h1>
            <div>
                <ChangeProfile
                    id={data?.user.id}
                    name={user?.name || ''}
                    bio={user?.bio || ''}
                />
            </div>
        </main>
    );
};

export default Page;
