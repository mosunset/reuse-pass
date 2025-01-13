'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
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

const formSchema = z.object({
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
        .transform((val) =>
            val instanceof FileList ? Array.from(val) : []
        )
        .refine(
            (files) =>
                files.every(
                    (file: File) =>
                        ['image/jpeg', 'image/png', 'image/webp'].includes(file.type)
                ),
            {
                message: 'jpg/png/webpファイルのみアップロードしてください。',
            }
        ),
});

const CreateForm = () => {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            description: '',
            photos: [],
        },
        mode: 'all',
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
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
                                    accept="image/jpeg,image/png,image/webp"
                                    onChange={(event) => field.onChange(event.target.files)}
                                />
                            </FormControl>
                            <FormDescription>商品画像をアップロードしてください。</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">出品</Button>
            </form>
        </Form>
    );
};

export default CreateForm;
