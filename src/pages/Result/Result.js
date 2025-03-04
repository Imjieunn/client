// 기존 코드

// import styled from "styled-components";

// const Result = () => {
//   const goToResultPage = () => {
//     window.open("https://www.google.com", "_blank");
//   };
//   return (
//     <Container>
//       <Title>결과 확인⬇️</Title>
//       <Link onClick={goToResultPage}>www.google.com</Link>
//     </Container>
//   );
// };


/*  
==================================
🚀 TODO LIST (협업을 위한 작업 목록)
==================================

✅ 1. Django `GET /api/memory/:memoryId/result/` API 연동 (💡 중요) 
   - 사용자의 `memoryId`를 기반으로 감정 분석 데이터를 불러옴.

✅ 2. `chart.js`를 활용한 감정 분석 시각화 (💡 필요) 
   - 파이 차트(PieChart)와 바 차트(BarChart)로 표현.

✅ 3. `memoryId`를 `props`로 `Result.js`에 전달 (💡 중요) 
   - 사용자가 이전 단계에서 저장한 `memoryId`가 필요하므로 `Main.js`에서 전달.

*/

import { useEffect, useState } from "react";
import styled from "styled-components";
// import axios from "axios";
import { Pie, Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";


// const Result = ({ memoryId }) => {
//   const [emotionData, setEmotionData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // 📌 Django API에서 감정 분석 결과 가져오기
//   useEffect(() => {
//     if (!memoryId) return;
    
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`http://127.0.0.1:8000/api/memory/${memoryId}/result/`);
//         setEmotionData(response.data);
//       } catch (error) {
//         console.error("데이터 로드 오류:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [memoryId]);


  // 📌 차트 데이터 생성 함수
  const generateChartData = (data) => ({
    labels: ["긍정 (Positive)", "중립 (Neutral)", "부정 (Negative)"],
    datasets: [
      {
        label: "감정 분석 결과",
        data: [data.positive, data.neutral, data.negative],
        backgroundColor: ["#4CAF50", "#FFC107", "#F44336"], // 초록, 노랑, 빨강
      }
    ]
  });

  return (
    <Container>
      <Title>감정 분석 결과</Title>

      {emotionData ? (
        <>
          <ChartContainer>
            <ChartTitle>📊 감정 비율 (Pie Chart)</ChartTitle>
            <Pie data={generateChartData(emotionData.emotions)} />
          </ChartContainer>

          <ChartContainer>
            <ChartTitle>📉 감정 분포 (Bar Chart)</ChartTitle>
            <Bar data={generateChartData(emotionData.emotions)} />
          </ChartContainer>

          <SummaryText>
            총 {emotionData.total_conversations}개의 대화 중 긍정 {emotionData.emotions.positive}개, 
            중립 {emotionData.emotions.neutral}개, 부정 {emotionData.emotions.negative}개가 분석되었습니다.
          </SummaryText>
        </>
      ) : (
        <LoadingText>데이터 로드 중...</LoadingText>
      )}
    </Container>
  );

export default Result;

/*  
==================================
📌 Styled Components (스타일 정의)
==================================
*/

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 20px;
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: bold;
`;

const ChartContainer = styled.div`
  width: 80%;
  max-width: 600px;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const ChartTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const LoadingText = styled.div`
  font-size: 18px;
  color: #f58220;
`;

