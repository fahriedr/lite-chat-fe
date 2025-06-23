
import { pusherServer } from "../../lib/pusher-helper"
import type { Message } from "../../types"

export const sendMessage = async (message: Message) => {
    try {
        await pusherServer.trigger('lite-chat', 'upcoming-message', message)
    } catch (error: any) {
        throw new Error(error.message)
    }
}