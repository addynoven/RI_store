"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export interface WishlistItem {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  category?: string;
  slug: string;
}

interface WishlistContextType {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  toggleItem: (item: WishlistItem) => void;
  clearWishlist: () => void;
  getItemCount: () => number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      try {
        setItems(JSON.parse(savedWishlist));
      } catch (e) {
        console.error("Failed to parse wishlist from localStorage");
      }
    }
    setIsLoaded(true);
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("wishlist", JSON.stringify(items));
    }
  }, [items, isLoaded]);

  const addItem = (item: WishlistItem) => {
    setItems((prev) => {
      if (prev.find((i) => i.id === item.id)) {
        return prev;
      }
      return [...prev, item];
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const isInWishlist = (id: string) => {
    return items.some((item) => item.id === id);
  };

  const toggleItem = (item: WishlistItem) => {
    if (isInWishlist(item.id)) {
      removeItem(item.id);
    } else {
      addItem(item);
    }
  };

  const clearWishlist = () => {
    setItems([]);
  };

  const getItemCount = () => {
    return items.length;
  };

  return (
    <WishlistContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        isInWishlist,
        toggleItem,
        clearWishlist,
        getItemCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
