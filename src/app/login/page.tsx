'use client';
import { Suspense, useTransition } from 'react';
import { AlertCircle, RotateCw } from 'lucide-react';
import Link from 'next/link';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { login, signup } from './actions';
import Loading from './loading';

export default function LoginPage({
    searchParams,
}: {
    searchParams: { error: string };
}) {
    return (
        <Suspense fallback={<Loading />}>
            <InnerLogin error={searchParams.error} />
        </Suspense>
    );
}

const InnerLogin = ({ error }: { error: string }) => {
    const errorparams = error;

    const [isPending, startTransition] = useTransition();

    async function handleLogin(formData: FormData) {
        startTransition(async () => {
            await login(formData);
        });
    }

    async function handleSignup(formData: FormData) {
        startTransition(async () => {
            await signup(formData);
        });
    }

    return (
        <main className="grid min-h-dvh w-full content-center bg-gradient-to-b from-green-100 to-white">
            <div className="mx-auto max-w-xl">
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
            </div>
            <div className="flex w-full justify-center p-4">
                <Card
                    className={cn(
                        'w-full max-w-md',
                        errorparams === 'unsupported_browser' &&
                            'border-2 border-red-500'
                    )}
                >
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold">
                            ReUse Pass
                        </CardTitle>
                        <CardDescription>Login or Sign up</CardDescription>
                    </CardHeader>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleLogin(new FormData(e.currentTarget));
                        }}
                    >
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">
                                    Password
                                    <span className="pl-6 text-muted-foreground">
                                        6文字以上
                                    </span>
                                </Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                />
                            </div>
                            {errorparams === '' && (
                                <Alert variant="destructive">
                                    <AlertDescription>
                                        メールアドレスまたはパスワードが間違っています。
                                    </AlertDescription>
                                </Alert>
                            )}
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button
                                type="button"
                                onClick={() =>
                                    handleLogin(
                                        new FormData(
                                            document.querySelector('form')!
                                        )
                                    )
                                }
                                variant="outline"
                                disabled={isPending}
                            >
                                {isPending ? (
                                    <div className="flex items-center space-x-2">
                                        <RotateCw className="animate-spin" />
                                        <div>Loading</div>
                                    </div>
                                ) : (
                                    'Log in'
                                )}
                            </Button>
                            <Button
                                type="button"
                                onClick={() =>
                                    handleSignup(
                                        new FormData(
                                            document.querySelector('form')!
                                        )
                                    )
                                }
                                disabled={isPending}
                            >
                                {isPending ? (
                                    <div className="flex items-center space-x-2">
                                        <RotateCw className="animate-spin" />
                                        <div>Loading</div>
                                    </div>
                                ) : (
                                    'Sign up'
                                )}
                            </Button>
                        </CardFooter>
                    </form>
                    <CardFooter className="flex justify-center">
                        <Button
                            asChild
                            variant="link"
                            className=""
                        >
                            <Link href="/">Topページに戻る</Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </main>
    );
};
