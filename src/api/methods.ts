const API_URL = 'http://localhost:3001';

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

    return await res.json();
}

export async function apiPost<P = undefined>(endpointUrl: string, payload?: P, isFormData?: boolean): Promise<Response> {
    return await fetch(`${API_URL}/${endpointUrl}`, {
        mode: 'cors',
        method: 'POST',
        headers: {
            'accept': '*/*',
            ...(!isFormData && { 'Content-Type': 'application/json' })
        },
        credentials: 'include',
        body: isFormData ? payload as FormData : typeof payload === 'string' ? payload : JSON.stringify(payload)
    });
}

