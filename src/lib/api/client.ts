import { API_BASE_URL } from '../config';

interface FetcherOptions extends RequestInit {
  maxRetries?: number;
}

// Exponential backoff: 500ms, 1000ms, 2000ms, ...
function getRetryDelay(attempt: number): number {
  return Math.min(500 * 2 ** attempt, 10_000);
}

function isRetryable(status: number): boolean {
  return status === 429 || (status >= 500 && status < 600);
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function fetcher<T>(
  endpoint: string,
  { maxRetries = 3, ...options }: FetcherOptions = {}
): Promise<T> {
  let lastError: ApiError | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    });

    if (res.ok) {
      return res.json() as Promise<T>;
    }

    lastError = new ApiError(res.status, `API Error: ${res.status}`);

    if (!isRetryable(res.status) || attempt === maxRetries) {
      break;
    }

    const retryAfter = res.headers.get('Retry-After');
    const delay = retryAfter
      ? parseInt(retryAfter, 10) * 1000
      : getRetryDelay(attempt);

    await wait(delay);
  }

  throw lastError;
}
