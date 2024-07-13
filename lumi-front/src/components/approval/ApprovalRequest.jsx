import React, { useState } from "react";
import Button from "../ui/button.jsx";
import { TextEditor } from "../ui/editor.jsx";
import { ApprovalSteps } from "./ApprovalSteps.jsx";

export function ApproveRequestModal({ onClose }) {
  const [isSidenavOpen, setIsSidenavOpen] = useState(true);
  const [title, setTitle] = useState("");
  const [editorValue, setEditorValue] = useState("");
  const [reviewers, setReviewers] = useState([]);

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
    console.log(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <div
        className={`relative flex bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 ${
          isSidenavOpen ? "w-11/12 max-w-6xl" : "w-11/12 max-w-4xl"
        } h-3/4`}
      >
        <button
          className="absolute top-0 right-0 p-2 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          X
        </button>
        <div className="flex flex-row w-full h-full">
          <div className="flex-grow p-8 overflow-auto">
            <div className="overflow-y-auto max-h-full">
              <div className="flex justify-between">
                <h2 className="text-xl font-semibold">결재 기안하기</h2>
                <button
                  onClick={toggleSidenav}
                  className="px-4 py-2 mb-4 font-bold text-white bg-[#5d5bd4] rounded hover:bg-[#5553c1]"
                >
                  {isSidenavOpen ? "결재선 숨기기" : "결재선 보기"}
                </button>
              </div>
              <div className="mb-4">
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
              <TextEditor value={editorValue} onChange={handleEditorChange} />
              <div className="flex items-center justify-center">
                <div className={"mx-1"}>
                  <Button text={"취소"} />
                </div>
                <div className={"mx-1"}>
                  <Button
                    text={"결재 요청"}
                    variant={"teams"}
                    type="submit"
                    onClick={handleSubmit}
                  />
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
