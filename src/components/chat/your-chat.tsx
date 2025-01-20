import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface ComponentProps {
    message: string;
    email: string;
    src?: string;
    createdAt: Date;
}

export const YourComponent = ({
    message,
    email,
    src,
    createdAt,
}: ComponentProps) => {
    return (
        <div className="me-11 flex max-w-lg gap-x-2">
            <Avatar>
                <AvatarImage
                    src={src}
                    alt={email}
                />
                <AvatarFallback>{email?.slice(0, 2)}</AvatarFallback>
            </Avatar>

            <div className="grow space-y-3 text-start">
                <div className="inline-flex flex-col justify-end">
                    <div className="inline-block rounded-2xl border border-gray-200 p-4 shadow-sm">
                        <p className="text-sm">{message}</p>
                    </div>

                    <span className="mt-1.5 flex items-center gap-x-1 text-xs text-gray-500">
                        {createdAt.toLocaleString()}
                    </span>
                </div>
            </div>
        </div>
    );
};
