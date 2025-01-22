import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { GetUserByUserId } from '@/actions/users';
import HeroiconsSolidCamera from '@/icons/HeroiconsSolidCamera';
import HeroiconsSolidHome from '@/icons/HeroiconsSolidHome';
import HeroiconsSolidMagnifyingGlass from '@/icons/HeroiconsSolidMagnifyingGlass';
import { createClient } from '@/utils/supabase/server';
import Ad from './ad';

const Footer = async () => {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser();
 
    const user = data?.user ? await GetUserByUserId(data.user.id) : null;
    return (
        <>
            {!user?.premium && (
                <div className="fixed bottom-[100px] z-50 block w-full min-w-[316px] max-w-[700px]">
                    <div className="mb-4 max-h-40 overflow-auto text-center text-sm text-slate-500">
                        <Ad />
                    </div>
                </div>
            )}
            <footer className="fixed bottom-0 mt-4 block w-full min-w-[316px] max-w-[700px] bg-slate-200 p-4 pt-6">
                <div className="flex justify-around">
                    <Link href="/search">
                        <div className="flex min-w-[80px] flex-col items-center">
                            <HeroiconsSolidMagnifyingGlass className="!h-8 !w-8" />
                            <div>検索</div>
                        </div>
                    </Link>
                    <Link href="/sell">
                        <div className="flex min-w-[80px] flex-col items-center">
                            <HeroiconsSolidCamera className="!h-8 !w-8" />
                            <div>出品</div>
                        </div>
                    </Link>
                    <Link href="/mypage">
                        <div className="flex min-w-[80px] flex-col items-center">
                            <HeroiconsSolidHome className="!h-8 !w-8" />
                            <div>マイページ</div>
                        </div>
                    </Link>
                </div>
            </footer>
        </>
    );
};

export default Footer;
