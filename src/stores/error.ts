import { create } from 'zustand'

export interface ErrorState {
    isError: boolean
    errorMessage: string | null
    setError: () => void
}

export const useError = create<ErrorState>((set) => ({
    isError: false,
    errorMessage: null,
    setError: () => set(() => ({ isError: true })),
}))