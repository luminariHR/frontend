import React, { useEffect, useState } from "react";
import { Button } from "../ui/button.jsx";
import { Input } from "../ui/input.jsx";
import { TextEditor } from "../ui/editor.jsx";
import CustomSelectButton from "../ui/select.jsx";
import { updateRecruitmentStatus } from "../../api/recruitmentApi.js";

const statusOptions = [
  { id: "pre_open", name: "준비 중" },
  { id: "open", name: "진행 중" },
  { id: "closed", name: "마감" },
];

export function AdminRecruitmentDetailModal({
  isOpen,
  onClose,
  data,
  onStatusUpdate,
}) {
  const [selectedStatus, setSelectedStatus] = useState(null);

  useEffect(() => {
    if (data) {
      const currentStatus = statusOptions.find(
        (option) => option.id === data.status,
      );
      setSelectedStatus(currentStatus);
    }
  }, [data]);

  const handleStatusChange = (option) => {
    setSelectedStatus(option);
  };

  const handleStatusUpdate = async () => {
    try {
      await updateRecruitmentStatus(data.id, selectedStatus.id);
      alert("상태가 성공적으로 업데이트되었습니다.");
      onStatusUpdate({ ...data, status: selectedStatus.id });
      onClose();
    } catch (error) {
      console.error("Error updating status:", error);
      alert("상태 업데이트 중 오류가 발생했습니다.");
    }
  };

  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <div
        className={`relative flex bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 w-11/12 max-w-4xl h-[90%]`}
      >
        <div className="flex flex-col w-full h-full">
          <div className="flex flex-col p-8 overflow-y-auto hide-scrollbar">
            <div className="flex justify-between pb-3">
              <div className="text-xl font-medium">채용 공고</div>
              <Button text="뒤로가기" onClick={onClose} />
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="block font-medium mb-2">상태</label>
                <div className="flex items-center">
                  <div className="w-[225px]">
                    <CustomSelectButton
                      options={statusOptions}
                      selectedOption={selectedStatus}
                      onSelect={handleStatusChange}
                      defaultText="상태를 선택하세요"
                    />
                  </div>
                  <Button
                    text="상태 업데이트"
                    variant="teams"
                    onClick={handleStatusUpdate}
                    addClass="ml-4"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium mb-2">제목</label>
                <Input
                  name="title"
                  value={data.title}
                  addClass="w-full text-sm"
                  disabled
                />
              </div>

              <div>
                <label className="block font-medium mb-2">직무명</label>
                <Input
                  name="position"
                  value={data.position}
                  addClass="w-full text-sm"
                  disabled
                />
              </div>

              <div>
                <label className="block font-medium mb-2">상세 내용</label>
                <TextEditor value={data.description} readOnly={true} />
              </div>

              <div className="mb-4">
                {data.questions.map((question, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex items-center justify-between">
                      <label className="block font-medium mb-1">
                        문항 {index + 1}
                      </label>
                      <div className="text-xs text-gray-500 mt-1 mr-1">
                        최대 글자 수 : {question.max_length}
                      </div>
                    </div>
                    <div className="p-2 border rounded text-sm">
                      {question.question_text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminRecruitmentDetailModal;
