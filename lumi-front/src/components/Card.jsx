// src/components/Card.jsx
import { useCallback, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { useDrag, useDrop } from "react-dnd";
import { kanbanListState } from "../state/kanbanState";
import { CalendarDays } from "lucide-react";
import { updateTaskOrder, deleteTask } from "../api/kanbanApi.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Card({ item }) {
  const [list, setList] = useRecoilState(kanbanListState);
  const index = list.findIndex((data) => data === item);
  const ref = useRef(null);

  const replaceIndex = (list, index, data) => {
    return [...list.slice(0, index), data, ...list.slice(index + 1)];
  };

  const changeItemCategory = async (selectedItem, title, previousTaskId) => {
    const response = await updateTaskOrder(
      selectedItem.id,
      previousTaskId,
      title.toLowerCase().replace(" ", "_"),
    );
    if (response) {
      setList((prev) => {
        return prev.map((e) => ({
          ...e,
          category:
            e.id === selectedItem.id ? response.data.status : e.category,
        }));
      });
    }
  };

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "card",
    item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: async (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (dropResult) {
        const dropIndex = list.findIndex((task) => task.id === item.id);
        const previousTask = list[dropIndex - 1] || { id: 0 };
        await changeItemCategory(item, dropResult.name, previousTask.id);
      }
    },
  }));

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: "card",
    drop: () => ({ name: item.category }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const editTitle = (e) => {
    const newList = replaceIndex(list, index, {
      ...item,
      title: e.target.value,
    });
    setList(newList);
  };

  const editText = (e) => {
    const newList = replaceIndex(list, index, {
      ...item,
      content: e.target.value,
    });
    setList(newList);
  };

  const handleResizeHeight = useCallback(() => {
    if (ref === null || ref.current === null) return;
    ref.current.style.height = "70px";
    ref.current.style.height = `${ref.current.scrollHeight}px`;
  }, []);

  const deleteItem = async () => {
    const response = await deleteTask(item.id);
    if (response) {
      setList([...list.slice(0, index), ...list.slice(index + 1)]);
    }
  };

  const handleEndDateChange = (date) => {
    const newList = replaceIndex(list, index, {
      ...item,
      end_date: date,
    });
    setList(newList);
  };

  return (
    <div
      className="flex flex-col p-5 rounded-2xl my-4 bg-white shadow"
      ref={dragRef}
    >
      <input
        className="mb-[6px] text-lg font-semibold"
        type="text"
        value={item.title}
        onChange={editTitle}
        placeholder="제목을 입력하세요"
      />
      <textarea
        className="text-gray-400 text-xs mb-5"
        value={item.content}
        onChange={editText}
        onInput={handleResizeHeight}
        ref={ref}
        placeholder="내용을 입력하세요"
        spellCheck="false"
      />
      <div className="flex justify-between items-center">
        <div className="text-xs text-gray-400">
          {/*<div className="flex">*/}
          {/*  <p className="">시작일&nbsp;:&nbsp;</p>*/}
          {/*  <span> {item.start_date.slice(0, 10)}</span>*/}
          {/*</div>*/}
          <div className="flex">
            <p className="">기한&nbsp;:&nbsp;</p>
            <DatePicker
              selected={item.end_date ? new Date(item.end_date) : null}
              onChange={handleEndDateChange}
              dateFormat="yyyy-MM-dd"
              placeholderText="기한을 선택하세요"
              className="text-xs"
            />
          </div>
        </div>
        <div
          className="flex justify-between align-middle"
          style={{ opacity: isDragging ? 0.3 : 1 }}
        >
          <button
            className="px-2 py-1 text-xs text-gray-500"
            onClick={deleteItem}
          >
            delete
          </button>
        </div>
      </div>
    </div>
  );
}
