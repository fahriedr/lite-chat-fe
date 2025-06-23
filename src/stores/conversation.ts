import { create } from 'zustand'

interface Conversation {
    _id: string
    name: string,
    friendId: string,
    friendAvatar: string
}

export interface conversationState {
    conversation: Conversation | null,
    conversationAction: (props: Conversation) => void
}

export const useConversationStore = create<conversationState>()((set) => ({
    conversation: null,
    conversationAction: (props: Conversation) => set((state: conversationState) => ({ conversation: props })),
}))