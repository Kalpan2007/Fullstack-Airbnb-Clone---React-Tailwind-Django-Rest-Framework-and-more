"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useLoginModal from "@/app/hooks/useLoginModal";
import apiService from "@/app/services/apiService";

interface FavoriteButtonProps {
    id: string;
    is_favorite: boolean;
    markFavorite: (is_favorite: boolean) => void;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
    id,
    is_favorite,
    markFavorite,
}) => {
    const router = useRouter();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const toggleFavorite = async (e: any) => {
        e.stopPropagation();

        setIsLoading(true);

        const response = await apiService.post(`/api/properties/${id}/toggle_favorite/`, {});

        if (response.is_favorite !== undefined) {
            markFavorite(response.is_favorite);
        } else {
            loginModal.open();
        }

        setIsLoading(false);
    };

    return (
        <div
            onClick={toggleFavorite}
            className="absolute top-2 right-2 cursor-pointer"
        >
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill={is_favorite ? "red" : "none"}
                stroke="currentColor"
                strokeWidth="2"
                className="text-white drop-shadow-lg"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
            </svg>
        </div>
    );
};

export default FavoriteButton;
