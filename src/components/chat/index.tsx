import { History } from './history';
import { Send } from './send';

interface ChatProps {
    buyId: number;
    userId: string;
}

const Index = ({ buyId, userId }: ChatProps) => {
    return (
        <div className="py-4">
            {buyId}
            <br />
            {userId}
            <div>
                <Send
                    buyId={buyId}
                    userId={userId}
                />
            </div>
            <div>
                {/* ここにメッセージ履歴を表示 */}
                <History
                    buyId={buyId}
                    userId={userId}
                />
            </div>
        </div>
    );
};

export default Index;
