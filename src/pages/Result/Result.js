import styled from "styled-components";
import { useLocation } from "react-router-dom";

const Result = () => {
  const location = useLocation();
  const resultUrl = location.state?.resultUrl;

  return (
    <Container>
      <LogoWrapper>
        <LogoImg src="/img/miraeasset.jpg" />
      </LogoWrapper>

      {resultUrl ? (
        <ResultImage src={resultUrl} alt="결과 이미지" />
      ) : (
        <ErrorMessage>결과 이미지가 없습니다.</ErrorMessage>
      )}
    </Container>
  );
};

export default Result;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 15px;
`;

const LogoWrapper = styled.div`
  margin-bottom: 5px;
`;

const LogoImg = styled.img`
  width: 200px;
  height: auto;
`;

const Title = styled.h2`
  margin-bottom: 10px;
  font-size: 30px;
`;

const ResultImage = styled.img`
  max-width: 200%;
  max-height: 1000px;
  border: 1px solid #ddd;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const ErrorMessage = styled.p`
  font-size: 18px;
  color: red;
`;