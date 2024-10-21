import { Footer } from '@/components/footer';
import { Header } from './_components/header';
import { Main } from './_components/main';

export default function Home() {
    return (
        <div className="flex min-h-dvh flex-col">
            <Header />
            <Main />
            <Footer />
        </div>
    );
}
