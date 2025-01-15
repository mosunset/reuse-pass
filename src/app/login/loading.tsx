import { Loader2 } from 'lucide-react';

const Loading = () => {
    return (
        <div className="grid min-h-dvh place-items-center bg-background">
            <div className="flex flex-col items-center space-y-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="text-lg font-medium text-muted-foreground">
                    Loading...
                </p>
            </div>
        </div>
    );
};

export default Loading;
