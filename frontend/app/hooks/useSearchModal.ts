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
    step: string;
    query: SearchQuery;
    open: (step?: string) => void;
    close: () => void;
    setQuery: (query: Partial<SearchQuery>) => void;
}

const useSearchModal = create<SearchModalStore>((set) => ({
    isOpen: false,
    step: 'location',
    query: {
        country: '',
        guests: null,
        bathrooms: null,
        bedrooms: null,
        checkIn: null,
        checkOut: null,
        category: '',
    },
    open: (step = 'location') => set({ isOpen: true, step }),
    close: () => set({ isOpen: false, step: 'location' }),
    setQuery: (query) => set((state) => ({ query: { ...state.query, ...query } })),
}));

export default useSearchModal;
