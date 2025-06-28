import React, { type ChangeEvent } from "react";

interface ChatInputProps {
  onSendMessage?: (message: string) => void;
}

const ChatInput = ({ onSendMessage, ...props }: ChatInputProps) => {
  const [text, setText] = React.useState<string>("");
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    adjustTextareaHeight();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevents new line on Enter
      if (text.trim() !== "") {
        onSendMessage?.(text.trim());
        setText("");
        resetTextareaHeight();
      }
    }
  };

  const handleClickSend = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (text.trim() !== "") {
      onSendMessage?.(text.trim());
      setText("");
      resetTextareaHeight();
    }
  }

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Expand
    }
  };

  const resetTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "40px"; // Reset to default height
    }
  };

  return (
    <div className="bg-[#202C33] px-4 py-4 flex items-center mt-4">
      {/* Emoji Icon */}
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path
            opacity=".45"
            fill="#8696A0"
            d="M9.153 11.603c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zm-3.204 1.362c-.026-.307-.131 5.218 6.063 5.551 6.066-.25 6.066-5.551 6.066-5.551-6.078 1.416-12.129 0-12.129 0zm11.363 1.108s-.669 1.959-5.051 1.959c-3.505 0-5.388-1.164-5.607-1.959 0 0 5.912 1.055 10.658 0zM11.804 1.011C5.609 1.011.978 6.033.978 12.228s4.826 10.761 11.021 10.761S23.02 18.423 23.02 12.228c.001-6.195-5.021-11.217-11.216-11.217zM12 21.354c-5.273 0-9.381-3.886-9.381-9.159s3.942-9.548 9.215-9.548 9.548 4.275 9.548 9.548c-.001 5.272-4.109 9.159-9.382 9.159zm3.108-9.751c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962z"
          ></path>
        </svg>
      </div>

      {/* Expandable Textarea */}
      <div className="flex-1 mx-4">
        <textarea
          ref={textareaRef}
          className="w-full rounded px-3 py-2 bg-[#2A3942] outline-none resize-none text-white"
          rows={1}
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          style={{
            overflow: "hidden",
            minHeight: "40px",
            maxHeight: "150px",
          }}
        />
      </div>

      {/* Send Icon */}
      <div onClick={handleClickSend} className="cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M22 2L11 13" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M22 2L15 22L11 13L2 9L22 2Z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
};

export default ChatInput;