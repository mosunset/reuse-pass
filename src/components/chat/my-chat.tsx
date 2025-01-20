import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface ComponentProps {
    message: string;
    email: string;
    src?: string;
    createdAt: Date;
}

export const MyComponent = ({
    message,
    email,
    src,
    createdAt,
}: ComponentProps) => {
    return (
        <div className="ms-auto flex gap-x-2">
            <div className="grow space-y-3 text-end">
                <div className="inline-flex flex-col justify-end">
                    <div className="inline-block rounded-2xl bg-blue-600 p-4 shadow-sm">
                        <p className="text-sm text-white">{message}</p>
                    </div>

                    <span className="ms-auto mt-1.5 flex items-center gap-x-1 text-xs text-gray-500">
                        {createdAt.toLocaleString()}
                    </span>
                </div>
            </div>

            <Avatar>
                <AvatarImage
                    src={src}
                    alt={email}
                />
                <AvatarFallback>{email?.slice(0, 2)}</AvatarFallback>
            </Avatar>
        </div>
    );
};
