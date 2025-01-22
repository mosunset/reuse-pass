import { MapPin, Calendar } from 'lucide-react';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { GetBuyByitemId } from '@/actions/buy';
import { GetItemById } from '@/actions/items';
import Chat from '@/components/chat';
import { Button } from '@/components/ui/button';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
} from '@/components/ui/carousel';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer';
import { createClient } from '@/utils/supabase/server';

// id = itemId
const Page = async ({ params }: { params: { id: string } }) => {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        redirect('/login');
    }

    // data の人が本当にその商品を買ったのかのチェック
    const buyerId = data.user.id;
    const buyItem = await GetBuyByitemId(Number(params.id));

    if (!buyItem) {
        console.log('🚀 => file: page.tsx:41 => Page => buyItem:', buyItem);
        redirect('/buy');
    }

    if (buyItem?.userid !== buyerId) {
        console.log('🚀 => file: page.tsx:45 => Page => buyerId:', buyerId);
        redirect('/buy');
    }

    const item = await GetItemById(Number(buyItem?.itemid));

    if (!item) {
        console.log('🚀 => file: page.tsx:52 => Page => item:', item);
        redirect('/buy');
    }

    return (
        <main className="mx-auto w-full px-4 py-8 pb-[112px]">
            <h1 className="mb-4 w-full text-center text-2xl">
                チャット 購入者
            </h1>
            <Drawer>
                <DrawerTrigger asChild>
                    <Button>商品詳細を見る</Button>
                </DrawerTrigger>
                <DrawerContent className="p-4">
                    <div className="grid grid-cols-1 gap-8">
                        <DrawerHeader>
                            <DrawerTitle className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                {item.name}
                            </DrawerTitle>
                            <DrawerDescription className="text-lg text-gray-600">
                                {item.description}
                            </DrawerDescription>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                                <MapPin className="h-4 w-4" />
                                <span>{item.place}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                                <Calendar className="h-4 w-4" />
                                <span>{item.createdAt.toLocaleString()}</span>
                            </div>
                        </DrawerHeader>

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
                        <DrawerFooter>
                            <DrawerClose asChild>
                                <Button variant="outline">閉じる</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </div>
                </DrawerContent>
            </Drawer>
            <Chat
                buyId={buyItem?.id}
                userId={buyerId}
            />
        </main>
    );
};

export default Page;
