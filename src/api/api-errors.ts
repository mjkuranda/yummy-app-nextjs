import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { toastError, toastInfo } from '@/src/utils/toast.utils';
import { UserContextValues } from '@/src/contexts/user.context';

type HttpStatusCode =
    | 200  // OK
    | 201  // Created
    | 400  // Bad Request
    | 401  // Unauthorized
    | 403  // Forbidden
    | 404  // Not Found
    | 500  // Internal Server Error
    | 502  // Bad Gateway
    | 503; // Service Unavailable

type ApiErrorContext = `${string}/${string}`;

export interface ApiErrorResponse {
    context: ApiErrorContext,
    message: string,
    path: string,
    statusCode: HttpStatusCode,
    timestamp: `${number}-${number}-${number}T${string}:${string}:${string}.${number}Z`
}

export class ApiError extends Error {
    constructor(private readonly statusCode: HttpStatusCode, message?: string) {
        super(message ?? 'ApiError occurred.');
    }
}

export class BadRequestError extends ApiError {
    constructor(message: string, context: ApiErrorContext) {
        super(400, getBadRequestMessage(message, context));
    }
}

export class UnauthorizedError extends ApiError {
    constructor(message: string) {
        super(401, message);
    }
}

export class ForbiddenError extends ApiError {
    constructor(message: string) {
        super(403, message);
    }
}

export class NotFoundError extends ApiError {
    constructor(message: string) {
        super(404, message);
    }
}

export class NotFoundActivationForUser extends NotFoundError {
    constructor() {
        super('Nie znaleziono takiej prośby, aby aktywować użytkownika.');
    }
}

export function throwApiError(res: ApiErrorResponse): never {
    switch (res.statusCode) {
    case 400:
        throw new BadRequestError(res.message, res.context);
    case 401:
        throw new UnauthorizedError(res.message);
    case 403:
        throw new ForbiddenError(res.message);
    case 404:
        if (res.message.includes('Not found any request') && res.message.includes('activation token')) {
            throw new NotFoundActivationForUser();
        }

        throw new NotFoundError(res.message);
    }

    throw new Error('Wystąpił nieoczekiwany błąd.');
}

export function handleApiError(err: ApiError, router: AppRouterInstance, userContext: UserContextValues): void {
    if (err instanceof UnauthorizedError) {
        toastInfo('Twoja sesja wygasła. Zaloguj się ponownie.');
        router.push('/users/login');
        userContext.logoutUser();
    }

    if (err instanceof ForbiddenError) {
        toastError('Nie jesteś uprawniony do wykonywania akcji admina.');
        router.push('/');
    }

    if (err instanceof BadRequestError && err.message.includes('adres URL')) {
        toastError(err.message);
    }

    if (err instanceof NotFoundError && err.message.includes('Not found any request with') && err.message.includes('activation token')) {
        toastError('Podany token nie istnieje.');
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getBadRequestMessage(message: string, context: ApiErrorContext): string {
    if (message.startsWith('Incorrect credentials')) {
        return 'Niepoprawne dane logowania';
    }

    if (message.includes('login has already exists')) {
        return 'Wprowadzony login już istnieje';
    }

    if (message.includes('User') && message.includes('does not exist')) {
        return 'Użytkownik o podanym loginie nie istnieje';
    }

    if (message.includes('imageUrl') && message.includes('isLength')) {
        return 'Podano zbyt długi adres URL';
    }

    if (message.includes('Invalid activation token')) {
        return 'Podany token jest nieprawidłowy.';
    }

    if (['User with id', 'does not exist, reported by', 'request token for activation.'].every(message => message.includes(message))) {
        return 'Użytkownik przypisany do tego kodu już nie istnieje.';
    }

    return 'Wystąpił błąd';
}