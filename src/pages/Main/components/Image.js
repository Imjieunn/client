import { useState } from "react";
import styled from "styled-components";
import { postImageUrl } from "../api/MainApi";

const Image = ({ onImageUpload }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageSrc(imageUrl);
      handleUpload(file);
    }
  };

  const handleUpload = async (file) => {
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("photo", file);

    try {
      const response = await postImageUrl({ photo: formData });
      onImageUpload(response);
    } catch (error) {
      console.log(error);
      alert("이미지 업로드 실패!");
      setImageSrc(null);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Container>
      <FileUploadContainer>
        <FileInputLabel htmlFor="file-upload">파일 선택 &gt;</FileInputLabel>
        <FileInput
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      </FileUploadContainer>
      <ImageContainer disabled={isUploading}>
        {isUploading && <LoadingOverlay>업로드 중...</LoadingOverlay>}
        {imageSrc ? (
          <PreviewImage src={imageSrc} alt="선택한 이미지" />
        ) : (
          <p>선택된 파일이 없음</p>
        )}
      </ImageContainer>
    </Container>
  );
};

export default Image;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  width: 100%;
  height: calc(100% - 20px);
  border-right: 1px solid #ccc;
  margin: 10px;
  gap: 10px;
  padding-right: 20px;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: calc(100% - 20px);
  height: 100%;
  position: relative;
  overflow: hidden;
  padding: 10px;
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f8f9fc;
  color: #ccc;
`;

const PreviewImage = styled.img`
  width: auto;
  height: 100%;
  max-width: 100%;
  object-fit: contain;
  border-radius: 10px;
`;

const LoadingOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
`;

const FileUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100% - 40px);
`;

const FileInputLabel = styled.label`
  display: inline-block;
  background-color: white;
  border: 1px solid black;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
  text-align: center;
`;

const FileInput = styled.input`
  display: none;
`;
