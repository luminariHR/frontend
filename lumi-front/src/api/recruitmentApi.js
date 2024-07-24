import axiosInstance from "./axiosInstance.js";

// 채용공고 조회
export const fetchRecruitmentPostings = async () => {
  try {
    const response = await axiosInstance.get("/recruitment/postings/");
    return response.data;
  } catch (error) {
    console.error("Error fetching recruitment postings:", error);
    throw error;
  }
};

// 채용공고 생성
export const createRecruitmentPosting = async (postingData) => {
  try {
    const response = await axiosInstance.post(
      "/recruitment/postings/",
      postingData,
    );
    return response.data;
  } catch (error) {
    console.error("Error creating recruitment posting:", error);
    throw error;
  }
};

// 상태 변경
export const updateRecruitmentStatus = async (id, status) => {
  try {
    const response = await axiosInstance.patch(`/recruitment/postings/${id}/`, {
      status,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating recruitment status:", error);
    throw error;
  }
};

// 공고 id 별 지원자
export const fetchApplicantsByPostingId = async (postingId) => {
  try {
    const response = await axiosInstance.get(
      `/recruitment/postings/${postingId}/applicants/`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching applicants:", error);
    throw error;
  }
};

// 자소서 분석 결과
export const fetchApplicantData = async (postingId, applicantEmail) => {
  try {
    const response = await axiosInstance.get(
      `/recruitment/summaries/?posting_id=${postingId}&applicant_email=${applicantEmail}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching applicant data:", error);
    throw error;
  }
};

// 질문번호, 대답
export const fetchApplicantAnswers = async (postingId, applicantEmail) => {
  try {
    const response = await axiosInstance.get(
      `/recruitment/postings/${postingId}/applicants/${applicantEmail}/`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching applicant answers:", error);
    throw error;
  }
};

// 지원서 제출
export const submitApplication = async (applicationData) => {
  try {
    const response = await axiosInstance.post(
      `/recruitment/answers/${applicationData.posting_id}/`,
      applicationData,
    );
    return response.data;
  } catch (error) {
    console.error("Error submitting application:", error);
    throw error;
  }
};
