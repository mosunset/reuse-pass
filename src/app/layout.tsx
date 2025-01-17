import { SpeedInsights } from '@vercel/speed-insights/next';
import localFont from 'next/font/local';
import Footer from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import '@/styles/globals.css';

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
                    'mx-auto flex h-dvh min-w-[316px] max-w-[700px] flex-col overflow-x-hidden antialiased'
                )}
            >
                {children}
                <Footer />
                <Toaster />
                <SpeedInsights />
            </body>
        </html>
    );
}
