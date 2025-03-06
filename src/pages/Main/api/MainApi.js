import * as API from "../../../api/Api";

// 회상 시작
export const postImageUrl = async ({ photo }) => {
  return await API.post("/", photo, "imgPost");
};

// 대화
export const postChat = async ({ memoryId, chatContent }) => {
  return await API.post(`/${memoryId}/`, chatContent, "imgPost");
};

// 회상 종료
export const patchChat = async ({ memoryId }) => {
  return await API.patch(`/${memoryId}/`);
};
