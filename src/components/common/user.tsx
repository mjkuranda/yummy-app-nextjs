import { Button } from '@/src/components/common/button';

export function User() {
    return (
        <div className="user">
            <Button label={'Login'} link="/users/login" />
        </div>
    );
}