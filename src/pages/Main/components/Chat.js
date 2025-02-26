import styled from "styled-components";

const Chat = () => {
  return <ChatContainer>챗봇영역</ChatContainer>;
};

export default Chat;

const ChatContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid black;
  flex-grow: 2;
  width: 100%;
  height: 100%;
`;
