import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { postChat } from "../api/MainApi";

const Chat = ({ initialMessage, isDisabled }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isWaiting, setIsWaiting] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (initialMessage) {
      console.log("초기 메시지:", initialMessage);
      setMessages([initialMessage]);
    }
  }, [initialMessage]);

  const handleSendMessage = async () => {
    if (inputText.trim() === "" || isWaiting || !initialMessage) return;

    const userMessage = { type: "user", content: inputText };
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsWaiting(true);

    const formData = new FormData();
    formData.append("content", inputText);

    try {
      const response = await postChat({
        memoryId: initialMessage.memory_id,
        chatContent: formData,
      });
      setMessages((prev) => [...prev, response]);
    } catch (error) {
      console.error("채팅 전송 실패:", error);
      alert("메시지 전송 실패!");
    } finally {
      setIsWaiting(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <ChatContainer>
      <MessagesContainer>
        {messages.map((msg, index) => (
          <Message key={index} type={msg.type}>
            {msg.content}
          </Message>
        ))}
        <div ref={messagesEndRef} />
      </MessagesContainer>
      <InputContainer>
        <ChatInput
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="메시지를 입력하세요..."
          disabled={isWaiting || isDisabled}
        />
        <SendButton
          onClick={handleSendMessage}
          disabled={isWaiting || isDisabled}
        >
          전송
        </SendButton>
      </InputContainer>
    </ChatContainer>
  );
};

export default Chat;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 10px;
  flex-grow: 2;
  width: 100%;
  height: calc(100% - 40px);
  padding: 10px;
  gap: 10px;
  background-color: #f8f9fc;
`;

const MessagesContainer = styled.div`
  flex-grow: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;

  max-height: 400px;
  overflow-y: auto;
`;

const Message = styled.div`
  max-width: 70%;
  padding: 10px;
  border-radius: 10px;
  word-break: break-word;
  background-color: ${(props) =>
    props.type === "gpt" ? "#e0e0e0" : "#0055aa"};
  color: ${(props) => (props.type === "gpt" ? "#000" : "#fff")};
  align-self: ${(props) => (props.type === "gpt" ? "flex-start" : "flex-end")};
`;

const InputContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
`;

const ChatInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;

  outline: none;
  background-color: ${(props) => (props.disabled ? "#f0f0f0" : "white")};
  color: ${(props) => (props.disabled ? "#a0a0a0" : "#000")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "text")};

  &:focus {
    border: ${(props) =>
      props.disabled ? "1px solid #ccc" : "1px solid #0055aa"};
    box-shadow: ${(props) =>
      props.disabled
        ? "none"
        : "0 0 5px rgba(0, 85, 170, 0.5)"}; /* border 색상 (#0055aa)과 동일한 box-shadow */
  }
`;

const SendButton = styled.button`
  padding: 10px 15px;
  background-color: ${(props) => (props.disabled ? "#ccc" : "#0055aa")};
  color: ${(props) => (props.disabled ? "#888" : "white")};
  border: none;
  border-radius: 5px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

  &:hover {
    background-color: ${(props) => (props.disabled ? "#ccc" : "#0077cc")};
  }
`;
