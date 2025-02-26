import styled from "styled-components";
import Image from "./components/Image";
import Chat from "./components/Chat";

const Main = () => {
  return (
    <Container>
      <Image />
      <Chat />
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
