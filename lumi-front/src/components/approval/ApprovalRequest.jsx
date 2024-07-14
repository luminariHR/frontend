import React, { useState } from "react";
import Button from "../ui/button.jsx";
import { TextEditor } from "../ui/editor.jsx";
import { ApprovalSteps } from "./ApprovalSteps.jsx";
import { fetchSentRequest, requestReview } from "../../api/approvalApi.js";

export function ApproveRequestModal({ onClose, onRequestSubmit }) {
  const [isSidenavOpen, setIsSidenavOpen] = useState(true);
  const [title, setTitle] = useState("");
  const [editorValue, setEditorValue] = useState("");
  const [reviewers, setReviewers] = useState([]);
  const [showTooltip, setShowTooltip] = useState(false);

  const toggleSidenav = () => setIsSidenavOpen(!isSidenavOpen);

  const handleEditorChange = (value) => {
    setEditorValue(value);
  };

  const handleSubmit = async () => {
    const data = {
      title,
      content: editorValue,
      referrer_ids: [],
      reviewer_ids: reviewers.map((item) => item.id),
    };
    await requestReview(data);
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
        } h-3/4`}
      >
        <div className="flex flex-row w-full h-full">
          <div className="flex-grow p-8 overflow-auto">
            <div className="overflow-y-auto max-h-full h-full flex flex-col justify-between">
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
