import React, { useState, useEffect } from "react";
import { CircleX } from "lucide-react";
import Button from "../ui/button";
import { useDropzone } from "react-dropzone";
import { TextEditor } from "../ui/editor";
import CustomSelectButton from "../ui/select.jsx";
import { FilePlusIcon } from "lucide-react";
import { addDocument } from "../../api/chatbotApi.js";
import ClipLoader from "react-spinners/ClipLoader";

export function DocumentRequestModal({ onClose, onRequestSubmit }) {
  const [isSidenavOpen, setIsSidenavOpen] = useState(true);
  const [name, setName] = useState("");
  const [Description, setDescription] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);

  const categories = [
    { id: "onboarding_offboarding", name: "신규 입사자 가이드" },
    { id: "company_policies", name: "인사규정" },
    { id: "others", name: "기타" },
  ];

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setSelectedFile(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
  });

  const handleEditorChange = (value) => {
    setDescription(value);
  };

  const add_Document = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", Description);
    if (selectedFile) {
      formData.append("file", selectedFile);
    }
    if (selectedCategory) {
      formData.append("category", selectedCategory.id);
    }
    setLoading(true);
    try {
      const response = await addDocument(formData);
      console.log("API 응답:", response);
      onRequestSubmit();
      onClose();
    } catch (error) {
      console.error("문서 추가 중 에러 발생:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    setShowConfirmation(true);
  };

  const handleConfirm = async () => {
    setShowConfirmation(false);
    await add_Document();
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  const isSubmittable = () => {
    return name && Description && selectedCategory;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <div
        className={`relative flex bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 ${
          isSidenavOpen ? "w-11/12 max-w-6xl" : "w-11/12 max-w-4xl"
        } h-[90%]`}
      >
        <div className="flex flex-row w-full h-full">
          <div className="flex-grow p-8 overflow-auto">
            <div className="overflow-y-auto max-h-full h-full flex flex-col justify-between hide-scrollbar">
              <div className="flex justify-between">
                <h2 className="text-xl font-semibold">자료 추가하기</h2>
              </div>
              <div>
                <div className="mt-4">
                  <h3 className="text-l font-semibold mb-2">제목</h3>
                  <div>
                    <input
                      id="title"
                      type="text"
                      value={name}
                      placeholder={"자료 제목을 적어주세요."}
                      onChange={(newname) => setName(newname.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 mb-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                </div>
                <div className="mb-8">
                  <h3 className="text-l font-semibold mb-2">카테고리</h3>
                  <div>
                    <CustomSelectButton
                      onSelect={(selectedOption) =>
                        setSelectedCategory(selectedOption)
                      }
                      options={categories}
                      selectedOption={selectedCategory}
                      defaultText={"카테고리를 선택해주세요"}
                    />
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-l font-semibold">파일 첨부</h3>
                <div className={"bg-gray-100 p-5 my-5 rounded-lg"}>
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
                                src={`https://img.icons8.com/color/48/000000/${selectedFile.type}.png`}
                                alt={`doc`}
                                className="w-6 h-6"
                              />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {selectedFile.name}
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
              </div>
              <div>
                <h3 className="text-l font-semibold mb-3">문서 양식</h3>
                <TextEditor value={Description} onChange={handleEditorChange} />
              </div>
              <div className="flex items-center justify-center">
                <div className={"mx-1"}>
                  <Button text={"취소"} onClick={onClose} />
                </div>
                <div
                  className={"mx-1"}
                  onMouseEnter={() => !isSubmittable() && setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >
                  {isSubmittable() ? (
                    <Button
                      text={"데이터 추가"}
                      variant={"teams"}
                      type="button"
                      onClick={handleSubmit}
                      leftIcon={<FilePlusIcon />}
                    />
                  ) : (
                    <Button
                      text={"데이터 추가"}
                      variant={"teams"}
                      type="button"
                      disabled={true}
                      leftIcon={<FilePlusIcon />}
                    />
                  )}
                  {!isSubmittable() && showTooltip && (
                    <div className="absolute left-[50%] bottom-20 transform -translate-x-1/2 mt-2 px-3 py-1 text-sm text-white bg-gray-700 rounded shadow-lg">
                      제목, 카테고리, 내용 등을 추가해주세요.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {showConfirmation && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-4">추가 확인</h3>
              <p>정말로 데이터를 추가하시겠습니까?</p>
              <div className="flex justify-end mt-4">
                <Button text={"취소"} onClick={handleCancel} addClass="mr-2" />
                <Button
                  text={"확인"}
                  variant={"teams"}
                  onClick={handleConfirm}
                />
              </div>
            </div>
          </div>
        )}
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <ClipLoader
              color={"#5d5bd4"}
              size={70}
              aria-label="Saving Spinner"
              data-testid="loader"
            />
          </div>
        )}
      </div>
    </div>
  );
}
