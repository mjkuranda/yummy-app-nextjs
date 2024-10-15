import { ApiErrorResponse, throwApiError } from '@/src/api/api-errors';

export const API_URL = 'http://localhost:3001';

export async function apiGet<T>(endpointUrl: string): Promise<T> {
    const res = await fetch(`${API_URL}/${endpointUrl}`, {
        mode: 'cors',
        method: 'GET',
        headers: {
            'accept': '*/*',
            'Accept-Language': 'pl', // TODO: from i18n
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });

    if (!res.ok) {
        const errorResponse = await res.json() as ApiErrorResponse;

        return throwApiError(errorResponse);
    }

    return await res.json();
}

export async function apiPost<P = undefined>(endpointUrl: string, payload?: P, isFormData?: boolean): Promise<Response> {
    const res = await fetch(`${API_URL}/${endpointUrl}`, {
        mode: 'cors',
        method: 'POST',
        headers: {
            'accept': '*/*',
            ...(!isFormData && { 'Content-Type': 'application/json' })
        },
        credentials: 'include',
        body: isFormData ? payload as FormData : typeof payload === 'string' ? payload : JSON.stringify(payload)
    });

    if (!res.ok) {
        const errorResponse = await res.json() as ApiErrorResponse;

        return throwApiError(errorResponse);
    }

    return res;
}

export async function apiPut<P = undefined>(endpointUrl: string, payload?: P, isFormData?: boolean): Promise<Response> {
    const res = await fetch(`${API_URL}/${endpointUrl}`, {
        mode: 'cors',
        method: 'PUT',
        headers: {
            'accept': '*/*',
            ...(!isFormData && { 'Content-Type': 'application/json' })
        },
        credentials: 'include',
        body: isFormData ? payload as FormData : typeof payload === 'string' ? payload : JSON.stringify(payload)
    });

    if (!res.ok) {
        const errorResponse = await res.json() as ApiErrorResponse;

        return throwApiError(errorResponse);
    }

    return res;
}

export async function apiDelete(endpointUrl: string): Promise<Response> {
    const res = await fetch(`${API_URL}/${endpointUrl}`, {
        mode: 'cors',
        method: 'DELETE',
        headers: { 'accept': '*/*' },
        credentials: 'include'
    });

    if (!res.ok) {
        const errorResponse = await res.json() as ApiErrorResponse;

        return throwApiError(errorResponse);
    }

    return res;
}