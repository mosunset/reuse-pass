import { Footer } from './_components/footer';
import { Header } from './_components/header';

interface TopLayoutProps {
    children: React.ReactNode;
}

const TopLayout = ({ children }: TopLayoutProps) => {
    return (
        <div className="flex min-h-dvh flex-col">
            <Header />
            {children}
            <Footer />
        </div>
    );
};

export default TopLayout;
