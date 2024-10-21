import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

export const Fqa = () => {
    const data = {
        faqs: [
            {
                question: 'どのようにして出品や購入を開始できますか？',
                answer: 'まずはシステムに無料で登録し、本人確認を行います。登録後、出品ページから商品をアップロードしたり、検索機能で欲しい商品を見つけて購入手続きを進められます。',
            },
            {
                question:
                    '物品の引き渡し場所や日時はどうやって決めるのですか？',
                answer: '取引相手とのチャット機能を利用して、引き渡し場所や日時を自由に調整できます。さらに、事前に取引場所・日時を指定できる機能もあるため、スムーズな取引が可能です。',
            },
            {
                question:
                    '取引後に相手が商品を受け取らない場合はどうすればいいですか？',
                answer: '万が一、相手が商品を受け取らない場合は、システム内の通報機能を使って問題を報告できます。また、システム上での評価機能を利用して、相手の信頼性を反映させることができます。',
            },
            {
                question: 'プレミアム機能とは何ですか？',
                answer: 'プレミアム機能では、広告の非表示、検索結果の上位表示、出品制限の解除、プロフィールにバッジを表示するなど、より便利に取引を行える機能が追加されます。',
            },
            {
                question:
                    '出品した商品を削除したり、取引をキャンセルすることは可能ですか？',
                answer: '出品者は、商品が購入される前であればいつでも出品物を削除できます。また、取引前であれば、チャット機能を通じてキャンセルの連絡をすることができます。',
            },
        ],
    };

    return (
        <div className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
            <div className="mx-auto mb-4 max-w-2xl text-center lg:mb-6">
                <h2 className="text-2xl font-bold md:text-4xl md:leading-tight">
                    よくあるご質問
                </h2>
            </div>

            <div className="mx-auto max-w-2xl">
                <Accordion
                    type="single"
                    collapsible
                >
                    {data.faqs.map((faq, index) => (
                        <AccordionItem
                            key={index}
                            value={index.toString()}
                        >
                            <AccordionTrigger className="group inline-flex w-full items-center justify-between gap-x-3 rounded-lg pb-3 text-start font-semibold text-gray-800 transition focus:outline-none md:text-lg">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-800">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    );
};
