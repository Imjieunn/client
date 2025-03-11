import Image from "./components/Image";
import Chat from "./components/Chat";
import React, { useState } from "react";
import styled from "styled-components";
import Header from "./components/Header";
import { patchChat } from "./api/MainApi";
import { useNavigate } from "react-router-dom";

const MChat = () => {
  const navigate = useNavigate();
  const [chatData, setChatData] = useState(null);

  const handleTakeResult = async () => {
    if (!chatData) return;

    try {
      const memoryId = chatData?.memory_id;
      const response = await patchChat({ memoryId });

      if (response.url) {
        navigate("/result", { state: { resultUrl: response.url } });
      } else {
        alert("결과 URL이 없습니다.");
      }
    } catch (error) {
      console.error("patchChat 실패:", error);
      alert("회상 종료 요청에 실패했습니다.");
    }
  };

  return (
    <Container>
      <Header />
      <ContentsContainer>
        <Contents>
          <ChatContainer>
            <Image onImageUpload={setChatData} />
            <Chat initialMessage={chatData} isDisabled={!chatData} />
          </ChatContainer>
          <BottomContainer>
            <ResultButton onClick={handleTakeResult} disabled={!chatData}>
              결과 보러가기
            </ResultButton>
            <Logo src="/img/miraeasset.jpg" />
          </BottomContainer>
        </Contents>
      </ContentsContainer>
    </Container>
  );
};

export default MChat;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  // width: 100%;
  height: 100%;
  // background-color: #f8f9fc;
  font-family: Arial, sans-serif;
`;

const ContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  // border: 1px solid black;
  align-items: center;
  justify-content: center; /* 추가 */
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  height: 90%;
  // border: 1px solid black;
  align-items: center;
  justify-content: center;
`;

const ChatContainer = styled.div`
  display: flex;
  flex: 8;
  width: 100%;
  height: 100%;
  // border: 1px solid red;
`;

const BottomContainer = styled.div`
  display: flex;
  flex: 1;
  border-top: 1px solid #ccc;
  width: 100%;
  align-items: center; /* 세로 중앙 정렬 */
  justify-content: center; /* 가로 중앙 정렬 */
  position: relative;
`;

const ResultButton = styled.button`
  background-color: #0055aa;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-right: auto; /* 버튼을 가운데 정렬하기 위해 자동 마진 추가 */

  &:hover {
    background-color: #0077cc;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const Logo = styled.img`
  width: 150px;
  height: auto;
  margin: 10px;
  position: absolute;
  right: 10px; /* 로고를 오른쪽 끝으로 이동 */
`;
