import { useState } from "react";
import styled from "styled-components";
import { postImageUrl } from "../api/MainApi";

const Image = ({ onImageUpload }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
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
      alert("이미지 업로드 실패!");
      setImageSrc(null);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <ImageContainer disabled={isUploading}>
      {isUploading && <LoadingOverlay>업로드 중...</LoadingOverlay>}
      {imageSrc ? (
        <PreviewImage src={imageSrc} alt="선택한 이미지" />
      ) : (
        <ImageInput
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          disabled={isUploading}
        />
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
  border: 4px solid #f58220;
  flex-grow: 1;
  width: 100%;
  height: 60%;
  position: relative;
  overflow: hidden;
  padding: 0 10px;
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
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
