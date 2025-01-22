import { redirect } from 'next/navigation';
import { GetUserByUserId } from '@/actions/users';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { createClient } from '@/utils/supabase/server';
import GetUserItems from './_components/get-user-items';

const Page = async ({ params }: { params: { id: string } }) => {
    // 自分だったら /mypage/items にリダイレクト
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        redirect('/login');
    }

    if (data?.user?.id === params.id) {
        redirect('/mypage/items');
    }

    const user = await GetUserByUserId(params.id);

    return (
        <main className="p-4 pb-[112px]">
            <h1 className="mb-4 flex w-full items-center justify-center gap-4 text-center text-2xl">
                <Avatar>
                    <AvatarImage
                        src={user?.icon ?? undefined}
                        alt={user?.name}
                    />
                    <AvatarFallback>{user?.name}</AvatarFallback>
                </Avatar>
                {user?.name} さん
            </h1>
            <div className="mb-4 w-full text-center text-2xl">出品物一覧</div>
            <GetUserItems userid={data.user.id} />
        </main>
    );
};

export default Page;
