import { WelcomeScreen } from '@/src/app/welcome-screen';
import { InformationScreen } from '@/src/app/information-screen';
import { Footer } from '@/src/components/common/footer';

export default function Home() {
    return (
        <>
            <WelcomeScreen />
            <div id="description">
                <InformationScreen title="Szalenie łatwe" description="Podaj składniki, które Cię interesują i wybierz typ, a otrzymasz najlepsze dopasowania." imageName="insane-easy" />
                <InformationScreen title="Posiłki" description="Zawiera ponad 100 000 posiłków, integrując posiłki z innych serwisów!" imageName="meals" />
                <InformationScreen title="Integruje" description="Tworzy i skupia społeczność, którzy również chcą podzielić się swoimi posiłkami, bądź promować już dodane." imageName="community" />
            </div>
            <Footer />
        </>
    );
}
