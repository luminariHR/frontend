import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loggedInUserState } from "../../state/userAtom.js";
import Layout from "../Layout.jsx";
import { SidebarProvider } from "../Sidebar.jsx";
import { TextEditor } from "../ui/editor.jsx";
import Button from "../ui/button.jsx";
import ClipLoader from "react-spinners/ClipLoader.js";
import { FilePenIcon, FileMinusIcon, CircleX } from "lucide-react";
import { useDropzone } from "react-dropzone";
import CustomSelectButton from "../ui/select.jsx";
import { fetchChatBot, fetchCategories } from "../../api/chatbotApi.js";

export default function DocumentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [detail, setDetail] = useState(null);
  const [downloadFilename, setDownloadFilename] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [initialDetail, setInitialDetail] = useState(null);
  const user = useRecoilValue(loggedInUserState);

  const onDrop = async (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setSelectedFile(file);
      await handleFileUpload(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, maxFiles: 1 });

  useEffect(() => {
    const fetchData = async () => {
      const documentDetail = await fetchChatBot(parseInt(id));
      const categoryData = await fetchCategories();
      setCategories(categoryData);
      setDetail(documentDetail);
      if (documentDetail) {
        const filename = documentDetail.file.split("/").pop();
        setDownloadFilename(filename);
        setSelectedCategory(documentDetail.category);
        setTitle(documentDetail.title);
      }
    };
    fetchData();
  }, [id]);

  const handleBackClick = () => navigate(-1);

  const handleFileUpload = async (file) => {
    const newFileURL = URL.createObjectURL(file);
    setDetail(prev => ({ ...prev, file: newFileURL }));
    setDownloadFilename(file.name);
    setSelectedFile(null);
  };

  const handleDeleteFile = () => {
    setDetail(prev => ({ ...prev, file: null }));
    setSelectedFile(null);
  };

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption);
    setDetail(prev => ({ ...prev, category: selectedOption.name }));
  };

  if (!detail) {
    return (
      <SidebarProvider>
        <Layout>
          <div className="flex w-full justify-center items-center m-auto w-1/2 h-full p-72">
            <ClipLoader color={"#5d5bd4"} size={70} aria-label="Loading Spinner" data-testid="loader" />
          </div>
        </Layout>
      </SidebarProvider>
    );
  }

  const isContentAvailable = detail.content && detail.content.trim().length > 0;

  return (
    <SidebarProvider>
      <Layout>
        <div className="flex items-center justify-center">
          <div className="flex bg-white rounded-lg shadow-lg overflow-hidden transition-all w-10/12 min-w-[1100px] h-full">
            <div className="flex flex-row w-full h-full">
              <div className="flex-grow p-8 px-14 overflow-auto border-r-2 border-gray-200">
                <div className="overflow-y-auto max-h-full h-full flex flex-col justify-between hide-scrollbar">
                  <div className="flex justify-between mt-3">
                    {user && user.is_hr_admin ? (
                      <h2 className="text-2xl font-semibold mb-1">문서 수정하기</h2>
                    ) : (
                      <h2 className="text-2xl font-semibold mb-1">문서 조회하기</h2>
                    )}
                    <Button text={"뒤로가기"} onClick={handleBackClick} />
                  </div>
                  <div className="flex flex-col my-3">
                    <h3 className="text-xl font-semibold mr-4">제목</h3>
                    {user && user.is_hr_admin ? (
                      <input
                        id="title"
                        type="text"
                        value={title}
                        placeholder={detail.title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 mt-4 mb-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                      />
                    ) : (
                      <div className="text-xl">{detail.title}</div>
                    )}
                  </div>
                  <div className="flex flex-col my-3">
                    <h3 className="text-xl font-semibold mr-4">카테고리</h3>
                    {user && user.is_hr_admin ? (
                      <CustomSelectButton
                        onSelect={handleCategoryChange}
                        options={categories}
                        selectedOption={categories.find(cat => cat.name === selectedCategory)}
                        defaultText={selectedCategory || "카테고리를 선택해주세요"}
                      />
                    ) : (
                      <div className="text-xl">{detail.category}</div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-l font-semibold mt-1">파일</h3>
                    {user && (
                      <div className="bg-gray-100 p-5 mt-5 rounded-lg">
                        <div className="max-w-md mx-auto">
                          {detail.file ? (
                            <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md mb-4">
                              <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-orange-200 rounded-lg flex items-center justify-center">
                                  <img
                                    src={`https://img.icons8.com/color/48/000000/${downloadFilename.split(".").pop()}.png`}
                                    alt="doc"
                                    className="w-6 h-6"
                                  />
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {decodeURIComponent(downloadFilename)}
                                </p>
                              </div>
                              {user.is_hr_admin && (
                                <div className="cursor-pointer" onClick={handleDeleteFile}>
                                  <CircleX />
                                </div>
                              )}
                            </div>
                          ) : (
                            <div
                              {...getRootProps()}
                              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50"}`}
                            >
                              <input {...getInputProps()} />
                              {isDragActive ? (
                                <p className="text-blue-500">파일을 여기에 드랍해주세요.</p>
                              ) : (
                                <p className="text-gray-500">Drag & drop a file here, or click to select a file</p>
                              )}
                            </div>
                          )}
                          {selectedFile && (
                            <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md">
                              <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-orange-200 rounded-lg flex items-center justify-center">
                                  <img
                                    src={`https://img.icons8.com/color/48/000000/${selectedFile.type.split("/").pop()}.png`}
                                    alt="doc"
                                    className="w-6 h-6"
                                  />
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {selectedFile.name}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-l font-semibold mt-5 mb-3">문서 내용</h3>
                    {user && (
                      <TextEditor
                        value={detail.content}
                        readOnly={!user.is_hr_admin}
                        modules={{ toolbar: false }}
                      />
                    )}
                  </div>
                  {user?.is_hr_admin && (
                    <div className="flex items-center justify-center">
                      <Button
                        text={"데이터 수정하기"}
                        leftIcon={<FilePenIcon />}
                        disabled={!isContentAvailable}
                      />
                      <Button
                        text={"데이터 삭제"}
                        variant={"teams"}
                        leftIcon={<FileMinusIcon />}
                        type="button"
                        onClick={handleDeleteFile}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </SidebarProvider>
  );
}
