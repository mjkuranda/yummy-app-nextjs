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

export function throwApiError(res: ApiErrorResponse): never {
    switch (res.statusCode) {
    case 400:
        throw new BadRequestError(res.message, res.context);
    case 401:
        throw new UnauthorizedError(res.message);
    case 403:
        throw new ForbiddenError(res.message);
    }

    throw new Error('Unexpected error occurred.');
}

export function handleApiError(err: ApiError, router: AppRouterInstance, userContext: UserContextValues): void {
    if (err instanceof UnauthorizedError) {
        toastInfo('Your session has expired. You need to sign in again.');
        router.push('/users/login');
        userContext.logoutUser();
    }

    if (err instanceof ForbiddenError) {
        toastError('You are not authorized to perform admin actions.');
        router.push('/');
    }
}

function getBadRequestMessage(message: string, context: ApiErrorContext): string {
    if (message.startsWith('Incorrect credentials')) {
        return 'Incorrect credentials';
    }

    if (message.includes('login has already exists')) {
        return 'Provided login has already exists';
    }

    return 'Bad request message';
}