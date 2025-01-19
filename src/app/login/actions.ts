'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
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

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    };

    const { data: authData, error } = await supabase.auth.signUp(data);

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
            redirect('/login?error');
        }
    }

    // authData.userからユーザー情報を取得
    if (authData?.user) {
        try {
            await db.user.create({
                data: {
                    userid: authData.user.id, // authのユーザーID
                    name: (formData.get('name') as string) || '無名のユーザ', // デフォルト名
                    bio: 'よろしくお願いします', // デフォルトの自己紹介
                    icon: '/KUT_logo.gif', // デフォルトのアイコン
                },
            });
        } catch (userError) {
            redirect('/login?error=user_table_error');
        }
    }

    revalidatePath('/', 'layout');
    revalidatePath('/search', 'layout');
    redirect('/search');
}
