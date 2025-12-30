import { createContext, useContext, useEffect, useMemo, useState } from "react";

const FavouritesContext = createContext(null);

const STORAGE_KEY = "favouritePropertyIds";

export function FavouritesProvider({ children }) {
  // Store ONLY property IDs (simple + easy to prevent duplicates)
  const [ids, setIds] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  }, [ids]);

  function addFavourite(id) {
    setIds((prev) => (prev.includes(id) ? prev : [...prev, id])); // prevent duplicates
  }

  function removeFavourite(id) {
    setIds((prev) => prev.filter((x) => x !== id));
  }

  function clearFavourites() {
    setIds([]);
  }

  const value = useMemo(
    () => ({
      favouriteIds: ids,
      addFavourite,
      removeFavourite,
      clearFavourites,
      isFavourite: (id) => ids.includes(id),
    }),
    [ids]
  );

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
}

export function useFavourites() {
  const ctx = useContext(FavouritesContext);
  if (!ctx)
    throw new Error("useFavourites must be used inside FavouritesProvider");
  return ctx;
}
