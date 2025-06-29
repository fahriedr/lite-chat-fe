"use client"

import { useEffect } from "react";
import ContactCard from "../../components/Home/ContactCard";
import { getMessagesApi } from "../../utils/api/messagesApi";
import { useMessageStore } from "../../stores/messages";
import { useConversationStore } from "../../stores/conversation";
import { lastText, logout } from "../../lib/helpers";
import { useUserStore } from "../../stores/user";
import Loading from "../Loading";
import { NewChat } from "../../icons/NewChat";
import { useSearchPanelStore } from "../../stores/search-panel";
import Tooltip from "../Tooltip";
import { type FetchProps, swrFetcher } from "../../lib/useSwr-helper";
import useSWR from "swr";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const SidePanel = () => {

  const navigate = useNavigate();

  const { resetUser } = useUserStore();
  const { setMessage } = useMessageStore((state) => state);
  const { setSearchPanelStatus } = useSearchPanelStore((state) => state)

  const {
    conversation,
    conversationAction,
    setSelectedConversation,
    conversationLoadingAction,
    resetConversation,
  } = useConversationStore((state) => state);

  //Fetch Conversation
  const fetchProps: FetchProps = {
    url: `${import.meta.env.VITE_API_URL}/conversations`,
    method: 'get'
  };

  const { data: conversations, error, isLoading } = useSWR(
    [fetchProps.url, fetchProps.method],
    () => swrFetcher(fetchProps)
  );

  const panelOnClick = async (data: any) => {
    conversationLoadingAction(true);
    try {
      const dataConversation = {
        _id: data._id,
        name: data.participants.fullname,
        friendId: data.participants._id,
        friendAvatar: data.participants.avatar,
      };
      setSelectedConversation(dataConversation);
      const res = await getMessagesApi(data.participants._id);

      setMessage(res?.data.data.reverse())
      conversationLoadingAction(false);
    } catch (err) {
      console.error(err);
    } finally {
      conversationLoadingAction(false);
    }
  };

  const newChatOnClick = async () => {
    setSearchPanelStatus(true)
  }

  const logoutClick = async () => {
    const res = await logout();
    if (res) {
      resetUser()
      resetConversation()
      navigate("/login")
    }
  };

  useEffect(() => {
    if (error) {
      navigate('/login');
    }
  }, [error, navigate]);

  useEffect(() => {
    if (conversations) {
      conversationAction(conversations.data);
    }
  }, [conversations, conversationAction]);

  return (
    <div className="flex flex-col h-full w-[568px] border-r-[1px] border-gray-700">

      {/* Header */}
      <div className="flex flex-row w-full justify-between mb-2 py-4 px-2 items-center bg-[#202C33]">
        <span className="font-bold text-2xl">Chats</span>
        <div className="flex flex-row space-x-4 items-center">
          <Tooltip text="Start new chat">
            <div className="cursor-pointer rounded-full p-[8px] hover:bg-gray-500" onClick={newChatOnClick}>
              <NewChat />
            </div>
          </Tooltip>
          <Tooltip text="Logout">
            <div className="cursor-pointer hover:bg-gray-700 rounded-full p-2" onClick={logoutClick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M17 16l4-4m0 0l-4-4m4 4H7" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M13 4H7a2 2 0 00-2 2v12a2 2 0 002 2h6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </Tooltip>
        </div>
      </div>

      {/* Contact */}
      <div className="flex flex-col overflow-auto h-full">
        <div className="flex flex-col h-full">
          {
            isLoading ?
              <div className="flex justify-center place-items-center w-full h-full">
                <Loading />
              </div>
              :
              (
                <AnimatePresence>
                  {conversation.map((data) => (
                    <motion.div
                      key={data.participants._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      layout // This enables smooth position change when order updates
                    >
                      <ContactCard
                        id={data.participants._id}
                        name={data.participants.fullname}
                        lastText={lastText(data.messages[0]?.message || "")}
                        time={data.messages[0]?.createdAt}
                        onPress={() => panelOnClick(data)}
                        avatar={data.participants.avatar as string}
                        unreadMessage={data.unreadMessage}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              )
          }
        </div>
      </div>
    </div>
  );
};

export default SidePanel;
