'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export async function login(formData: FormData) {
    const supabase = await createClient();

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    };

    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
        // redirect('/error');
        redirect('/login?error');
    }

    revalidatePath('/', 'layout');
    revalidatePath('/search', 'layout');
    redirect('/search');
}

export async function signup(formData: FormData) {
    const supabase = await createClient();

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    };

    const { error } = await supabase.auth.signUp(data);

    if (error) {
        if (error.code === 'user_already_exists') {
            // 既にサインアップされている場合、ログイン処理を実行
            const { error: signInError } =
                await supabase.auth.signInWithPassword({
                    email: data.email,
                    password: data.password,
                });

            if (signInError) {
                redirect('/login?error');
            } else {
                revalidatePath('/', 'layout');
                revalidatePath('/search', 'layout');
                redirect('/search');
            }
        } else {
            // その他のエラーの場合、ログインページにリダイレクト
            redirect('/login?error');
        }
    } else {
        revalidatePath('/', 'layout');
        revalidatePath('/search', 'layout');
        redirect('/search');
    }
}
