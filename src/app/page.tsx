import { WelcomeScreen } from '@/src/app/welcome-screen';
import { InformationScreen } from '@/src/app/information-screen';
import { Footer } from '@/src/components/common/footer';

export default function Home() {
    return (
        <>
            <WelcomeScreen />
            <div id="description">
                <InformationScreen title="Meals" description="Easy for users. Containing over X meals!" />
                <InformationScreen title="Integrating" description="Creates cooking community." />
                <InformationScreen title="Mealful" description="Integrate various recipesets." />
            </div>
            <Footer />
        </>
    );
}
