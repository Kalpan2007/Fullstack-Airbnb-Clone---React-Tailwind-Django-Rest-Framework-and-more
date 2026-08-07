import { create } from "zustand";

interface SearchQuery {
    country: string;
    guests: number | null;
    bathrooms: number | null;
    bedrooms: number | null;
    checkIn: Date | null;
    checkOut: Date | null;
    category: string;
}

interface SearchModalStore {
    isOpen: boolean;
    query: SearchQuery;
    open: () => void;
    close: () => void;
    setQuery: (query: Partial<SearchQuery>) => void;
}

const useSearchModal = create<SearchModalStore>((set) => ({
    isOpen: false,
    query: {
        country: '',
        guests: null,
        bathrooms: null,
        bedrooms: null,
        checkIn: null,
        checkOut: null,
        category: '',
    },
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
    setQuery: (query) => set((state) => ({ query: { ...state.query, ...query } })),
}));

export default useSearchModal;
