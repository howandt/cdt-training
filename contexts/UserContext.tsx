"use client";

import { createContext, useContext, useEffect, useState } from "react";

// Typen for brugerinfo
export type UserInfo = {
  name: string;
  type: "test" | "basic" | "pro";
  canSave: boolean;
};

const defaultUser: UserInfo = {
  name: "Test",
  type: "test",
  canSave: false,
};

const UserContext = createContext<UserInfo>(defaultUser);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserInfo>(defaultUser);

  useEffect(() => {
  const params = new URLSearchParams(window.location.search);

  const name =
    params.get("name") ||
    localStorage.getItem("cdt_user") ||
    "Gæst"; // ⬅️ Opdateret: fallback navn

  const type =
    (params.get("type") as "test" | "basic" | "pro") ||
    localStorage.getItem("cdt_user_type") ||
    "test"; // ⬅️ Opdateret: fallback type

  localStorage.setItem("cdt_user", name);
  localStorage.setItem("cdt_user_type", type);

  setUser({
    name,
    type,
    canSave: type === "basic" || type === "pro",
  });
}, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

// Hook til brug i komponenter
export function useUser() {
  return useContext(UserContext);
}
