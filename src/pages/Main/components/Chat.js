import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const Chat = () => {
  const [messages, setMessages] = useState([
    { type: "gpt", text: "안녕하세요! 무엇을 도와드릴까요?" },
    { type: "user", text: "안녕하세요! 질문이 있어요." },
  ]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);

  const handleSendMessage = () => {
    if (inputText.trim() === "") return;

    const newMessage = { type: "user", text: inputText };
    setMessages([...messages, newMessage]);
    setInputText("");
  };

  const handleKeyDown = (e) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === "Enter") {
      handleSendMessage();
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
            {msg.text}
          </Message>
        ))}
        <div ref={messagesEndRef} />
      </MessagesContainer>
      <InputContainer>
        <ChatInput
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="메시지를 입력하세요..."
        />
        <SendButton onClick={handleSendMessage}>전송</SendButton>
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
  border: 2px solid black;
  flex-grow: 2;
  width: 100%;
  height: 100%;
  padding: 10px;
  gap: 10px;
`;

const MessagesContainer = styled.div`
  flex-grow: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;

  max-height: 400px; // 🔹 최대 높이 설정 (원하는 크기로 조정 가능)
  overflow-y: auto; // 🔹 내용이 많아지면 스크롤 추가
`;

const Message = styled.div`
  max-width: 70%;
  padding: 10px;
  border-radius: 10px;
  word-break: break-word;
  background-color: ${(props) =>
    props.type === "gpt" ? "#e0e0e0" : "#F58220"};
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
  &:focus {
    border: 2px solid #f58220;
    box-shadow: 0 0 5px rgba(245, 130, 32, 0.5);
  }
`;

const SendButton = styled.button`
  padding: 10px 15px;
  background-color: #f58220;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #cb6015;
  }
`;
