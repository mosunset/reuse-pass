'use client';

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

export default function LoginPage() {
    const searchParams = useSearchParams();
    const error = searchParams.get('error'); // クエリパラメータ "error" を取得
    const errormessage = 'メールアドレスまたはパスワードが間違っています。';

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">
                        ReUse Pass
                    </CardTitle>
                    <CardDescription>Login or Sign up</CardDescription>
                </CardHeader>
                <form>
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
                        {error === '' && (
                            <Alert variant="destructive">
                                <AlertDescription>
                                    {errormessage}
                                </AlertDescription>
                            </Alert>
                        )}
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button
                            formAction={login}
                            type="submit"
                            variant="outline"
                        >
                            Log in
                        </Button>
                        <Button
                            formAction={signup}
                            type="submit"
                        >
                            Sign up
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
