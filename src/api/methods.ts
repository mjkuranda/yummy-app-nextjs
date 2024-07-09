const API_URL = 'http://localhost:3001';

export async function apiGet<T>(endpointUrl: string): Promise<T> {
    const res = await fetch(`${API_URL}/${endpointUrl}`, {
        mode: 'cors',
        method: 'GET',
        headers: {
            'accept': '*/*',
            'Content-Type': 'application/json'
        }
    });

    return await res.json();
}

export async function apiPost<T, P>(endpointUrl: string, payload: P): Promise<T> {
    const res = await fetch(`${API_URL}/${endpointUrl}`, {
        mode: 'cors',
        method: 'POST',
        headers: {
            'accept': '*/*',
            'Content-Type': 'application/json'
        },
        body: typeof payload === 'string' ? payload : JSON.stringify(payload)
    });

    return await res.json();
}

