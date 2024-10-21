import Image from 'next/image';
import { Button } from '@/components/ui/button';

export const Header = () => {
    return (
        <header className="z-50 flex w-full flex-wrap py-7 md:flex-nowrap md:justify-start">
            <nav className="relative mx-auto flex w-full max-w-7xl basis-full flex-wrap items-center px-4 md:grid md:grid-cols-12 md:px-6">
                <div className="md:col-span-3">
                    <a
                        className="flex space-x-2 rounded-xl text-xl font-semibold focus:opacity-80 focus:outline-none"
                        href="/"
                        aria-label="ReUse Pass"
                    >
                        <Image
                            src="/icon.png"
                            width={32}
                            height={16}
                            alt="ReUse Pass icon"
                            className="font"
                        />
                        <div className="leading-8">ReUse Pass</div>
                    </a>
                </div>

                <div className="ms-auto flex items-center gap-x-1 py-1 md:order-3 md:col-span-3 md:gap-x-2 md:ps-6">
                    <Button variant="outline">Sign in</Button>
                    <Button variant="default">Hire us</Button>
                </div>

                <div
                    id="hs-navbar-hcail"
                    className="hs-collapse hidden grow basis-full overflow-hidden transition-all duration-300 md:order-2 md:col-span-6 md:block md:w-auto md:basis-auto"
                    aria-labelledby="hs-navbar-hcail-collapse"
                >
                    <div className="mt-5 flex flex-col gap-x-0 gap-y-4 md:mt-0 md:flex-row md:items-center md:justify-center md:gap-x-7 md:gap-y-0">
                        <div>
                            <a
                                className="relative inline-block text-black before:absolute before:bottom-0.5 before:start-0 before:-z-[1] before:h-1 before:w-full before:bg-lime-400 focus:outline-none dark:text-white"
                                href="#"
                                aria-current="page"
                            >
                                Work
                            </a>
                        </div>
                        <div>
                            <a
                                className="inline-block text-black hover:text-gray-600 focus:text-gray-600 focus:outline-none dark:text-white dark:hover:text-neutral-300 dark:focus:text-neutral-300"
                                href="#"
                            >
                                Services
                            </a>
                        </div>
                        <div>
                            <a
                                className="inline-block text-black hover:text-gray-600 focus:text-gray-600 focus:outline-none dark:text-white dark:hover:text-neutral-300 dark:focus:text-neutral-300"
                                href="#"
                            >
                                About
                            </a>
                        </div>
                        <div>
                            <a
                                className="inline-block text-black hover:text-gray-600 focus:text-gray-600 focus:outline-none dark:text-white dark:hover:text-neutral-300 dark:focus:text-neutral-300"
                                href="#"
                            >
                                Careers
                            </a>
                        </div>
                        <div>
                            <a
                                className="inline-block text-black hover:text-gray-600 focus:text-gray-600 focus:outline-none dark:text-white dark:hover:text-neutral-300 dark:focus:text-neutral-300"
                                href="#"
                            >
                                Blog
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};
