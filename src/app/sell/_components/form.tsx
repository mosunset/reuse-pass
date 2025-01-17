'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { v4 as uuid } from 'uuid';
import { z } from 'zod';
import { CreateItem } from '@/actions/items';
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
    userid: z.string(),
    name: z
        .string()
        .min(3, { message: '商品名は3文字以上で入力してください。' })
        .max(50, { message: '商品名は50文字以内で入力してください。' }),
    description: z
        .string()
        .min(10, { message: '商品の説明は10文字以上で入力してください。' })
        .max(200, { message: '商品の説明は200文字以内で入力してください。' }),
    photos: z
        .any()
        .transform((val) => (val instanceof FileList ? Array.from(val) : []))
        .refine(
            (files) =>
                files.every((file: File) =>
                    ['image/*'].includes(
                        file.type
                    )
                ),
            {
                message: 'jpg/png/webpファイルのみアップロードしてください。',
            }
        ),
    place: z
        .string()
        .min(1, { message: '場所を入力してください。' })
        .max(200, { message: '場所は200文字以内で入力してください。' }),
});
interface SellFormProps {
    userid: string;
}
const SellForm = ({ userid }: SellFormProps) => {
    const { toast } = useToast();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            userid: userid,
            name: '',
            description: '',
            photos: [],
            place: '',
        },
        mode: 'all',
    });

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // フォームの値を処理します。
        // ✅ これは型安全でバリデート済みです。

        setLoading(true);

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
                ...values,
                photos: uploadedPhotos,
            };

            try {
                const item = await CreateItem({ data: formData });

                router.push(`/search/${item.id}`);
            } catch {
                toast({
                    variant: 'destructive',
                    title: 'エラーが発生しました',
                    description:
                        '商品の出品に失敗しました。もう一度お試しください。',
                    action: <ToastAction altText={'OK'}>OK</ToastAction>,
                });
            } finally {
                setLoading(false);
            }
        } catch {
            toast({
                variant: 'destructive',
                title: 'エラーが発生しました',
                description:
                    '画像のアップロードに失敗しました。もう一度お試しください。',
                action: <ToastAction altText={'OK'}>OK</ToastAction>,
            });
            setLoading(false);
        }
    }
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
            >
                <FormField
                    control={form.control}
                    name="userid"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>User Id</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder=""
                                    disabled
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>変更不可</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>商品名</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="商品名"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                出品したい商品の名前を入力してください。
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>商品の説明</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="商品の説明"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                出品したい商品の情報を入力してください。
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="photos"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>商品画像</FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={(event) =>
                                        field.onChange(event.target.files)
                                    }
                                />
                            </FormControl>
                            <FormDescription>
                                商品画像をアップロードしてください。
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="place"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>受け渡し場所</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="受け渡し場所"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                商品の受け渡し場所を入力してください。
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    disabled={loading}
                >
                    {loading && <Loader2 className="h-12 w-12 animate-spin" />}
                    出品
                </Button>
            </form>
        </Form>
    );
};

export default SellForm;
