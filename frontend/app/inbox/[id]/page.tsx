import ConversationDetail from "@/app/components/inbox/ConversationDetail";

const ConversationPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6">
      <h1 className="my-6 text-2xl">Conversation {id}</h1>

      <ConversationDetail />
    </main>
  );
};

export default ConversationPage;
