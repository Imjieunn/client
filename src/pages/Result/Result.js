import styled from "styled-components";

const Result = () => {
  const goToResultPage = () => {
    window.open("https://www.google.com", "_blank");
  };
  return (
    <Container>
      <Title>결과 확인⬇️</Title>
      <Link onClick={goToResultPage}>www.google.com</Link>
    </Container>
  );
};

export default Result;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;
const Title = styled.div`
  font-size: 50px;
  font-weight: bold;
`;
const Link = styled.div`
  font-size: 25px;
`;
