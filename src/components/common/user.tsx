import Link from 'next/link';

export function User() {
    return (
        <div className="user">
            <Link href="/login">Login</Link>
        </div>
    );
}