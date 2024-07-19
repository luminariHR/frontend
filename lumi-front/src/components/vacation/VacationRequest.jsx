import React, { useState } from "react";
import { Calendar, CalendarDays, CircleX } from "lucide-react";
import Button from "../ui/button";
import { useDropzone } from "react-dropzone";
import { TextEditor } from "../ui/editor";
import DatePicker from "react-datepicker";

export function VacationRequestModal({ onClose, onRequestSubmit, category }) {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [editorValue, setEditorValue] = useState("");
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

  const handleEditorChange = (value) => {
    setEditorValue(value);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("content", editorValue);
    formData.append("start_date", startDate.toISOString().split("T")[0]);
    formData.append(("end_date", endDate.toISOString().split("T")[0]));
    if (selectedFile) {
      formData.append("file", selectedFile);
    }
    console.log("formdata", formData);
    // await requestReview(formData);
    // const refreshedSentRequest = await fetchSentRequest();
    // if (refreshedSentRequest) {
    //   onRequestSubmit(refreshedSentRequest);
    // }
    onClose();
  };

  const isSubmittable = () => {
    if (title && editorValue && reviewers.length > 0) return true;
    return false;
  };

  const dayClassName = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d.getTime() === today.getTime() ? "today-selected" : "";
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <div
        className={`relative flex bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 w-11/12 max-w-4xl h-[90%]`}
      >
        <div className="flex flex-row w-full h-full">
          <div className="flex-grow p-8 overflow-auto ">
            <div className="overflow-y-auto max-h-full h-full flex flex-col justify-between hide-scrollbar">
              <div className="flex justify-between mb-6">
                <h2 className="text-xl font-semibold">{category} 신청하기</h2>
              </div>

              <div className="mb-5">
                <h3 className="text-l font-semibold">날짜 선택</h3>
                <div className="my-3">
                  <div className="flex items-center gap-4">
                    <label className="flex p-2 border rounded bg-white">
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="yyyy-MM-dd"
                        className={
                          "outline-none cursor-pointer caret-transparent"
                        }
                        dayClassName={dayClassName}
                      />
                      <CalendarDays />
                    </label>
                    <span className="mx-1 font-semibold">~</span>
                    <label className="flex p-2 border rounded bg-white">
                      <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        dateFormat="yyyy-MM-dd"
                        className={
                          "outline-none cursor-pointer caret-transparent"
                        }
                        dayClassName={dayClassName}
                      />
                      <CalendarDays />
                    </label>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <h3 className="text-l font-semibold">파일 첨부</h3>
                <div className={"bg-gray-100 p-5 my-3 rounded-lg"}>
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
                        ].includes(selectedFile.type)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-l font-semibold mb-3">
                  <span className="mr-2">상세 내용</span>
                  <span className="font-normal text-xs text-gray-500">
                    필요시 작성해주세요.
                  </span>
                </h3>
                <TextEditor value={editorValue} onChange={handleEditorChange} />
              </div>
              <div className="flex items-center justify-center">
                <div className={"mx-1"}>
                  <Button text={"취소"} onClick={onClose} />
                </div>
                <div className={"mx-1"}>
                  {
                    <Button
                      text={"휴가 신청하기"}
                      variant={"teams"}
                      type="submit"
                      onClick={handleSubmit}
                    />
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
