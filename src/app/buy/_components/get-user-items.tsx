import Image from 'next/image';
import Link from 'next/link';
import { GetBuyByUserIds } from '@/actions/buy'; // 名前を変更してインポート
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';

const RenderUserItems = async ({ userid }: { userid: string }) => {
    // 関数名を変更
    const data = await GetBuyByUserIds(userid); // 名前を変更して呼び出し
    return (
        <div className="grid grid-cols-1 gap-4">
            {data.map((item) => (
                <Link
                    key={item.id}
                    href={`/buy/${item.id}`}
                >
                    <Card>
                        <CardHeader>
                            <CardTitle>{item.item.name}</CardTitle>
                            <CardDescription>
                                {item.item.description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Carousel className="mx-auto w-full max-w-[300px]">
                                <CarouselContent>
                                    {item.item.photos.map((photo, index) => (
                                        <CarouselItem key={index}>
                                            <Image
                                                src={photo}
                                                width={300}
                                                height={300}
                                                alt={item.item.name}
                                            />
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                {item.item.photos.length > 1 && (
                                    <>
                                        <CarouselPrevious />
                                        <CarouselNext />
                                    </>
                                )}
                            </Carousel>
                        </CardContent>
                        <CardFooter className="flex flex-col items-start gap-4">
                            <div>{item.item.place}</div>
                            <div>
                                {new Date(item.item.createdAt).toLocaleString()}
                            </div>
                        </CardFooter>
                    </Card>
                </Link>
            ))}
        </div>
    );
};

export default RenderUserItems;
