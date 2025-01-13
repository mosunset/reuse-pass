import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { SignOut } from '@/actions/sign-out';

const Page = () => {
    SignOut();
    revalidatePath('/', 'layout');
    redirect('/');
};

export default Page;
