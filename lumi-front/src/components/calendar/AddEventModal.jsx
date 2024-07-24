import React, { useState } from "react";
import Modal from "react-modal";
import { TextField, Checkbox, FormControlLabel } from "@mui/material";
import {
  LocalizationProvider,
  DateTimePicker,
  DatePicker,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { ko } from "date-fns/locale/ko";
import Button from "../ui/button";
import "tailwindcss/tailwind.css";
import { adminCreateEvent } from "../../api/calendarApi.js";

export const eventCategories = [
  {
    label: "회사 이벤트",
    value: "company_event",
    color: "#378ef8",
    emoji: "👔",
  },
  { label: "자격증 시험", value: "certificate", color: "#53a43f", emoji: "💯" },
  { label: "경조사", value: "family_event", color: "#d97a80", emoji: "🎊" },
  {
    label: "외부 행사",
    value: "external_event",
    color: "#e66a35",
    emoji: "🧳",
  },
  { label: "공휴일", value: "public_holiday", color: "red", emoji: "🏖️" },
  { label: "기타", value: "others", color: "gray", emoji: "🤷" },
];

const AddEventModal = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [allDay, setAllDay] = useState(false);
  const [category, setCategory] = useState(eventCategories[0].label);

  const extractTime = (date) => {
    // Extract hours, minutes, and seconds
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    // Return the time in HH:MM:SS format
    return `${hours}:${minutes}`;
  };

  const extractDate = (date) => {
    // Extract year, month, and day
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const day = date.getDate().toString().padStart(2, "0");

    // Return the date in YYYY-MM-DD format
    return `${year}-${month}-${day}`;
  };

  const handleSave = async () => {
    const event = {
      title,
      start: startDate,
      end: endDate,
      allDay,
      color: eventCategories.find((cat) => cat.label === category).color,
      emoji: eventCategories.find((cat) => cat.label === category).emoji,
    };
    const data = {
      title,
      content: title,
      start_date: extractDate(startDate),
      end_date: extractDate(endDate),
      tag: eventCategories.find((cat) => cat.label === category).value,
    };
    if (!allDay) {
      data.start_time = extractTime(startDate);
      data.end_time = extractTime(endDate);
    }
    await adminCreateEvent(data);
    onSave(event);
    setTitle("");
    setStartDate(new Date());
    setEndDate(new Date());
    setAllDay(false);
    setCategory(eventCategories[0].label);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add Event"
      className="bg-white rounded-lg p-10 w-[700px] h-[550px] mx-auto mt-20 shadow-lg"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20"
    >
      <h2 className="text-xl mb-4 font-semibold">일정 추가하기</h2>
      <div className="mb-4">
        <label className="block mb-2">제목</label>
        <TextField
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">카테고리</label>
        <select
          className="w-full px-3 py-2 border rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {eventCategories.map((cat) => (
            <option key={cat.label} value={cat.label}>
              {cat.emoji} {cat.label}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <FormControlLabel
          control={
            <Checkbox
              checked={allDay}
              onChange={(e) => setAllDay(e.target.checked)}
            />
          }
          label="하루 종일"
        />
      </div>
      <div className={"flex justify-between"}>
        <div className="mb-4">
          <label className="block mb-2">시작일</label>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
            {allDay ? (
              <DatePicker
                renderInput={(props) => <TextField {...props} fullWidth />}
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
              />
            ) : (
              <DateTimePicker
                renderInput={(props) => <TextField {...props} fullWidth />}
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
              />
            )}
          </LocalizationProvider>
        </div>
        <div className="mb-4">
          <label className="block mb-2">종료일</label>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
            {allDay ? (
              <DatePicker
                renderInput={(props) => <TextField {...props} fullWidth />}
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
              />
            ) : (
              <DateTimePicker
                renderInput={(props) => <TextField {...props} fullWidth />}
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
              />
            )}
          </LocalizationProvider>
        </div>
      </div>

      <div className="flex items-center justify-end pt-7">
        <div className={"mx-3"}>
          <Button text={"취소"} onClick={onClose} />
        </div>
        <div className={""}>
          <Button
            text={"생성"}
            variant={"teams"}
            type="submit"
            onClick={handleSave}
          />
        </div>
      </div>
    </Modal>
  );
};

export default AddEventModal;
