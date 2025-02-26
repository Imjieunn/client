import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Image from "./components/Image";
import Chat from "./components/Chat";

const Main = () => {
  const navigate = useNavigate();

  const handleTakeResult = () => {
    navigate("/result");
  };

  return (
    <Container>
      <Image />
      <Chat />
      <ResultBtn onClick={handleTakeResult}>감정 결과 확인</ResultBtn>
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

const ResultBtn = styled.button`
  padding: 10px 20px;
  background-color: #f58220;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #cb6015;
  }
`;
