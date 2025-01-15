import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/server';
import SignOutButton from './_components/sign-out-button';

const Page = async () => {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        redirect('/login');
    }

    return (
        <main className="p-4">
            <h1 className="mb-4 w-full text-center text-2xl">My Page</h1>
            <div className="flex items-center space-x-4">
                <Avatar>
                    <AvatarImage
                        src=""
                        alt={data.user.email}
                    />
                    <AvatarFallback>
                        {data.user.email?.slice(0, 2)}
                    </AvatarFallback>
                </Avatar>
                <div>{data.user.email}</div>
            </div>
            <div className="[&>div]:my-4">
                <div>
                    <Button
                        variant={'outline'}
                        asChild
                    >
                        <Link href={'/mypage/change-profile'}>
                            プロフィール変更
                        </Link>
                    </Button>
                </div>
                <div>
                    <Button
                        variant={'outline'}
                        asChild
                    >
                        <Link href={''}>出品物一覧</Link>
                    </Button>
                </div>
                <div>
                    <Button
                        variant={'outline'}
                        asChild
                    >
                        <Link href={''}>購入履歴</Link>
                    </Button>
                </div>
                <div>
                    <Button
                        variant={'outline'}
                        asChild
                    >
                        <Link href={''}>プレミアム課金</Link>
                    </Button>
                </div>
                <div>
                    <SignOutButton />
                </div>
            </div>
        </main>
    );
};

export default Page;
