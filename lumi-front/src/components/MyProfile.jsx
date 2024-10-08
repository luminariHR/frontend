import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./Layout";
import { SidebarProvider } from "./Sidebar";
import {
  Bike,
  BookHeart,
  HomeIcon,
  Mail,
  MapPinned,
  PlaneTakeoff,
} from "lucide-react";
import defaultprofile from "../assets/defaultprofile.png";
import { LoadingPage } from "./LoadingPage.jsx";
import { UserAvatar } from "./ui/avatar.jsx";

const MyProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [currentContent, setCurrentContent] = useState("Skills");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMbti, setNewMbti] = useState("");
  const [newSkills, setNewSkills] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newHobbies, setNewHobbies] = useState("");
  const [newCertifications, setNewCertifications] = useState([]);
  const [newStart_Date, setNewStart_Date] = useState("");
  const [newProfileImage, setNewProfileImage] = useState(null);

  const handleButtonClick = (content) => {
    setCurrentContent(content);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleMbtiChange = (event) => {
    setNewMbti(event.target.value);
  };

  const handleSkillsChange = (event) => {
    setNewSkills(event.target.value);
  };

  const handleLocationChange = (event) => {
    setNewLocation(event.target.value);
  };

  const handleHobbiesChange = (event) => {
    setNewHobbies(event.target.value);
  };

  const handleCertificationChange = (event) => {
    setNewCertifications(event.target.value);
  };

  const handleStart_DateChange = (event) => {
    setNewStart_Date(event.target.value);
  };

  // 프로필 사진 변경
  const handleProfileImageChange = (event) => {
    setNewProfileImage(event.target.files[0]);
  };

  const handleSave = async () => {
    const token = localStorage.getItem("access_token");
    try {
      await axios.patch(
        `https://dev.luminari.kro.kr/api/v1/accounts/${profileData.id}/`,
        {
          mbti: newMbti,
          skills: newSkills.split(",").map((skill) => skill.trim()), // 콤마로 구분
          location: newLocation,
          hobbies: newHobbies.split(",").map((hobby) => hobby.trim()),
          certifications: newCertifications
            .split(",")
            .map((certification) => certification.trim()),
          start_date: newStart_Date,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setProfileData({
        ...profileData,
        mbti: newMbti,
        skills: newSkills.split(",").map((skill) => skill.trim()), // 배열로 설정
        location: newLocation,
        hobbies: newHobbies.split(",").map((hobby) => hobby.trim()),
        certifications: newCertifications
          .split(",")
          .map((certification) => certification.trim()),
        start_date: newStart_Date,
      });
      toggleModal();
    } catch (error) {
      console.error("Error updating:", error);
    }
  };

  // 프로필사진 핸들러 => 폼데이터로 따로 나감
  const handleProfileImageUpload = async () => {
    const token = localStorage.getItem("access_token");
    const formData = new FormData();
    if (newProfileImage) {
      formData.append("profile_image", newProfileImage);
    }

    try {
      await axios.patch(
        `https://dev.luminari.kro.kr/api/v1/accounts/${profileData.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      setProfileData({
        ...profileData,
        profile_image: URL.createObjectURL(newProfileImage),
      });
    } catch (error) {
      console.error("Error uploading profile image:", error);
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const response = await axios.get(
          "https://dev.luminari.kro.kr/api/v1/me/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setProfileData(response.data);
        setNewMbti(response.data.mbti || "");
        setNewSkills(
          response.data.skills ? response.data.skills.join(", ") : "",
        );
        setNewLocation(response.data.location || "");
        setNewHobbies(
          response.data.hobbies ? response.data.hobbies.join(", ") : "",
        );
        setNewCertifications(
          response.data.certifications
            ? response.data.certifications.join(", ")
            : "",
        );
        setNewStart_Date(response.data.start_date || "");
        setNewProfileImage(response.data.profile_image || "");
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const skillColors = {
    pytorch: "EE4C2C",
    tensorflow: "FF6F00",
    keras: "D00000",
    mysql: "00758F",
    react: "61DAFB",
    angular: "DD0031",
    vuejs: "4FC08D",
    nodejs: "68A063",
    expressjs: "000000",
    django: "092E20",
    flask: "000000",
    spring: "6DB33F",
    laravel: "FF2D20",
    rubyonrails: "CC0000",
    dotnet: "512BD4",
    xamarin: "3498DB",
    flutter: "02569B",
    kotlin: "0095D5",
    swift: "FF3B30",
    unity: "000000",
    unrealengine: "313131",
    opencv: "5C3EE8",
    pandas: "150458",
    numpy: "013243",
    scikitlearn: "F7931E",
    spark: "E25A1C",
    hadoop: "F58220",
    kafka: "231F20",
    elasticsearch: "005571",
    mongodb: "47A248",
    cassandra: "1287B1",
    redis: "DC382D",
    graphql: "E10098",
    apollo: "311C87",
    jest: "C21325",
    mocha: "8D6748",
    chai: "A30701",
    pytest: "0A9EDC",
    selenium: "43B02A",
    docker: "2496ED",
    kubernetes: "326CE5",
    aws: "FF9900",
    azure: "0078D7",
    googlecloud: "4285F4",
    heroku: "430098",
    git: "F05032",
    jenkins: "D24939",
    travisci: "3EAAAF",
    circleci: "343434",
    ansible: "EE0000",
    terraform: "623CE4",
    prometheus: "E6522C",
    grafana: "F46800",
  };

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

    const renderContent = () => {
        switch(currentContent) {
            case 'Skills':
                return (
                    <div>
                        <div className="flex flex-wrap mt-4">
                            {profileData.skills && profileData.skills.map((skill, index) => (
                                <img
                                    key={index}
                                    src={`https://img.shields.io/badge/${skill}-${skillColors[skill]}.svg?&style=for-the-badge&logo=${skill}&logoColor=white`}
                                    alt={skill}
                                    className="mr-2 mb-2"
                                />
                            ))}
                        </div>
                        
                        <div className="mt-4">
                            <ul className="list-disc list-inside">
                                {profileData.certifications && profileData.certifications.map((cert, index) => (
                                    <li key={index} className="mx-4 mb-4 p-4 bg-white shadow rounded w-[400px]">{cert}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                );
            case '프로젝트':
                return (
                    <div className="mt-4 flex flex-wrap">
                        {profileData.projects && profileData.projects.map((project, index) => (
                            <div key={index} className="mx-4 mb-4 p-4 bg-white shadow rounded w-[400px]">
                                <h3 className="text-lg font-semibold">{project.title}</h3>
                                <p className="text-sm text-gray-500">역할: {project.role}</p>
                                <p className="text-sm text-gray-500">기간: {project.duration}</p>
                                <p className="text-sm text-gray-500">설명: {project.description}</p>
                            </div>
                        ))}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <SidebarProvider>
            <Layout>
                <div className="flex justify-between pb-3">
                    <div className="text-xl font-semibold">내 프로필</div>
                </div>
                <div className="flex flex-row">
                    <div className="w-1/4 h-[600px] bg-[#f8f8ff]">
                        <div className="flex justify-center items-center mx-4 h-[250px] mt-8">
                            <UserAvatar
                                userProfileImg={profileData.profile_image}
                                userName={profileData.name} 
                                size="40px"
                            /> 
                            {/*1300px * 1500px 사이의 가로세로 이미지가 예쁘게 잘나옴 */}
                        </div>
                        <div>
                            <h2 className="flex justify-start text-2xl font-semibold ml-4 text-[#373844]">{profileData?.name || 'N/A'}</h2>
                            <div className="flex justify-center">
                                <button
                                    onClick={toggleModal}
                                    className="flex justify-center items-center bg-gray-500 shadow-lg w-4/5 h-[30px] mt-4 cursor-pointer font-semibold text-white"
                                >
                                    프로필 수정하기
                                </button>
                            </div>
                        
                            <div className="flex justify-start items-center ml-4 mt-4 text-gray-500 text-sm">
                                <Mail className="mr-2" />
                                <p>{profileData?.email || 'N/A'}</p>
                            </div>
                            <div className="flex justify-start items-center ml-4 mt-2 text-gray-500 text-sm">
                                <HomeIcon className="mr-2" />
                                <p>{profileData?.department?.name || 'N/A'}</p> {/* department가 null이 아닌 경우에 접근 */}
                            </div>
                            <div className="flex justify-start items-center ml-4 mt-2 text-gray-500 text-sm">
                                <MapPinned className="mr-2" />
                                <p>{profileData?.location || 'N/A'}</p>
                            </div>
                            <div className="flex justify_start items-center ml-4 mt-2 text-gray-500 text-sm">
                                <BookHeart className="mr-2" />
                                <p>{profileData?.mbti || 'N/A'}</p>
                            </div>
                            <div className="flex justify-start items-center ml-4 mt-2 text-gray-500 text-sm">
                                <PlaneTakeoff className="mr-2" />
                                <p>{profileData?.start_date ? `${profileData.start_date.slice(0,4)}년에 입사` : 'N/A'}</p>
                            </div>
                            <div className="flex justify-start items-center ml-4 mt-2 text-gray-500 text-sm">
                                <Bike className="mr-2" />
                                <p>{Array.isArray(profileData?.hobbies) ? profileData.hobbies.join(', ') : 'N/A'}</p> {/* hobbies를 배열로 처리 */}
                            </div>
                        </div>
                    </div>
                    <div className="w-3/4 h-[600px] bg-[#f8f8ff]">
                        <div className="mt-4 flex items-center justify-start space-x-4">
                            <button
                                onClick={() => handleButtonClick('Skills')}
                                className={`px-4 py-2 text-xs font-semibold ${currentContent === 'Skills' ? 'bg-[#5d5bd4] text-white' : 'text-black'}`}
                            >
                                Skills
                            </button>
                            <button
                                onClick={() => handleButtonClick('프로젝트')}
                                className={`px-4 py-2 text-xs font-semibold ${currentContent === '프로젝트' ? 'bg-[#5d5bd4] text-white' : 'text-black'}`}
                            >
                                프로젝트
                            </button>
                        </div>
                        <div className="flex items-center justify-center pt-10 text-black">
                            {renderContent()}
                        </div>
                    </div>
                </div>
                {isModalOpen && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-4 rounded shadow-lg">
                            <h2 className="text-xl font-semibold mb-4">개인정보 수정</h2>
                            <input
                                type="text"
                                value={newMbti}
                                onChange={handleMbtiChange}
                                className="border p-2 mb-4 w-full"
                                placeholder="MBTI"
                            />
                            <input
                                type="text"
                                value={newSkills}
                                onChange={handleSkillsChange}
                                className="border p-2 mb-4 w-full"
                                placeholder="Skill"
                            />
                            <input
                                type="text"
                                value={newLocation}
                                onChange={handleLocationChange}
                                className="border p-2 mb-4 w-full"
                                placeholder="사는곳"
                            />
                            <input
                                type="text"
                                value={newHobbies}
                                onChange={handleHobbiesChange}
                                className="border p-2 mb-4 w-full"
                                placeholder="취미"
                            />
                            <input
                                type="text"
                                value={newCertifications}
                                onChange={handleCertificationChange}
                                className="border p-2 mb-4 w-full"
                                placeholder="자격증"
                            />
                            <input
                                type="Date"
                                value={newStart_Date}
                                onChange={handleStart_DateChange}
                                className="border p-2 mb-4 w-full"
                                placeholder="입사연월"
                            />
                            <div className="flex justify-center">
                            <input
                                type="file"
                                onChange={handleProfileImageChange}
                                className="border p-2 mb-4 w-full"
                            />
                            <button
                                onClick={handleProfileImageUpload}
                                className="flex justify-center items-center bg-blue-500 shadow-lg w-4/5 mb-4 cursor-pointer font-semibold text-white"
                            >
                                프로필 사진 업로드
                            </button>
                            </div>

              <div className="flex justify-end space-x-2">
                <button
                  onClick={toggleModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  취소
                </button>
                <button
                  onClick={handleSave}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  저장
                </button>
              </div>
            </div>
          </div>
        )}
      </Layout>
    </SidebarProvider>
  );
};

export default MyProfile;
