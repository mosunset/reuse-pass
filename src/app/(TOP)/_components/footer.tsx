import { GitHubLogoIcon } from '@radix-ui/react-icons';

export const Footer = () => {
    const product = {
        links: [
            {
                url: '#',
                text: 'test',
            },
            {
                url: '#',
                text: 'test',
            },
            {
                url: '#',
                text: 'test',
            },
        ],
    };
    const other = {
        links: [
            {
                url: '/privacy',
                text: 'Privacy',
            },
            {
                url: '/terms',
                text: 'Terms',
            },
        ],
    };
    return (
        <footer className="mt-auto w-full bg-gray-900">
            <div className="mx-auto mt-auto w-full max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:pt-20">
                <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-5">
                    <div className="col-span-full lg:col-span-1">
                        <a
                            className="flex-none text-xl font-semibold text-white focus:opacity-80 focus:outline-none"
                            href="/"
                            aria-label="ReUse Pass"
                        >
                            ReUse Pass
                        </a>
                    </div>

                    <div className="col-span-1">
                        <h4 className="font-semibold text-gray-100">Product</h4>

                        <div className="mt-3 grid space-y-3">
                            {product.links.map((link, index) => (
                                <p key={index}>
                                    <a
                                        className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:text-gray-200 focus:outline-none"
                                        href={link.url}
                                    >
                                        {link.text}
                                    </a>
                                </p>
                            ))}
                        </div>
                    </div>

                    <div className="col-span-1">
                        <h4 className="font-semibold text-gray-100">others</h4>

                        <div className="mt-3 grid space-y-3">
                            {other.links.map((link, index) => (
                                <p key={index}>
                                    <a
                                        className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:text-gray-200 focus:outline-none"
                                        href={link.url}
                                    >
                                        {link.text}
                                    </a>
                                </p>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-5 grid gap-y-2 sm:mt-12 sm:flex sm:items-center sm:justify-between sm:gap-y-0">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-400">
                            © 2024 U-Next 2024年度高知工科大学情報学群3年
                            ソフトウェア工学・工学演習.
                        </p>
                    </div>

                    <div>
                        <a
                            className="inline-flex size-10 items-center justify-center gap-x-2 rounded-lg border border-transparent text-sm font-semibold text-white hover:bg-white/10 focus:bg-white/10 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                            href="https://github.com/mosunset/reuse-pass"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <GitHubLogoIcon className="h-4 w-4" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
