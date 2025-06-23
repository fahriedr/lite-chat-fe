import { create } from 'zustand'
import type { User } from '../types'

export interface UserState {
    user: User | null,
    userAction: (props: User) => void,
    resetUser: () => void
}

const initialState: User = {
    username: '',
    fullname: '',
    email: '',
    avatar: ''
}

export const useUserStore = create<UserState>()((set) => ({
    user: null,
    userAction: (props: User) => set((state) => ({ user: props })),
    resetUser: () => set((state) => ({user: null}))
}))