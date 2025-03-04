import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

/*  
==================================
🚀 TODO LIST 
==================================

✅ 1. Webpack 5에서 'crypto' 모듈 문제 해결 (혹시 실행하는 버전에서 문제 있을 경우)
   - axios를 사용할 때 Webpack 5가 더 이상 'crypto' 모듈을 자동 포함하지 않음.
   - 해결 방법:
     ➜ 필요한 polyfill 패키지 설치:
       `npm install crypto-browserify stream-browserify assert stream-http https-browserify os-browserify url buffer`
     ➜ Webpack fallback 설정 추가:
       package.json → `"browser": { "crypto": "crypto-browserify" }` 추가

✅ 2. Django 백엔드 `talk` API 연동 (💡 필요) 
   - 현재 프론트엔드에서만 채팅을 처리하고 있음.
   - Django API (`/api/talk/:memoryId/`) 호출하여 실제 데이터 연동 필요.

*/

// import axios from "axios";

// const Chat = ({ memoryId }) => {
//   const [messages, setMessages] = useState([
//     { type: "gpt", text: "안녕하세요! 무엇을 도와드릴까요?" }
//   ]);
//   const [inputText, setInputText] = useState("");
//   const messagesEndRef = useRef(null);

//   // 백엔드 API로 메시지 전송 및 응답 받기
//   const sendMessageToServer = async (message) => {
//     if (!memoryId) {
//       alert("먼저 이미지를 업로드하세요.");
//       return;
//     }

//     try {
//       const response = await axios.post( 
//         `http://127.0.0.1:8000/api/talk/${memoryId}/`, // django talk api 호출로 변경
//         { content: message }
//       );

//       return response.data.content; // GPT 응답 텍스트 반환
//     } catch (error) {
//       console.error("서버 요청 오류:", error);
//       return "서버와의 연결이 원활하지 않습니다.";
//     }
//   };

//   // 메시지 전송 함수
//   const handleSendMessage = async () => {
//     if (inputText.trim() === "") return;

//     const newMessage = { type: "user", text: inputText };
//     setMessages((prevMessages) => [...prevMessages, newMessage]); // 사용자 메시지 추가
//     setInputText("");

//     // 서버에 요청 보내기
//     const gptResponse = await sendMessageToServer(inputText);
//     const gptMessage = { type: "gpt", text: gptResponse };

//     setMessages((prevMessages) => [...prevMessages, gptMessage]); // GPT 응답 추가
//   };


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


  // Enter 키 이벤트
  const handleKeyDown = (e) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // 채팅 자동 스크롤 설정
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
