import { ChevronRight } from 'lucide-react';

export const Top = () => {
    return (
        <div className="relative overflow-hidden">
            <div
                aria-hidden="true"
                className="absolute -top-96 start-1/2 flex -translate-x-1/2 transform"
            >
                <div className="h-[44rem] w-[25rem] -translate-x-[10rem] rotate-[-60deg] transform bg-gradient-to-r from-violet-300/50 to-purple-100 blur-3xl"></div>
                <div className="rounded-fulls h-[50rem] w-[90rem] origin-top-left -translate-x-[15rem] -rotate-12 bg-gradient-to-tl from-blue-50 via-blue-100 to-blue-50 blur-3xl"></div>
            </div>

            <div className="relative z-10">
                <div className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
                    <div className="mx-auto max-w-2xl text-center">
                        <div className="mt-5 max-w-2xl">
                            <h1 className="block whitespace-nowrap text-4xl font-semibold text-gray-800 md:text-5xl lg:text-6xl">
                                個人間取引の新しい
                                <wbr />
                                スタンダード
                            </h1>
                        </div>

                        <div className="mt-5 max-w-3xl">
                            <p className="text-lg text-gray-600">
                                このプラットフォームは、物品の売買をシームレスに行える直感的なUIと、地域密着型の取引を強力にサポートする機能を備えた、次世代フリーマーケットシステムです。譲渡から購入まで、簡単で信頼性の高い取引が可能です。
                            </p>
                        </div>

                        <div className="mt-8 flex justify-center gap-3">
                            <a
                                className="inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-blue-600 px-4 py-3 text-sm font-medium text-white hover:bg-blue-700 focus:bg-blue-700 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                                href="#"
                            >
                                今すぐ始める
                                <ChevronRight className="h-4 w-4" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
