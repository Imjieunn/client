import { useState } from "react";
import styled from "styled-components";

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
