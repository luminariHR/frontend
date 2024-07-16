import React, { useState } from "react";
import { CircleX } from "lucide-react";
import Button from "../ui/button";
import { useDropzone } from "react-dropzone";
import { TextEditor } from "../ui/editor";
import { ApprovalSteps } from "./ApprovalSteps";
import {
  fetchSentRequest,
  previewReceipt,
  requestReview,
} from "../../api/approvalApi.js";

export function ApproveRequestModal({ onClose, onRequestSubmit }) {
  const [isSidenavOpen, setIsSidenavOpen] = useState(true);
  const [title, setTitle] = useState("");
  const [editorValue, setEditorValue] = useState("");
  const [reviewers, setReviewers] = useState([]);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showOCRHelper, setShowOCRHelper] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setSelectedFile(file);
      setShowOCRHelper(true);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
  });

  const handleOCRClick = async () => {
    const formData = new FormData();
    formData.append("image", selectedFile);
    const response = await previewReceipt(formData);
    if (response) {
      const template = `<p>다음과 같이 경비 처리를 위한 결재를 요청드립니다.</p><br/><ul>
    <li>판매처: ${response.preview["store_name"]}</li>
    <li>사업자 번호: ${response.preview["store_business_number"]}</li>
    <li>매출일: ${response.preview["transaction_time"]}</li>
    <li>카드 정보:</li>
    <li class="ql-indent-1">카드 회사: ${response.preview["card_info"]["company"]}</li>
    <li class="ql-indent-1">카드 번호: ${response.preview["card_info"]["number"]}</li>
    <li>판매금액: ${response.preview["total_price"]}</li>
</ul><br/><p>위와 같은 내용으로 경비 처리를 요청드리오니, 검토 후 결재 부탁드립니다.</p><br/><p>감사합니다.</p>`;
      setEditorValue(editorValue + template);
    }
    setShowOCRHelper(false);
  };

  const toggleSidenav = () => setIsSidenavOpen(!isSidenavOpen);

  const handleEditorChange = (value) => {
    setEditorValue(value);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", editorValue);
    reviewers.map((item) => formData.append("reviewer_ids", item.id));
    formData.append("file", selectedFile);
    await requestReview(formData);
    const refreshedSentRequest = await fetchSentRequest();
    if (refreshedSentRequest) {
      onRequestSubmit(refreshedSentRequest);
    }
    onClose();
  };

  const isSubmittable = () => {
    if (title && editorValue && reviewers.length > 0) return true;
    return false;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <div
        className={`relative flex bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 ${
          isSidenavOpen ? "w-11/12 max-w-6xl" : "w-11/12 max-w-4xl"
        } h-[90%]`}
      >
        <div className="flex flex-row w-full h-full">
          <div className="flex-grow p-8 overflow-auto ">
            <div className="overflow-y-auto max-h-full h-full flex flex-col justify-between hide-scrollbar">
              <div className="flex justify-between">
                <h2 className="text-xl font-semibold">결재 기안하기</h2>
                <button
                  onClick={toggleSidenav}
                  className="px-4 py-2 mb-4 font-bold text-white bg-[#5d5bd4] rounded hover:bg-[#5553c1]"
                >
                  {isSidenavOpen ? "결재선 숨기기" : "결재선 보기"}
                </button>
              </div>
              <div>
                <h3 className="text-l font-semibold">제목</h3>
                <div>
                  <input
                    id="title"
                    type="text"
                    value={title}
                    placeholder={"결재 제목을 적어주세요."}
                    onChange={(e) => setTitle(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 mt-4 mb-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
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
                                src={`https://img.icons8.com/color/48/000000/${selectedFile.type === "image/jpeg" ? "image/jpg" : selectedFile.type}.png`}
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
                        {[
                          "image/jpeg",
                          "image/png",
                          "image/jpg",
                          "image/tiff",
                        ].includes(selectedFile.type) &&
                          showOCRHelper && (
                            <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
                              <div
                                className={"flex items-center justify-between"}
                              >
                                <p className="text-gray-700">
                                  혹시 영수증을 첨부하셨나요?
                                </p>
                                <div
                                  className={"cursor-pointer"}
                                  onClick={() => setShowOCRHelper(false)}
                                >
                                  <CircleX />
                                </div>
                              </div>
                              <button
                                onClick={handleOCRClick}
                                className="mt-2 w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                              >
                                OCR 분석하기
                              </button>
                            </div>
                          )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-l font-semibold mb-3">문서 양식</h3>
                <TextEditor value={editorValue} onChange={handleEditorChange} />
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
                      text={"결재 요청"}
                      variant={"teams"}
                      type="submit"
                      onClick={handleSubmit}
                    />
                  ) : (
                    <Button
                      text={"결재 요청"}
                      variant={"teams"}
                      type="submit"
                      disabled={true}
                    />
                  )}
                  {!isSubmittable() && showTooltip && (
                    <div className="absolute left-[50%] bottom-20 transform -translate-x-1/2 mt-2 px-3 py-1 text-sm text-white bg-gray-700 rounded shadow-lg">
                      제목, 양식, 결재선 등을 추가해주세요.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {isSidenavOpen && (
            <div className="w-80 p-6 bg-white border-r border-l-2 border-gray-200 flex-shrink-0 h-full overflow-auto">
              <ApprovalSteps data={reviewers} setData={setReviewers} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
