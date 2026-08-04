const ConversationPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6">
      <h1 className="my-6 text-2xl">Conversation {id}</h1>

      <div className="max-h-[400px] overflow-auto flex flex-col space-y-4">
        <div className="w-[80%] py-4 px-6 rounded-xl bg-gray-200">
          <p className="font-bold text-gray-500">John Doe</p>
          <p>Hello, is this property still available?</p>
        </div>

        <div className="w-[80%] ml-[20%] py-4 px-6 rounded-xl bg-blue-200">
          <p className="font-bold text-gray-500">Me</p>
          <p>Yes, it is available for your dates!</p>
        </div>
      </div>

      <div className="mt-4 py-4 px-6 flex border border-gray-300 space-x-4 rounded-xl">
        <input
          type="text"
          placeholder="Type your message..."
          className="w-full p-2 bg-gray-200 rounded-xl"
        />

        <div className="cursor-pointer py-4 px-6 bg-airbnb text-white rounded-xl">
          Send
        </div>
      </div>
    </main>
  );
};

export default ConversationPage;
