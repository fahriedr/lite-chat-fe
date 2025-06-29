import type { Conversation, Message } from '../types'
import { create } from 'zustand'

interface SelectedConversation {
    _id?: string
    name: string,
    friendId: string,
    friendAvatar: string
}


interface conversationState {
    selectedConversation: SelectedConversation | null,
    conversation: Conversation[] | [],
    loading: boolean,
    setSelectedConversation: (props: SelectedConversation) => void,
    conversationAction: (props: Conversation[]) => void
    conversationLoadingAction: (props: boolean) => void
    resetConversation: () => void
    messageUpdate: (props: Message) => void
    updateUnreadMessage: () => void
}

export const useConversationStore = create<conversationState>()((set) => ({
    selectedConversation: null,
    conversation: [],
    loading: false,
    setSelectedConversation: (props: SelectedConversation) => set(() => ({ selectedConversation: props })),
    conversationLoadingAction: (props: boolean) => set(() => ({ loading: props })),
    conversationAction: (props: any) => set(() => ({ conversation: props})),
    resetConversation: () => set(() => ({ conversation: [] })),
    messageUpdate: (newMessage: Message) =>
        set((state) => {
            // // Find conversation that matches either sender or receiver ID
            const conversationIndex = state.conversation.findIndex((conv) => {
                return conv.participants._id === newMessage.senderId || conv.participants._id === newMessage.receiverId
            });

            if (conversationIndex === -1) return {};

            const updatedConversation = { ...state.conversation[conversationIndex] };
            // Add new message to the beginning of messages array or replace index 0
            updatedConversation.messages = [newMessage, ...updatedConversation.messages.slice(1)];

            // Optionally move this conversation to the top (like recent chats)
            const updatedConversations = [...state.conversation];
            updatedConversations.splice(conversationIndex, 1);
            updatedConversations.unshift(updatedConversation);

            return { conversation: updatedConversations };
        }),
    updateUnreadMessage: () => set((state) => {

        const conversation = state.conversation.find((conv) => {
            return conv.participants._id === state.selectedConversation?.friendId
        })

        if (conversation) {
            if(conversation.unreadMessage > 0) {
                conversation.unreadMessage -= 1
            }
        }
        return {}
    }),
}))