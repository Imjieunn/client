import styled from "styled-components";
import { useLocation } from "react-router-dom";

const Result = () => {
  const location = useLocation();
  const resultUrl = location.state?.resultUrl;

  const goToResultPage = () => {
    window.open(resultUrl, "_blank");
  };

  return (
    <Container>
      <LogoImg src="/img/miraeasset.jpg" />
      <Title>결과 확인⬇️</Title>
      <Link onClick={goToResultPage}>{resultUrl}</Link>
    </Container>
  );
};

export default Result;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const LogoImg = styled.img`
  width: 300px;
  height: auto;
`;

const Title = styled.h2`
  margin-bottom: 10px;
  font-size: 50px;
`;

const Link = styled.a`
  color: blue;
  cursor: pointer;
  text-decoration: underline;
  font-size: 25px;
`;
