import axiosInstance from "./axiosInstance";

// 더미 데이터
const dummyDocuments = [
  {
    id: 1,
    title: "신규입사자가이드",
    file: `https://example.com/path/to/신규입사자가이드.pdf`,
    content: "<p>신규 입사자 가이드 내용입니다.</p>",
    category: "온보딩/오프보딩",
    created_at: "2022-01-01",
    drafter: { name: "관리자" },
  },
  {
    id: 2,
    title: "온보딩 가이드(인사혁신처)",
    file: `https://example.com/path/to/온보딩 가이드(인사혁신처).pdf`,
    content: "<p>온보딩 가이드 내용입니다.</p>",
    category: "회사가이드/정책",
    created_at: "2022-02-01",
    drafter: { name: "인사부" },
  },
  {
    id: 3,
    title: "인사규정",
    file: `https://example.com/path/to/인사규정.pdf`,
    content: "<p>인사 규정 내용입니다.</p>",
    category: "회사가이드/정책",
    created_at: "2022-03-01",
    drafter: { name: "관리자" },
  },
];

// Dummy categories
const dummyCategories = [
  { id: 1, name: "온보딩/오프보딩" },
  { id: 2, name: "회사가이드/정책" },
  { id: 3, name: "기타" },
];

export const askQuestion = async (question, category) => {
  try {
    const response = await axiosInstance.post(`/chatbot/messages/`, {
      question,
      category,
    });
    return response.data;
  } catch (error) {
    console.error("에러 발생", error);
    return null;
  }
};

export const fetchAllChatBot = async () => {
  try {
    return dummyDocuments;
  } catch (error) {
    console.error("에러 발생", error);
    return null;
  }
  /*try {
    const response = await axiosInstance.get(`/chatbot/documents/`);
    return response.data;
  } catch (error) {
    console.error("에러 발생", error);
    return null;
  }*/
};

export const fetchChatBot = async (document_id) => {
  try {
    const document = dummyDocuments.find((doc) => doc.id === document_id);
    return document ? document : null;
  } catch (error) {
    console.error("에러 발생", error);
    return null;
  }
  /*try {
    const response = await axiosInstance.get(`/chatbot/documents/${document_id}`);
    return response.data;
  } catch (error) {
    console.error("에러 발생", error);
    return null;
  }*/
};

export const fetchCategories = async () => {
  try {
    return dummyCategories;
  } catch (error) {
    console.error("에러 발생", error);
    return null;
  }
};