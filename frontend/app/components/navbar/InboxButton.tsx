'use client';

import { useRouter } from "next/navigation";
import useLoginModal from "@/app/hooks/useLoginModal";

interface InboxButtonProps {
    userId: string | null;
}

const InboxButton: React.FC<InboxButtonProps> = ({ userId }) => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const handleClick = () => {
        if (userId) {
            router.push('/inbox');
        } else {
            loginModal.open();
        }
    };

    return (
        <div 
            onClick={handleClick}
            className="p-2 border rounded-full cursor-pointer hover:bg-gray-100 transition"
        >
            <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
            </svg>
        </div>
    );
};

export default InboxButton;
