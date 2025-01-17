'use client';

import React, { Suspense } from 'react';
import { Search, Upload, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import Loading from './loading';

const HomeContent = () => {
    const searchParams = useSearchParams();
    const errorparams = searchParams.get('error');

    return (
        <div className="bg-gradient-to-b from-green-100 to-white p-4 pb-[112px]">
            <header className="mt-8 w-full max-w-4xl">
                <h1 className="text-center text-3xl font-bold text-green-800">
                    ReUse Pass へようこそ
                </h1>
                <p className="mt-2 text-center text-gray-600">
                    あなたの不要品が誰かの宝物に
                </p>
            </header>

            <main className="flex w-full max-w-4xl flex-grow flex-col items-center justify-center space-y-6">
                {errorparams === 'unsupported_browser' && (
                    <div className="mt-4 flex flex-col items-center space-x-2 space-y-2 rounded-md border-2 border-red-500 bg-red-300 p-3 text-black">
                        <div className="flex items-center space-x-2">
                            <AlertCircle className="h-5 w-5" />
                            <p className="text-sm">
                                なるべくGoogle Chrome で開いてください
                            </p>
                        </div>
                        <Link
                            href="https://www.google.com/intl/ja_jp/chrome/"
                            className="underline"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Google Chrome をダウンロード
                        </Link>
                    </div>
                )}
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle className="text-center text-xl">
                            アカウント
                        </CardTitle>
                        <CardDescription className="text-center">
                            サインアップまたはログインしてReUse
                            Passを始めましょう
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center space-x-4">
                        <Button
                            asChild
                            variant="default"
                        >
                            <Link href="/login">サインアップ or ログイン</Link>
                        </Button>
                    </CardContent>
                </Card>

                <Card className="w-full">
                    <CardHeader>
                        <CardTitle className="text-center text-xl">
                            主な機能
                        </CardTitle>
                        <CardDescription className="text-center">
                            アイテムを探すか出品しましょう
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col space-y-4">
                        <Button
                            asChild
                            className="h-14 w-full text-lg"
                            variant="outline"
                        >
                            <Link href="/search">
                                <Search className="mr-2 h-5 w-5" />
                                アイテムを探す
                            </Link>
                        </Button>
                        <Button
                            asChild
                            className="h-14 w-full text-lg"
                            variant="outline"
                        >
                            <Link href="/sell">
                                <Upload className="mr-2 h-5 w-5" />
                                アイテムを出品する
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
};

const Home = () => {
    return (
        <Suspense fallback={<Loading />}>
            <HomeContent />
        </Suspense>
    );
};

export default Home;
