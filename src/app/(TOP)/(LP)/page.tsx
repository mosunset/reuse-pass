import { Feature } from './_components/feature';
import { Fqa } from './_components/fqa';
import { Top } from './_components/top';
import { Voice } from './_components/voice';

export default function Home() {
    return (
        <main>
            <Top />
            <Feature />
            <Voice />
            <Fqa />
        </main>
    );
}
