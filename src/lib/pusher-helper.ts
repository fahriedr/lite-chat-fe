import Pusher from "pusher";
import PusherClient from "pusher-js";

export const pusherServer = new Pusher({
    appId: import.meta.env.VITE_PUSHER_APP_ID!,
    key: import.meta.env.VITE_PUSHER_KEY!,
    secret: import.meta.env.VITE_PUSHER_SECRET!,
    cluster: import.meta.env.VITE_PUSHER_CLUSTER!,
})

export const pusherClient = new PusherClient(
    import.meta.env.VITE_PUSHER_KEY!,
    {
        cluster: import.meta.env.VITE_PUSHER_CLUSTER!
    }
)