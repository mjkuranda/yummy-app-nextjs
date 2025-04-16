import { Header } from '@/src/components/common/header/header';

export function TopHeader() {
    return (
        <div className="position-absolute top-0 end-0 w-100">
            <Header isTransparent={false} />
        </div>
    );
}