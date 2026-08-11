'use client';

import { useRouter } from "next/navigation";
import useLoginModal from "@/app/hooks/useLoginModal";
import apiService from "@/app/services/apiService";

interface ContactButtonProps {
    userId: string | null;
    landlordId: string;
}

const ContactButton: React.FC<ContactButtonProps> = ({ userId, landlordId }) => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const startConversation = async () => {
        if (!userId) {
            loginModal.open();
            return;
        }

        const response = await apiService.get(`/api/chat/start/${landlordId}/`);

        if (response.success) {
            router.push(`/inbox/${response.conversation_id}`);
        }
    };

    return (
        <div 
            onClick={startConversation}
            className="mt-6 py-4 px-6 w-full cursor-pointer bg-airbnb text-white rounded-xl hover:bg-airbnb-dark transition text-center"
        >
            Contact
        </div>
    );
};

export default ContactButton;
