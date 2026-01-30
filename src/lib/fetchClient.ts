declare global {
  interface Window {
    csrfToken: string;
  }
}

type FetchOptions = RequestInit & { retry?: boolean };

export async function fetchClient(url: string, options: FetchOptions = {}) {
  const res = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      ...options.headers,
      "x-csrf-token": window.csrfToken,
    },
  });

  //if access token expired
  if (res.status === 401 && !options.retry) {
    const refreshToken = await fetch("/api/auth/refresh", {
      method: "POST",
      credentials: "include",
    });

    if (refreshToken.ok) {
      return fetchClient(url, { ...options, credentials: "include", retry: true });
    }
  }
  return res;
}
