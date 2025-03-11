import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../Main/components/Header";

const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const resultUrl = location.state?.resultUrl;

  const goHome = () => {
    navigate("/"); // 홈(/)으로 이동
  };

  return (
    <Container>
      <HeaderContainer onClick={goHome}>
        <Header />
      </HeaderContainer>
      <Title>감정분석 결과</Title>
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
  align-items: center;
  height: 100%;
  background-color: #f8f9fc;
  font-family: Arial, sans-serif;
`;

const HeaderContainer = styled.div`
  width: 100%;
  cursor: pointer; /* 클릭 가능하도록 설정 */
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
