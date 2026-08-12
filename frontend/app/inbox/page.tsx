import { getUserId, getAccessToken } from "../lib/actions";
import React from 'react';
import Conversation from "../components/inbox/Conversation";

export type UserType = {
    id: string;
    name: string;
    avatar_url: string;
}

export type ConversationType = {
    id: string;
    users: UserType[];
}

const InboxPage = async () => {
    const userId = await getUserId();

    if (!userId) {
        return (
            <main className="max-w-[1500px] max-auto px-6 py-12">
                <p>You need to be authenticated to view your inbox.</p>
            </main>
        )
    }

    const token = await getAccessToken();

    if (!token) {
        return (
            <main className="max-w-[1500px] max-auto px-6 py-12">
                <p>Authentication token not available.</p>
            </main>
        )
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/chat/`, {
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
                <p>Error loading conversations. Status: {res.status}</p>
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

    const conversations = await res.json();

    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6 space-y-4">
            <h1 className="my-6 text-2xl">Inbox</h1>

            {conversations.map((conversation: ConversationType) => {
                return (
                    <Conversation 
                        userId={userId}
                        key={conversation.id}
                        conversation={conversation}
                    />
                )
            })}
        </main>
    )
}

export default InboxPage;
