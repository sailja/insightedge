"use client";

import { useAuth } from "@/src/context/AuthContext";

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Redirecting to login...</div>;
  }

  return (
    <div>
      <h1>Welcome {user.email}</h1>
      <p>Role: {user.role}</p>
      <p>Permissions: {user.permissions.join(", ")}</p>

      <button onClick={logout}>Logout</button>
    </div>
  );
}
