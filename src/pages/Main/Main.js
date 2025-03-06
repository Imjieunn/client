import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Image from "./components/Image";
import Chat from "./components/Chat";
import { patchChat } from "./api/MainApi";
import { useState } from "react";

const Main = () => {
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
      <LogoImg src="/img/miraeasset.jpg" />
      <Image onImageUpload={setChatData} />
      <Chat initialMessage={chatData} isDisabled={!chatData} />
      <ResultBtn onClick={handleTakeResult} disabled={!chatData}>
        감정 결과 확인
      </ResultBtn>
    </Container>
  );
};

export default Main;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  height: 100%;
`;

const LogoImg = styled.img`
  width: 200px;
  height: auto;
`;

const ResultBtn = styled.button`
  padding: 10px 20px;
  background-color: ${({ disabled }) => (disabled ? "#ccc" : "#f58220")};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  font-size: 16px;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#ccc" : "#cb6015")};
  }
`;
