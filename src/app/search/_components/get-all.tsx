import Image from 'next/image';
import { GetAllItems } from '@/actions/items';
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

const GetAll = async () => {
    const data = GetAllItems();
    // name: string;
    // id: number;
    // description: string;
    // photos: string[];
    // place: string;
    // createdAt: Date;
    // updatedAt: Date;
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(await data).map((item) => (
                <Card key={item.id}>
                    <CardHeader>
                        <CardTitle>{item.name}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
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
                        <div>{item.createdAt.toISOString()}</div>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
};

export default GetAll;
