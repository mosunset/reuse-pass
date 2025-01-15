import Image from 'next/image';
import Link from 'next/link';
import { GetItemById } from '@/actions/items';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
} from '@/components/ui/carousel';

const Page = async (props: { params: { id: string } }) => {
    const item = await GetItemById(Number(props.params.id));
    if (!item) {
        return <div>アイテムが見つかりませんでした。</div>;
    }

    return (
        <main className="p-4 pb-[112px]">
            <h1 className="mb-4 w-full text-center text-2xl">商品詳細</h1>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/search">search</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{props.params.id}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="mt-4">
                <div className="flex flex-col space-y-1.5">
                    <div className="font-semibold leading-none tracking-tight">
                        {item.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                        {item.description}
                    </div>
                </div>
                <div className="pt-0">
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
                </div>
                <div className="flex flex-col items-start gap-4 pt-0">
                    <div>{item.place}</div>
                    <div>{item.createdAt.toISOString()}</div>
                </div>
            </div>
        </main>
    );
};

export default Page;
