'use client';

import { useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { v4 as uuid } from 'uuid';
import { z } from 'zod';
import { updateUser } from '@/actions/users';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';
import { createClient } from '@/utils/supabase/client';

const formSchema = z.object({
    name: z
        .string()
        .min(3, { message: '名前は3文字以上で入力してください。' })
        .max(30, { message: '名前は30文字以内で入力してください。' }),
    bio: z
        .string()
        .min(1, { message: '自己紹介は1文字以上で入力してください。' })
        .max(140, { message: '自己紹介は140文字以内で入力してください。' }),
    photos: z
        .any()
        .transform((val) => (val instanceof FileList ? [val[0]] : []))
        .refine(
            (files) =>
                files.length <= 1 &&
                files.every((file: File) => file?.type?.startsWith('image/')),
            {
                message: '画像ファイルのみアップロードしてください。',
            }
        ),
});

interface ChangeProfileFormProps {
    id: string;
    name: string;
    bio: string;
}

const ChangeProfileForm = ({ id, name, bio }: ChangeProfileFormProps) => {
    const { toast } = useToast();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: name || '',
            bio: bio || '',
            photos: [],
        },
        mode: 'all',
    });

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // フォームの値を処理します。
        // ✅ これは型安全でバリデート済みです。

        startTransition(async () => {
            try {
                // Create Supabase client
                const supabase = createClient();
                // Upload photos to Supabase
                const uploadedPhotos = await Promise.all(
                    values.photos.map(async (file: File) => {
                        const fileExtension = file.name.split('.').pop();
                        const { data: uploadData, error: uploadError } =
                            await supabase.storage
                                .from('photos')
                                .upload(
                                    `${Date.now()}_${uuid()}.${fileExtension}`,
                                    file
                                );
                        if (uploadError) {
                            throw new Error(
                                `アップロードに失敗しました: ${uploadError.message}`
                            );
                        }
                        const url = supabase.storage
                            .from('photos')
                            .getPublicUrl(uploadData.path).data.publicUrl;
                        return url;
                    })
                );
                const formData = {
                    name: values.name,
                    bio: values.bio,
                    icon: uploadedPhotos[0],
                    userid: id,
                };
                try {
                    await updateUser(formData);
                    router.push(`/mypage`);
                } catch {
                    toast({
                        variant: 'destructive',
                        title: 'エラーが発生しました',
                        description:
                            'プロフィールの更新に失敗しました。もう一度お試しください。',
                        action: <ToastAction altText={'OK'}>OK</ToastAction>,
                    });
                }
            } catch {
                toast({
                    variant: 'destructive',
                    title: 'エラーが発生しました',
                    description:
                        '画像のアップロードに失敗しました。もう一度お試しください。',
                    action: <ToastAction altText={'OK'}>OK</ToastAction>,
                });
            }
        });
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>名前</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="名前"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>自己紹介</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="自己紹介"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="photos"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>アイコン画像</FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(event) =>
                                        field.onChange(event.target.files)
                                    }
                                />
                            </FormControl>
                            <FormDescription>
                                アイコン画像をアップロードしてください。
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    disabled={isPending}
                >
                    {isPending && (
                        <Loader2 className="h-12 w-12 animate-spin" />
                    )}
                    変更
                </Button>
            </form>
        </Form>
    );
};

export default ChangeProfileForm;
