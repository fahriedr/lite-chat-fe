import Cookies from "js-cookie";
import moment from "moment";
import React from "react";

interface Props {
  id: string
  createdAt: string
  message: string
  isSender: boolean
  onSeen: () => void
  isRead: boolean
}

const ChatBubble = ({ id, createdAt, message, isRead, isSender  }: Props) => {
  const userId = JSON.parse(Cookies.get("user")!)._id;

  return (
    <div className={`flex ${isSender ? "justify-end" : "justify-start"} my-[1px]`}>
      <div
        className={`flex flex-row w-fit max-w-[60%] px-[6px] py-[6px] min-w-[80px] rounded-lg shadow-md ${
          isSender
            ? "bg-[#075E54] text-white rounded-tl-lg rounded-bl-lg rounded-br-lg"
            : "bg-[#202D34] text-white rounded-tr-lg rounded-br-lg rounded-bl-lg"
        }`}
      >
        <p className="break-words text-[15px] px-1">{message}</p>
        <p className="text-[11px] text-[#8696A0] self-end mt-1">
          {moment(createdAt).format("HH:mm")}
        </p>
      </div>
    </div>
  );
};

export default ChatBubble;