import { Noto_Sans_JP as GoogleFont } from 'next/font/google';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import './globals.css';

const font = GoogleFont({
    subsets: ['latin'],
    variable: '--font-sans',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
    title: 'ReUse Pass',
    description:
        'Generated by U-Next 2024年度高知工科大学情報学群3年 ソフトウェア工学・工学演習にて | ReUse Pass',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="jp">
            <body className={cn('antialiased', font.variable)}>{children}</body>
        </html>
    );
}
