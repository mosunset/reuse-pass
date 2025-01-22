import { redirect } from 'next/navigation';
import { GetUserItems } from '@/actions/items';
import { createClient } from '@/utils/supabase/server';

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

    // 他のユーザーのアイテムを取得

    GetUserItems(params.id);
    return <div>Page</div>;
};

export default Page;
