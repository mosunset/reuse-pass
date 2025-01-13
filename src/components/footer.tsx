import React from 'react';
import Link from 'next/link';
import HeroiconsSolidCamera from '@/icons/HeroiconsSolidCamera';
import HeroiconsSolidHome from '@/icons/HeroiconsSolidHome';
import HeroiconsSolidMagnifyingGlass from '@/icons/HeroiconsSolidMagnifyingGlass';

const Footer = () => {
    return (
        <footer className="fixed bottom-0 mt-4 block w-full max-w-[700px] bg-slate-200 p-4 pt-6">
            <div className="flex justify-around">
                <Link href="/search">
                    <div className="flex min-w-[80px] flex-col items-center">
                        <HeroiconsSolidMagnifyingGlass className="!h-8 !w-8" />
                        <div>検索</div>
                    </div>
                </Link>
                <Link href="/create">
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
    );
};

export default Footer;
