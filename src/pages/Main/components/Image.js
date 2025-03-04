import { useState } from "react";
import styled from "styled-components";

/*  
==================================
🚀 TODO LIST (협업을 위한 작업 목록)
==================================

1. Django `start_memory` API 연동 
   - 사용자가 이미지를 선택하면 S3에 업로드 후 `memoryId`를 반환받아야 함.
   - `POST /api/start_memory/` 호출하여 업로드 진행.

2. `memoryId`를 `Main.js`에 전달하여 `Chat.js`와 연동 
   - `setMemoryId()`를 `props`로 받아서 `Chat.js`에서 사용할 수 있도록 해야 함.

*/

  // 📌 Django API로 이미지 업로드
  // const uploadImageToServer = async (file) => {
  //   setIsUploading(true); // 업로드 상태 활성화
  //   const formData = new FormData();
  //   formData.append("photo", file);
  //   formData.append("user_id", 1); // 기본적으로 user_id 1로 설정 (후에 수정 가능)

  //   try {
  //     const response = await axios.post(
  //       "http://127.0.0.1:8000/api/start_memory/", // Django 백엔드 API 호출
  //       formData,
  //       { headers: { "Content-Type": "multipart/form-data" } }
  //     );

  //     setMemoryId(response.data.memory_id); // `memoryId` 상태 업데이트
  //     alert("이미지 업로드 성공!");
  //   } catch (error) {
  //     console.error("이미지 업로드 오류:", error);
  //     alert("이미지 업로드에 실패했습니다.");
  //   } finally {
  //     setIsUploading(false); // 업로드 완료 후 상태 해제
  //   }
  // };


const Image = () => {
  const [imageSrc, setImageSrc] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageSrc(imageUrl);
    }
  };

  return (
    <ImageContainer>
      {imageSrc ? (
        <PreviewImage src={imageSrc} alt="선택한 이미지" />
      ) : (
        <ImageInput type="file" accept="image/*" onChange={handleImageChange} />
      )}
    </ImageContainer>
  );
};

export default Image;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid black;
  flex-grow: 1;
  width: 100%;
  height: 60%;
  position: relative;
  overflow: hidden;
  padding: 0 10px;
`;

const ImageInput = styled.input`
  margin-top: 10px;
`;

const PreviewImage = styled.img`
  width: auto;
  height: 100%;
  max-width: 100%;
  object-fit: contain;
  border-radius: 10px;
`;
