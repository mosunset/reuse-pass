import { MapPin, Calendar } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { GetItemById } from '@/actions/items';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
} from '@/components/ui/carousel';
import { createClient } from '@/utils/supabase/server';

const Page = async (props: { params: { id: string } }) => {
    // ユーザー認証
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        redirect('/login');
    }

    const item = await GetItemById(Number(props.params.id));
    if (!item) {
        return (
            <div className="flex h-screen items-center justify-center text-xl font-semibold text-gray-600">
                アイテムが見つかりませんでした。
            </div>
        );
    }

    return (
        <main className="container mx-auto px-4 py-8 pb-[112px]">
            <Breadcrumb className="mb-6">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link
                                href="/search"
                                className="text-blue-600 hover:text-blue-800"
                            >
                                検索
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{item.name}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="grid grid-cols-1 gap-8">
                <div className="space-y-6">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        {item.name}
                    </h1>
                    <p className="text-lg text-gray-600">{item.description}</p>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <MapPin className="h-8 w-8" />
                        <span>{item.place}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Calendar className="h-4 w-4" />
                        <span>{item.createdAt.toLocaleDateString()}</span>
                    </div>
                    {/* <div className="flex items-center space-x-2">
                        <Badge
                            variant="secondary"
                            className="text-lg font-semibold"
                        >
                            ¥{item.id}
                        </Badge>
                    </div> */}
                </div>

                <div className="">
                    <Carousel className="mx-auto w-full max-w-[500px]">
                        <CarouselContent>
                            {item.photos.map((photo, index) => (
                                <CarouselItem key={index}>
                                    <Image
                                        src={photo}
                                        width={500}
                                        height={500}
                                        alt={`${item.name} - 画像 ${index + 1}`}
                                    />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        {item.photos.length > 1 && (
                            <>
                                <CarouselPrevious className="left-2" />
                                <CarouselNext className="right-2" />
                            </>
                        )}
                    </Carousel>
                </div>
                <div>
                    <Button disabled={data?.user?.id === item.userid}>
                        購入
                    </Button>
                </div>
            </div>
        </main>
    );
};

export default Page;
