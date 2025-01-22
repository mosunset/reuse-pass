import Link from 'next/link';
import { redirect } from 'next/navigation';
import { GetUserByUserId } from '@/actions/users';
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

    const user = await GetUserByUserId(data?.user.id);

    return (
        <main className="p-4 pb-[112px]">
            <h1 className="mb-4 w-full text-center text-2xl">My Page</h1>
            <div className="flex items-center space-x-4">
                <Avatar>
                    <AvatarImage
                        src={user?.icon ?? undefined}
                        alt={user?.name}
                    />
                    <AvatarFallback>{user?.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="mx-auto flex flex-col">
                    <div>{user?.name}</div>
                    <div>{data.user.email}</div>
                </div>
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
                        <Link href={'/mypage/items'}>出品物一覧</Link>
                    </Button>
                </div>
                <div>
                    <Button
                        variant={'outline'}
                        asChild
                    >
                        <Link href={'/buy'}>購入履歴</Link>
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
