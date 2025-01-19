import { formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale/ja';
import Image from 'next/image';
import Link from 'next/link';
import { SearchItems, GetAllItems } from '@/actions/items';
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

interface SearchCardsProps {
    keyword: string;
}

const SearchResultCards = async ({ keyword }: SearchCardsProps) => {
    const data = keyword === '' ? GetAllItems(10) : SearchItems(keyword);
    return (
        <div className="grid grid-cols-1 gap-4">
            {(await data).map((item) => (
                <Link
                    key={item.id}
                    href={`/search/${item.id}`}
                >
                    <Card>
                        <CardHeader>
                            <CardTitle>{item.name}</CardTitle>
                            <CardDescription>
                                {item.description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Carousel className="mx-auto w-full max-w-[300px]">
                                <CarouselContent>
                                    {item.photos.map((photo, index) => (
                                        <CarouselItem key={index}>
                                            <Image
                                                src={photo}
                                                width={300}
                                                height={300}
                                                alt={item.name}
                                            />
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                {item.photos.length > 1 && (
                                    <>
                                        <CarouselPrevious />
                                        <CarouselNext />
                                    </>
                                )}
                            </Carousel>
                        </CardContent>
                        <CardFooter className="flex flex-col items-start gap-4">
                            <div>{item.place}</div>
                            <div>
                                {formatDistanceToNow(new Date(item.updatedAt), {
                                    addSuffix: true,
                                    locale: ja,
                                })}
                            </div>
                        </CardFooter>
                    </Card>
                </Link>
            ))}
        </div>
    );
};

export default SearchResultCards;
