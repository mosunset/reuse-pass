import localFont from 'next/font/local';
import Footer from '@/components/footer';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import '@/styles/globals.css';
import { Toaster } from '@/components/ui/toaster';

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900',
});
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900',
});

export const metadata: Metadata = {
    title: 'ReUse Pass',
    description: 'ReUse Pass',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja">
            <body
                className={cn(
                    geistSans.variable,
                    geistMono.variable,
                    'relative mx-auto flex min-h-dvh min-w-[300px] max-w-[700px] flex-col overflow-x-hidden antialiased'
                )}
            >
                {children}
                <Footer />
                <Toaster />
            </body>
        </html>
    );
}
