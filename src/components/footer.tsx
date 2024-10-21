import { GitHubLogoIcon } from '@radix-ui/react-icons';

export const Footer = () => {
    return (
        <footer className="mt-auto w-full bg-gray-900 dark:bg-neutral-950">
            <div className="mx-auto mt-auto w-full max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:pt-20">
                <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-5">
                    <div className="col-span-full lg:col-span-1">
                        <a
                            className="flex-none text-xl font-semibold text-white focus:opacity-80 focus:outline-none"
                            href="#"
                            aria-label="ReUse Pass"
                        >
                            ReUse Pass
                        </a>
                    </div>

                    <div className="col-span-1">
                        <h4 className="font-semibold text-gray-100">Product</h4>

                        <div className="mt-3 grid space-y-3">
                            <p>
                                <a
                                    className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:text-gray-200 focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                                    href="#"
                                >
                                    Pricing
                                </a>
                            </p>
                            <p>
                                <a
                                    className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:text-gray-200 focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                                    href="#"
                                >
                                    Changelog
                                </a>
                            </p>
                            <p>
                                <a
                                    className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:text-gray-200 focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                                    href="#"
                                >
                                    Docs
                                </a>
                            </p>
                        </div>
                    </div>

                    <div className="col-span-1">
                        <h4 className="font-semibold text-gray-100">Company</h4>

                        <div className="mt-3 grid space-y-3">
                            <p>
                                <a
                                    className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:text-gray-200 focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                                    href="#"
                                >
                                    About us
                                </a>
                            </p>
                            <p>
                                <a
                                    className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:text-gray-200 focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                                    href="#"
                                >
                                    Blog
                                </a>
                            </p>
                            <p>
                                <a
                                    className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:text-gray-200 focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                                    href="#"
                                >
                                    Careers
                                </a>{' '}
                                <span className="ms-1 inline-block rounded-lg bg-blue-700 px-2 py-1 text-xs text-white">
                                    We&apos;re hiring
                                </span>
                            </p>
                            <p>
                                <a
                                    className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:text-gray-200 focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                                    href="#"
                                >
                                    Customers
                                </a>
                            </p>
                        </div>
                    </div>

                    <div className="col-span-2">
                        <h4 className="font-semibold text-gray-100">
                            Stay up to date
                        </h4>

                        <form>
                            <div className="mt-4 flex flex-col items-center gap-2 rounded-lg bg-white p-2 dark:bg-neutral-900 sm:flex-row sm:gap-3">
                                <div className="w-full">
                                    <label
                                        htmlFor="hero-input"
                                        className="sr-only"
                                    >
                                        Subscribe
                                    </label>
                                    <input
                                        type="text"
                                        id="hero-input"
                                        name="hero-input"
                                        className="block w-full rounded-lg border-transparent px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-transparent dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                        placeholder="Enter your email"
                                    />
                                </div>
                                <a
                                    className="inline-flex w-full items-center justify-center gap-x-2 whitespace-nowrap rounded-lg border border-transparent bg-blue-600 p-3 text-sm font-medium text-white hover:bg-blue-700 focus:bg-blue-700 focus:outline-none disabled:pointer-events-none disabled:opacity-50 sm:w-auto"
                                    href="#"
                                >
                                    Subscribe
                                </a>
                            </div>
                            <p className="mt-3 text-sm text-gray-400">
                                New UI kits or big discounts. Never spam.
                            </p>
                        </form>
                    </div>
                </div>

                <div className="mt-5 grid gap-y-2 sm:mt-12 sm:flex sm:items-center sm:justify-between sm:gap-y-0">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-400 dark:text-neutral-400">
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
