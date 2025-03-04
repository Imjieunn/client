# How to start project

```
1) git clone
2) npm install
3) npm run start
```

# Chart.js 
npm install chart.js react-chartjs-2

📌 Todo List
1️⃣ Chat.js 수정
✅ 1. Webpack 5에서 'crypto' 모듈 문제 해결
(필요 시 실행하는 환경에서 문제가 발생할 경우)
✅ 2. Django 백엔드 talk API 연동 (💡 중요)
현재 프론트엔드에서만 채팅이 동작하는 상태.
Django API (/api/talk/:memoryId/) 호출하여 백엔드와 실제 데이터 연동 필요.

2️⃣ Image.js 수정
✅ 1. Django start_memory API 연동
사용자가 이미지를 선택하면 S3에 업로드한 후 memoryId를 반환받아야 함.
백엔드 API 호출: POST /api/start_memory/
(업로드 후 memoryId 응답)
✅ 2. memoryId를 Main.js에 전달하여 Chat.js와 연동
setMemoryId()를 props로 받아 Chat.js에서 사용할 수 있도록 변경 필요.

3️⃣ Result.js 수정
✅ 1. Django GET /api/memory/:memoryId/result/ API 연동 (💡 중요)
사용자의 memoryId를 기반으로 감정 분석 데이터를 불러오는 API 추가 필요.
✅ 2. chart.js를 활용한 감정 분석 시각화 (💡 필요)
감정 분석 결과를 다음과 같은 차트로 시각화: 📊 파이 차트 (PieChart) 📉 바 차트 (BarChart)
✅ 3. memoryId를 props로 Result.js에 전달 (💡 중요)
Main.js에서 memoryId를 Result.js로 전달하여 분석 결과를 표시하도록 구성.
