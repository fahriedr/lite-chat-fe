"use client"

import { useConversationStore } from "../../stores/conversation";
import { useMessageStore } from "../../stores/messages";
import { sendMessageApi, updateMessageStatusApi } from "../../utils/api/messagesApi";
import { useEffect, useRef } from "react";
import ChatBubble from "../ChatBubble";
import ChatInput from "../ChatInput"
import { useUserStore } from "../../stores/user";
import Loading from "../Loading";

const ChatPanel = () => {

  const { user } = useUserStore((state) => state);
  const { messages, addMessage } = useMessageStore((state) => state);
  const { selectedConversation, loading, messageUpdate, updateUnreadMessage } = useConversationStore((state) => state);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const onSendMessage = async (message: string) => {
    const res = await sendMessageApi({
      data: {
        userId: selectedConversation?.friendId!,
        message: message,
      },
    });

    const newMessage = res?.data.data;
    if (newMessage) {
      addMessage(newMessage);
      // sendMessage(newMessage);
      messageUpdate(newMessage);
      setTimeout(scrollToBottom, 100); // Ensure scrolling after state updates
    }
  };

  const onSeen = async (id: string) => {
    await updateMessageStatusApi(id);

    updateUnreadMessage()
  };
  

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col w-full h-screen">
      {/* Header */}
      <div className="flex flex-row w-full px-4 items-center bg-[#202C33] h-[75px] py-[7px] justify-between">
        <div className="flex flex-row items-center">
          <img
            className="border-solid border rounded-full stroke-black"
            width={50}
            height={50}
            src={selectedConversation?.friendAvatar ?? "https://robohash.org/random"}
            alt=""
          />
          <span className="pl-[20px] font-semibold text-lg">
            {selectedConversation?.name}
          </span>
        </div>
      </div>

      {/* Messages */}
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col flex-1 overflow-y-auto bg-[url('/images/wa-bg.svg')] px-8">
          {messages.map((data, i) => (
            <ChatBubble
              key={i}
              id={data._id}
              createdAt={data.createdAt}
              message={data.message}
              isSender={user?._id == data.senderId}
              onSeen={onSeen}
              isRead={data.isRead ?? false}
            />
          ))}
          {/* Auto-scroll target */}
          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Input */}
      <ChatInput onSendMessage={onSendMessage} />
    </div>
  );
};


export default ChatPanel;
