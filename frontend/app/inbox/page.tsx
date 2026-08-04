import Conversation from "../components/inbox/Conversation";

const conversations = [
  { id: "1", name: "John Doe" },
  { id: "2", name: "Jane Smith" },
];

const InboxPage = () => {
  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6 space-y-4">
      <h1 className="my-6 text-2xl">Inbox</h1>

      {conversations.map((conversation) => (
        <Conversation
          key={conversation.id}
          id={conversation.id}
          name={conversation.name}
        />
      ))}
    </main>
  );
};

export default InboxPage;
