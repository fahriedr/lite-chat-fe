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
    avatar: '',
    _id: ''
}

export const useUserStore = create<UserState>()((set) => ({
    user: initialState,
    userAction: (props: User) => set(() => ({ user: props })),
    resetUser: () => set(() => ({user: null}))
}))