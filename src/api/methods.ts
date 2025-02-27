import { ApiErrorResponse, throwApiError } from '@/src/api/api-errors';
import { apiCall } from '@/src/helpers/api.helper';

export async function apiGet<T>(endpointUrl: string): Promise<T> {
    const res = await apiCall('GET', endpointUrl, {
        headers: {
            'Accept-Language': 'pl', // TODO: from i18n
            'Content-Type': 'application/json'
        }
    });

    if (!res.ok) {
        const errorResponse = await res.json() as ApiErrorResponse;

        return throwApiError(errorResponse);
    }

    return await res.json();
}

export async function apiPost<P = undefined>(endpointUrl: string, payload?: P, isFormData?: boolean): Promise<Response> {
    const res = await apiCall('POST', endpointUrl, {
        headers: {
            ...(!isFormData && { 'Content-Type': 'application/json' })
        },
        body: isFormData ? payload as FormData : typeof payload === 'string' ? payload : JSON.stringify(payload)
    });

    if (!res.ok) {
        const errorResponse = await res.json() as ApiErrorResponse;

        return throwApiError(errorResponse);
    }

    return res;
}

export async function apiPut<P = undefined>(endpointUrl: string, payload?: P, isFormData?: boolean): Promise<Response> {
    const res = await apiCall('PUT', endpointUrl, {
        headers: {
            ...(!isFormData && { 'Content-Type': 'application/json' })
        },
        body: isFormData ? payload as FormData : typeof payload === 'string' ? payload : JSON.stringify(payload)
    });

    if (!res.ok) {
        const errorResponse = await res.json() as ApiErrorResponse;

        return throwApiError(errorResponse);
    }

    return res;
}

export async function apiDelete(endpointUrl: string): Promise<Response> {
    const res = await apiCall('DELETE', endpointUrl);

    if (!res.ok) {
        const errorResponse = await res.json() as ApiErrorResponse;

        return throwApiError(errorResponse);
    }

    return res;
}