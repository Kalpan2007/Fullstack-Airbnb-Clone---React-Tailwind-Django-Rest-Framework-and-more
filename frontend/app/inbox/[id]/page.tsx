import { getUserId, getAccessToken } from "../../lib/actions";
import ConversationDetail from "@/app/components/inbox/ConversationDetail";
import { UserType } from "../page";

export type MessageType = {
    id: string;
    body: string;
    sent_to: UserType;
    created_by: UserType;
}

const ConversationPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const userId = await getUserId();
    const token = await getAccessToken();

    if (!userId || !token) {
        return (
            <main className="max-w-[1500px] max-auto px-6 py-12">
                <p>You need to be authenticated to view this conversation.</p>
            </main>
        )
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/chat/${id}/`, {
        cache: 'no-store',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!res.ok) {
        return (
            <main className="max-w-[1500px] max-auto px-6 py-12">
                <p>Error loading conversation. Status: {res.status}</p>
            </main>
        )
    }

    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
        const text = await res.text();
        return (
            <main className="max-w-[1500px] max-auto px-6 py-12">
                <p>Expected JSON but got: {contentType}</p>
                <p>Response: {text.substring(0, 500)}</p>
            </main>
        )
    }

    const conversation = await res.json();

    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6">
            <ConversationDetail 
                token={token}
                userId={userId}
                messages={conversation.messages}
                conversation={conversation.conversation}
            />
        </main>
    )
}

export default ConversationPage;
