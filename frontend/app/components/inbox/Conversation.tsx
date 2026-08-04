"use client";

import { useRouter } from "next/navigation";

interface ConversationProps {
  id: string;
  name: string;
}

const Conversation: React.FC<ConversationProps> = ({ id, name }) => {
  const router = useRouter();

  return (
    <div className="px-6 py-4 cursor-pointer border border-gray-300 rounded-xl">
      <p className="mb-6 text-xl">{name}</p>

      <p
        onClick={() => router.push(`/inbox/${id}`)}
        className="text-airbnb-dark"
      >
        Go to conversation
      </p>
    </div>
  );
};

export default Conversation;
