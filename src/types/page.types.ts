export interface PageProps<ParamsKeyList extends string> {
    params: Record<ParamsKeyList, string>;
    searchParams?: { [key: string]: string | string[] | undefined };
}