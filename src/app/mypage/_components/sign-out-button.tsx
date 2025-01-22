import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface SignOutButtonProps {
    className?: string;
}

const SignOutButton: React.FC<SignOutButtonProps> = ({ className }) => {
    return (
        <Button
            className={className}
            variant="destructive"
            asChild
        >
            <Link href="/sign-out">Sign Out</Link>
        </Button>
    );
};

export default SignOutButton;
