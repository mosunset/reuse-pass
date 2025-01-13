import { redirect } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { createClient } from '@/utils/supabase/server';
import SignOutButton from './_components/sign-out-button';

const Page = async () => {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        redirect('/login');
    }
    return (
        <main className="container p-4">
            <h1>My Page</h1>
            <Avatar>
                <AvatarImage
                    src=""
                    alt={data.user.email}
                />
                <AvatarFallback>{data.user.email?.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div>{data.user.email}</div>
            <div>
                <SignOutButton />
            </div>
        </main>
    );
};

export default Page;
