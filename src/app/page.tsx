import { WelcomeScreen } from '@/src/app/welcome-screen';
import { InformationScreen } from '@/src/app/information-screen';
import { Footer } from '@/src/components/common/footer';

export default function Home() {
    return (
        <>
            <WelcomeScreen />
            <div id="description">
                <InformationScreen
                    title="Szalenie łatwe"
                    description="Podaj składniki, które Cię interesują i wybierz typ, a otrzymasz najlepsze dopasowania."
                    imageName="insane-easy"
                    authorInfo={'Image by <a href="https://pixabay.com/users/rperucho-7689351/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=7251301">Ramon Perucho</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=7251301">Pixabay</a>'}
                />
                <InformationScreen
                    title="Dania"
                    description="Zawiera ponad 100 000 posiłków, integrując posiłki z innych serwisów!"
                    imageName="dishes"
                    authorInfo={'Image by <a href="https://pixabay.com/users/buffetcrush-4147660/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=2009590">지원 이</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=2009590">Pixabay</a>'}
                />
                <InformationScreen
                    title="Integruje"
                    description="Tworzy i skupia społeczność, którzy również chcą podzielić się swoimi posiłkami, bądź promować już dodane."
                    imageName="community"
                    authorInfo={'Image by <a href="https://pixabay.com/users/surprising_snapshots-11873433/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=7530848">Mircea Iancu</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=7530848">Pixabay</a>'}
                />
            </div>
            <Footer />
        </>
    );
}
