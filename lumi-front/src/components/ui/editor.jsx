import { useMemo, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

const formats = [
  "font",
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "align",
  "color",
  "background",
  "size",
  "h1",
];

export const TextEditor = ({ value, onChange }) => {
  const quillRef = useRef(null);

  return (
    <div className="mb-5" style={{ height: "350px" }}>
      <ReactQuill
        style={{ minHeight: "300px", height: "300px" }}
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        placeholder="내용을 입력하세요."
      />
    </div>
  );
};
