import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Profile = { name: string; phone: string; createdAt: string };

const STORAGE_KEY = "astro-sadhna-profile";

type Ctx = {
  profile: Profile | null;
  saveProfile: (p: Omit<Profile, "createdAt">) => void;
  clearProfile: () => void;
};

const ProfileContext = createContext<Ctx | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setProfile(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  const saveProfile: Ctx["saveProfile"] = (p) => {
    const next: Profile = { ...p, createdAt: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setProfile(next);
  };

  const clearProfile = () => {
    localStorage.removeItem(STORAGE_KEY);
    setProfile(null);
  };

  return (
    <ProfileContext.Provider value={{ profile, saveProfile, clearProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile must be used within ProfileProvider");
  return ctx;
};
