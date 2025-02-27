import { HttpMethod } from '@/src/types/api.types';

export function apiCall(method: HttpMethod, endpointUrl: string, init?: { headers?: HeadersInit, body?: BodyInit }): Promise<Response> {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v2/${endpointUrl}`, {
        mode: 'cors',
        method,
        headers: {
            'accept': '*/*',
            ...(init?.headers || {})
        },
        credentials: 'include',
        ...(init?.body && { body: init.body })
    });
}