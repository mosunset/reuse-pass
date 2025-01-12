import localFont from 'next/font/local';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import '@/styles/globals.css';
import Footer from '@/components/footer';

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
    title: 'Create Next App',
    description: 'Generated by create next app',
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
                    'relative flex min-h-dvh min-w-[300px] flex-col overflow-x-hidden antialiased'
                )}
            >
                {children}
                <Footer />
            </body>
        </html>
    );
}
