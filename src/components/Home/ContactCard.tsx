import { useConversationStore } from "../../stores/conversation";
import moment from "moment";
import CircleChipBadge from "../../components/ChipBadge";
import type { Conversation } from "../../types";

interface Props {
  id?: string;
  name?: string;
  lastText?: string;
  time?: string;
  avatar?: string;
  unreadMessage?: number;
  onPress?: (conversation: Conversation) => void;
}

const ContactCard = ({ id, name, lastText, time, avatar = 'https://robohash/random', onPress, unreadMessage = 0 }: Props) => {

  const { selectedConversation } = useConversationStore((state) => state)

  const lastMessageTime = (date: any) => {
    const paramDate = moment(date).format('DD/MM/YY')

    const now = moment().format('DD/MM/YY')

    if (now === paramDate) {
      return moment(date).format('HH:mm')
    } else {
      return moment(date).format('DD/MM/YY')
    }
  }

  return (
    <>
      <div
        className={`px-2 py-3 flex items-center cursor-pointer hover:bg-hover-color transition duration-200 ${id && id === selectedConversation?.friendId ? 'bg-hover-color' : ''}`}
        onClick={onPress}
      >
        {/* Avatar */}
        <div>
          <img
            className="border-solid border border-gray-600 rounded-full"
            width={50}
            height={50}
            src={avatar}
            alt=""
          />
        </div>

        {/* Message Content */}
        <div className="ml-4 flex flex-1 flex-row justify-between items-center border-b border-gray-700 py-2">
          <div className="flex flex-col">
            <p className="text-white font-medium">{name}</p>
            <p className="text-gray-400 mt-1 text-sm truncate">{lastText}</p>
          </div>

          <div className="flex flex-row items-center gap-2">
            {
              unreadMessage > 0 ?
              <div className="notification">
                <CircleChipBadge
                  label={unreadMessage}
                  color="green" // Options: blue, green, red, yellow, purple, gray
                  size="sm"    // Options: sm, md, lg
                />
              </div>
              :
              <></>
            }
            <div className="flex flex-row">
              <p className="text-xs text-gray-400">{lastMessageTime(time)}</p>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default ContactCard;
