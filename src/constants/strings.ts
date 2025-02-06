export type PagePathname
    = '/'
    | '/#description'
    | '/dishes/create'
    | `/dishes${string}`
    | `/dishes${string}/edit`
    | '/manage'
    | ManageUserPathname
    | ManageDishesPathname
    | '/recommendations'
    | '/search'
    | `/search?sourceUrl=${string}&type=${string}&dish=${string}`
    | `/users/${string}/profile`
    | `/users/activate/${string}`
    | '/users/change-password'
    | '/users/login'
    | '/users/registration';

type ManageUserPathname = `/manage/users/${'not-activated' | 'permission-for-adding' | 'permission-for-editing' | 'permission-for-deleting'}`;
type ManageDishesPathname = `/manage/dishes/${'added' | 'edited' | 'deleted'}`;