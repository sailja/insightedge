export async function fetchCurrentUser() {
  const res = await fetch("/api/protected", {
    credentials: "include",
  });

  if (!res.ok) {
    return null;
  }

  const data = await res.json();
  return data.user;
}
