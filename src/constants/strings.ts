export type PagePathname
    = '/'
    | '/#description'
    | '/recommendations'
    | '/search'
    | `/manage${string}`
    | `/users${string}`
    | `/dishes${string}`;