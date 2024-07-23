import React, { useState } from "react";
import { Button } from "../ui/button.jsx";
import { createRecruitmentPosting } from "../../api/recruitmentApi.js";
import { Input } from "../ui/input.jsx";
import { TextEditor } from "../ui/editor.jsx";
import { Plus, Trash2 } from "lucide-react";

export function AdminRecruitmentCreateModal({ isOpen, onClose, onCreated }) {
  const [editorValue, setEditorValue] = useState("");
  const [newPosting, setNewPosting] = useState({
    title: "",
    description: "",
    position: "",
    questions: [{ question_text: "", max_length: 500 }],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPosting((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditorChange = (value) => {
    setEditorValue(value);
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = newPosting.questions.map((question, idx) => {
      if (index === idx) {
        return { ...question, [field]: value };
      }
      return question;
    });
    setNewPosting((prev) => ({ ...prev, questions: updatedQuestions }));
  };

  const handleAddQuestion = () => {
    setNewPosting((prev) => ({
      ...prev,
      questions: [...prev.questions, { question_text: "", max_length: 500 }],
    }));
  };

  const handleRemoveQuestion = (index) => {
    setNewPosting((prev) => ({
      ...prev,
      questions: prev.questions.filter((_, idx) => idx !== index),
    }));
  };

  const handleCreateSubmit = async () => {
    try {
      const postingToSubmit = { ...newPosting, description: editorValue };
      const response = await createRecruitmentPosting(postingToSubmit);
      alert("채용 공고가 성공적으로 생성되었습니다.");
      onCreated(response);
      onClose();
    } catch (error) {
      console.error("Error creating recruitment posting:", error);
      alert("채용 공고 생성 중 오류가 발생했습니다.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <div
        className={`relative flex bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 w-11/12 max-w-4xl h-[90%]`}
      >
        <div className="flex flex-row w-full h-full">
          <div className="flex-grow p-8 overflow-y-auto hide-scrollbar">
            <div className="flex justify-between pb-3">
              <div className="text-xl font-medium">채용 공고 생성</div>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block font-medium mb-2">제목</label>
                <Input
                  name="title"
                  value={newPosting.title}
                  onChange={handleInputChange}
                  addClass="w-full text-sm"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">직무명</label>
                <Input
                  name="position"
                  value={newPosting.position}
                  onChange={handleInputChange}
                  addClass="w-full text-sm"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">상세 내용</label>
                <TextEditor value={editorValue} onChange={handleEditorChange} />
              </div>

              {newPosting.questions.map((question, index) => (
                <div key={index} className="relative">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <label className="block font-medium mr-2">
                        문항 {index + 1}
                      </label>
                      <div
                        className="text-gray-500 cursor-pointer"
                        onClick={() => handleRemoveQuestion(index)}
                      >
                        <Trash2 strokeWidth={1} className="h-4 w-4" />
                      </div>
                    </div>

                    <div className="flex items-center">
                      <label className="block font-medium mr-2">
                        최대 글자 수
                      </label>
                      <Input
                        name="max_length"
                        type="number"
                        value={question.max_length}
                        onChange={(e) =>
                          handleQuestionChange(
                            index,
                            "max_length",
                            e.target.value,
                          )
                        }
                        addClass="w-[80px] text-xs"
                      />
                    </div>
                  </div>

                  <Input
                    name="question_text"
                    value={question.question_text}
                    onChange={(e) =>
                      handleQuestionChange(
                        index,
                        "question_text",
                        e.target.value,
                      )
                    }
                    addClass="w-full text-sm"
                  />
                </div>
              ))}

              <Button
                text={"문항 추가하기"}
                block={true}
                leftIcon={<Plus />}
                onClick={handleAddQuestion}
              />

              <div className="flex justify-center gap-4 mt-4">
                <Button text="취소" onClick={onClose} />
                <Button
                  text="생성하기"
                  variant="primary"
                  onClick={handleCreateSubmit}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminRecruitmentCreateModal;
