import { Header } from '@/src/components/common/header';
import { Footer } from '@/src/components/common/footer';
import { ObjectContainer } from '@/src/app/manage/[objects]/[action]/object-container';

export default function ObjectManagementPage() {
    return (
        <>
            <Header />
            <ObjectContainer />
            <Footer />
        </>
    );
}