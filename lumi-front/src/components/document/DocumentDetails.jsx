import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loggedInUserState } from "../../state/userAtom.js";
import Layout from "../Layout.jsx";
import { SidebarProvider } from "../Sidebar.jsx";
import { TextEditor } from "../ui/editor.jsx";
import Button from "../ui/button.jsx";
import ClipLoader from "react-spinners/ClipLoader.js";
import { FileMinusIcon, CircleX } from "lucide-react";
import { useDropzone } from "react-dropzone";
import CustomSelectButton from "../ui/select.jsx";
import { fetchDocument, deleteDocument } from "../../api/chatbotApi.js";

export default function DocumentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [detail, setDetail] = useState(null);
  const [Filename, setFilename] = useState("");
  const [Filetype, setFiletype] = useState("pdf");
  const [selectedFile, setSelectedFile] = useState(null);
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isLoding, setIsLoding] = useState(false);
  const [Description, setDescription] = useState("");
  const user = useRecoilValue(loggedInUserState);
  
  const categories = [
    { id: 1, name: "onboarding_offboarding" },
    { id: 2, name: "company_policies" },
    { id: 3, name: "others" },
  ];

  const onDrop = async (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setSelectedFile(file);
      setFiletype(file.type);
      setSelectedFile(file.name);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, maxFiles: 1 });

  useEffect(() => {
    const fetchData = async () => {
      const documentDetail = await fetchDocument(id);
      setDetail(documentDetail);
      if (documentDetail) {
        const filename = documentDetail.file.split("/").pop();
        setName(documentDetail.name);
        setFilename(decodeURIComponent(filename));
        setFiletype(filename.split(".").pop());
        setSelectedFile(documentDetail.file);
        setSelectedCategory(categories.find(category => category.name === documentDetail.category));
        setDescription(documentDetail.description);
      }
    };
    fetchData();
  }, [id]);

  const handleBackClick = () => navigate(-1);

  const handleDeleteDocument = async () => {
    setIsLoding(true);
    try {
      const response = await deleteDocument(id);
      if (response.success) {
        console.log(response.message);
        navigate(-1);
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.error('문서 삭제 중 에러 발생:', error);
    } finally {
      setIsLoding(false);
    }
  };

  const confirmDelete = () => setShowDeleteConfirm(true);
  const cancelDelete = () => setShowDeleteConfirm(false);

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
                        value={name}
                        onChange={(newname) => setName(newname.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 mt-4 mb-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    ) : (
                      <div className="text-xl">{detail.name}</div>
                    )}
                  </div>
                  <div className="flex flex-col my-3">
                    <h3 className="text-xl font-semibold mr-4">카테고리</h3>
                    {user && user.is_hr_admin ? (
                      <CustomSelectButton
                        onSelect={(selectedOption) => setSelectedCategory(selectedOption)}
                        options={categories}
                        selectedOption={selectedCategory}
                        defaultText={detail.category}
                      />
                    ) : (
                      <div className="text-xl">{detail.category}</div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-l font-semibold mt-1">파일</h3>
                    {user && user.is_hr_admin ? (
                      <div className="bg-gray-100 p-5 mt-5 rounded-lg">
                      <div className="max-w-md mx-auto">
                        {!selectedFile && (
                          <div
                            {...getRootProps()}
                            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer ${
                              isDragActive
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-300 bg-gray-50"
                            }`}
                          >
                            <input {...getInputProps()} />
                            {isDragActive ? (
                              <p className="text-blue-500">
                                파일을 여기에 드랍해주세요.
                              </p>
                            ) : (
                              <p className="text-gray-500">
                                Drag & drop a file here, or click to select a file
                              </p>
                            )}
                          </div>
                        )}

                        {selectedFile && (
                          <div>
                            <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md">
                              <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-orange-200 rounded-lg flex items-center justify-center">
                                  <img
                                    src={`https://img.icons8.com/color/48/000000/${Filetype}.png`}
                                    alt={`doc`}
                                    className="w-6 h-6"
                                  />
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {Filename}
                                </p>
                              </div>
                              <div
                                className={"cursor-pointer"}
                                onClick={() => setSelectedFile(null)}
                              >
                                <CircleX />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    ) : (
                      <div className="bg-gray-100 p-5 mt-5 rounded-lg">
                      <div className="max-w-md mx-auto">
                        {!selectedFile && (
                          <div>
                            파일이 없습니다.
                          </div>
                        )}
                        {selectedFile && (
                          <div>
                            <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md">
                              <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-orange-200 rounded-lg flex items-center justify-center">
                                  <img
                                    src={`https://img.icons8.com/color/48/000000/${Filetype}.png`}
                                    alt={`doc`}
                                    className="w-6 h-6"
                                  />
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {Filename}
                                </p>
                              </div>
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
                        value={Description}
                        onChange={(Description) => setDescription(Description)}
                        readOnly={!user.is_hr_admin}
                        modules={{ toolbar: false }}
                      />
                    )}
                    {!user && (
                      <div
                        className="text-md mt-5"
                        dangerouslySetInnerHTML={{ __html: Description }}
                      />
                    )}
                  </div>
                  {user?.is_hr_admin && (
                    <div className="flex items-center justify-center">
                      <Button
                        text={"데이터 삭제"}
                        variant={"teams"}
                        leftIcon={<FileMinusIcon />}
                        type="button"
                        onClick={confirmDelete}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {showDeleteConfirm && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h4 className="text-lg font-semibold">문서 삭제 확인</h4>
              <p className="mt-2">이 문서를 정말로 삭제하시겠습니까?</p>
              <div className="mt-4 flex justify-end">
                <Button 
                  text="취소" 
                  onClick={cancelDelete} 
                  type="button"
                />
                <Button 
                  text="삭제" 
                  onClick={handleDeleteDocument} 
                  variant={"teams"}
                  type="button"
                />
              </div>
            </div>
          </div>
        )}
        {isLoding && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <ClipLoader color={"#5d5bd4"} size={70} aria-label="Saving Spinner" data-testid="loader" />
          </div>
        )}
      </Layout>
    </SidebarProvider>
  );
}
