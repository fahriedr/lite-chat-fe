import { create } from 'zustand';
import type { Message } from '../types';

export interface MessagesState {
  messages: Message[];
  setMessage: (props: Message[]) => void;
  addMessage: (props: Message) => void;
}

const initialState: Message[] = [];

export const useMessageStore = create<MessagesState>((set) => ({
  messages: initialState,
  setMessage: (props: Message[]) => {
    set({ messages: props });
  },
  addMessage: (props: Message) => {
    set((state) => ({
      messages: [...state.messages, props],
    }));
  },
}));
