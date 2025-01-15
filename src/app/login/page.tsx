'use client';
import { Suspense, useState } from 'react';
import { RotateCw } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
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
import { login, signup } from './actions';
import Loading from './loading';

export default function LoginPage() {
    return (
        <Suspense fallback={<Loading />}>
            <InnerLogin />
        </Suspense>
    );
}

function InnerLogin() {
    const searchParams = useSearchParams();
    const errorparams = searchParams.get('error');

    const [loading, setLoading] = useState(false);

    async function handleLogin(formData: FormData) {
        setLoading(true);
        try {
            await login(formData);
        } finally {
            setLoading(false);
        }
    }

    async function handleSignup(formData: FormData) {
        setLoading(true);
        try {
            await signup(formData);
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="container grid min-h-dvh content-center bg-gradient-to-b from-green-100 to-white">
            <div className="flex w-full justify-center p-4">
                <Card className="w-full max-w-md">
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
                                disabled={loading}
                            >
                                {loading ? (
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
                                disabled={loading}
                            >
                                {loading ? (
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
}
