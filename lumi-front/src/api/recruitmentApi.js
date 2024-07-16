import axiosInstance from "./axiosInstance.js";

// export const fetchApplicantData = async (id) => {
//   try {
//     const response = await axiosInstance.get(`/api/v1/applicants/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching applicant data:", error);
//     throw error;
//   }
// };

export const fetchApplicantData = async (id) => {
  const dummy_applicant = {
    id: id,
    job_title: "소프트웨어 엔지니어",
    applicant_name: "김승우",
    applicant_email: "john.doe@example.com",
    summary:
      "최고가 되기 위해서\n\n현대캐피탈은 국내 다양한 금융 관련 서비스를 지원하는 최고의 기업입니다.",
    keywords: {
      techs: [
        "H2 Database",
        "Redis",
        "알고리즘 문제 해결",
        "Spring Security",
        "Spring Data JPA",
        "DB 공부",
        "GC",
        "인프라 통신 방법",
        "Spring Boot",
        "AWS",
        "Java",
        "Javascript",
        "GoLang",
      ],
      jobs: [
        "백엔드개발자",
        "블록체인개발자",
        "프론트엔드개발자",
        "데이터엔지니어",
      ],
    },
    questions: [
      {
        question_id: 1,
        question: "왜 지원하셨나요?",
        content: `이전까지 개발자로서의 지식의 확장과 다양한 경험을 쌓아 올리는 데에 집중하였다면, 이후로는 깊이를 더해나가는 공부를 진행 중에 있습니다. 먼저 영속성 컨텍스와 JPA에 관한 개념과 관계형 데이터베이스 - 객체지향 언어의 패러다임 차이에 대해 배웠습니다. 또 JPA, Spring Data JPA에서의 N+1방지 방법과 영속성 컨텍스의 Dirty checking을 사용한 update 사용 이유, OSVI를 사용한 최적화, 실무에서의 lazy fetch와 fetch join 관련 주의사항 등 중요하며 핵심적인 개념들을 활용하여 기존 프로젝트를 리팩터링 중에 있습니다. "All For One"`,
        spelling: `이전까지 개발자로서의 지식의 확장과 다양한 경험을 쌓아 올리는 데에 집중하였다면, 이후로는 깊이를 더해나가는 공부를 진행 중에 있습니다. 먼저 영속성 <span class="font-semibold" style='color:#00c100'>컨텍스와</span> JPA에 관한 개념과 관계형 데이터베이스 - 객체지향 언어의 패러다임 차이에 대해 배웠습니다. 또 JPA, Spring Data JPA에서의 N+1방지 방법과 영속성 <span class="font-semibold" style='color:#ffc500'>컨텍스트의</span> Dirty checking을 사용한 update 사용 이유, OSVI를 사용한 최적화, 실무에서의 lazy fetch와 fetch join 관련 주의사항 등 중요하며 핵심적인 개념들을 활용하여 기존 프로젝트를 <span class="font-semibold" style='color:blue'>리 팩터링</span> 중에 있습니다. "All For One"`,
        wrong_num: 3,
      },
      {
        question_id: 2,
        question: "왜 지원하셨나요?",
        content: `이전까지 개발자로서의 지식의 확장과 다양한 경험을 쌓아 올리는 데에 집중하였다면, 이후로는 깊이를 더해나가는 공부를 진행 중에 있습니다. 먼저 영속성 컨텍스와 JPA에 관한 개념과 관계형 데이터베이스 - 객체지향 언어의 패러다임 차이에 대해 배웠습니다. 또 JPA, Spring Data JPA에서의 N+1방지 방법과 영속성 컨텍스의 Dirty checking을 사용한 update 사용 이유, OSVI를 사용한 최적화, 실무에서의 lazy fetch와 fetch join 관련 주의사항 등 중요하며 핵심적인 개념들을 활용하여 기존 프로젝트를 리팩터링 중에 있습니다. "All For One"`,
        spelling: `이전까지 개발자로서의 지식의 확장과 다양한 경험을 쌓아 올리는 데에 집중하였다면, 이후로는 깊이를 더해나가는 공부를 진행 중에 있습니다. 먼저 영속성 <span class="font-semibold" style='color:#00c100'>컨텍스와</span> JPA에 관한 개념과 관계형 데이터베이스 - 객체지향 언어의 패러다임 차이에 대해 배웠습니다. 또 JPA, Spring Data JPA에서의 N+1방지 방법과 영속성 <span class="font-semibold" style='color:#ffc500'>컨텍스트의</span> Dirty checking을 사용한 update 사용 이유, OSVI를 사용한 최적화, 실무에서의 lazy fetch와 fetch join 관련 주의사항 등 중요하며 핵심적인 개념들을 활용하여 기존 프로젝트를 <span class="font-semibold" style='color:blue'>리 팩터링</span> 중에 있습니다. "All For One"`,
        wrong_num: 3,
      },
      {
        question_id: 3,
        question: "왜 지원하셨나요?",
        content: `이전까지 개발자로서의 지식의 확장과 다양한 경험을 쌓아 올리는 데에 집중하였다면, 이후로는 깊이를 더해나가는 공부를 진행 중에 있습니다. 먼저 영속성 컨텍스와 JPA에 관한 개념과 관계형 데이터베이스 - 객체지향 언어의 패러다임 차이에 대해 배웠습니다. 또 JPA, Spring Data JPA에서의 N+1방지 방법과 영속성 컨텍스의 Dirty checking을 사용한 update 사용 이유, OSVI를 사용한 최적화, 실무에서의 lazy fetch와 fetch join 관련 주의사항 등 중요하며 핵심적인 개념들을 활용하여 기존 프로젝트를 리팩터링 중에 있습니다. "All For One"`,
        spelling: `이전까지 개발자로서의 지식의 확장과 다양한 경험을 쌓아 올리는 데에 집중하였다면, 이후로는 깊이를 더해나가는 공부를 진행 중에 있습니다. 먼저 영속성 <span class="font-semibold" style='color:#00c100'>컨텍스와</span> JPA에 관한 개념과 관계형 데이터베이스 - 객체지향 언어의 패러다임 차이에 대해 배웠습니다. 또 JPA, Spring Data JPA에서의 N+1방지 방법과 영속성 <span class="font-semibold" style='color:#ffc500'>컨텍스트의</span> Dirty checking을 사용한 update 사용 이유, OSVI를 사용한 최적화, 실무에서의 lazy fetch와 fetch join 관련 주의사항 등 중요하며 핵심적인 개념들을 활용하여 기존 프로젝트를 <span class="font-semibold" style='color:blue'>리 팩터링</span> 중에 있습니다. "All For One"`,
        wrong_num: 3,
      },
    ],
  };

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummy_applicant);
    }, 500);
  });
};
