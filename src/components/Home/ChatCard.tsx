import { useConversationStore } from '../../stores/conversation';
import { useEffect } from 'react'
import ChatPanel from '../Home/ChatPanel';
import EmptyChatPanel from '../Home/EmptyChatPanel';
import SidePanel from '../Home/SidePanel';
import { useMessageStore } from '../../stores/messages';
import Loading from '../Loading';
import { pusherClient } from '../../lib/pusher-helper';
import { type Message } from '../../types';
import { useUserStore } from '../../stores/user';
import SearchPanel from './SearchPanel';
import { useSearchPanelStore } from '../../stores/search-panel';

const ChatCard = () => {

  const { loading, selectedConversation, messageUpdate } = useConversationStore(state => state);
  const { addMessage } = useMessageStore(state => state);
  const { user } = useUserStore((state) => state)
  const userId = user?._id
  const { isOpen } = useSearchPanelStore((state) => state)

  useEffect(() => {
    pusherClient.subscribe('lite-chat');

    const handleMessage = (message: Message) => {
      if (message.receiverId === userId) {
        messageUpdate(message)
        if (message.senderId === selectedConversation?.friendId) {
          addMessage(message);
        }
      }
    };

    pusherClient.bind('upcoming-message', handleMessage);

    return () => {
      pusherClient.unbind('upcoming-message', handleMessage);
      pusherClient.unsubscribe('lite-chat');
    };
  });


  const renderChatPanel = () => {
    if (!selectedConversation) return <EmptyChatPanel />;
    if (loading) return (
      <div className='flex flex-col justify-center items-center w-full h-full'>
        <Loading />
      </div>
    );
    return <ChatPanel />;
  };

  return (
    <div className='flex bg-[#111B21] w-full h-full'>
      <SearchPanel isOpen={isOpen} />
      <SidePanel />
      {renderChatPanel()}
    </div>
  );
}

export default ChatCard