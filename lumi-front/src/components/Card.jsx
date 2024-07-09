import { useState, useCallback, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { useDrag, useDrop } from "react-dnd";
import { kanbanListState } from "../state/kanbanState";
import { CalendarDays } from "lucide-react";
import { createTask, updateTaskStatus, deleteTask } from "../api/kanbanApi.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Card({ item }) {
  const [list, setList] = useRecoilState(kanbanListState);
  const index = list.findIndex((data) => data === item);
  const ref = useRef(null);
  const [endDate, setEndDate] = useState(new Date(item.end_date));
  const [isCreated, setIsCreated] = useState(!item.isNew);

  const replaceIndex = (list, index, data) => {
    return [...list.slice(0, index), data, ...list.slice(index + 1)];
  };

  const changeItemCategory = useCallback(
    async (selectedItem, newStatus) => {
      try {
        await updateTaskStatus(selectedItem.id, newStatus);
        setList((prev) => {
          return prev.map((e) => ({
            ...e,
            status: e.id === selectedItem.id ? newStatus : e.status,
          }));
        });
      } catch (error) {
        console.error("Error updating task status:", error);
      }
    },
    [setList],
  );

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "card",
    item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (dropResult) {
        changeItemCategory(
          item,
          dropResult.name.toLowerCase().replace(" ", "_"),
        );
      }
    },
  }));

  const editTitle = async (e) => {
    const newList = replaceIndex(list, index, {
      ...item,
      title: e.target.value,
    });
    setList(newList);

    if (e.target.value && item.content) {
      await createTask(item);
    }
  };

  const editText = async (e) => {
    const newList = replaceIndex(list, index, {
      ...item,
      content: e.target.value,
    });
    setList(newList);
  };

  const handleCreateTask = async () => {
    console.log("원래 list", list);
    try {
      const taskData = {
        title: item.title,
        content: item.content,
        start_date: new Date(item.start_date).toISOString(),
        end_date: new Date(item.end_date).toISOString(),
        status: item.status,
      };

      const createdTask = await createTask(taskData);
      setList((prev) => {
        const newList = replaceIndex(prev, index, {
          ...item,
          id: createdTask.data.id,
          assignee: createdTask.data.assignee,
          reporter: createdTask.data.reporter,
          created_at: createdTask.data.created_at,
          updated_at: createdTask.data.updated_at,
          order_index: createdTask.data.order_index,
          isNew: false,
        });
        console.log("new list", newList);

        return newList;
      });
      setIsCreated(true);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const deleteItem = async () => {
    const response = await deleteTask(item.id);
    if (response) {
      setList([...list.slice(0, index), ...list.slice(index + 1)]);
    }
  };

  const handleResizeHeight = useCallback(() => {
    if (ref === null || ref.current === null) return;
    ref.current.style.height = "70px";
    ref.current.style.height = `${ref.current.scrollHeight}px`;
  }, []);

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
        className={`mb-[6px] text-lg font-semibold disabled:bg-white`}
        type="text"
        disabled={isCreated}
        value={item.title}
        onChange={editTitle}
        placeholder="제목을 입력하세요"
      />
      <textarea
        className={`text-gray-400 text-xs mb-5 disabled:bg-white`}
        value={item.content}
        disabled={isCreated}
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
            {endDate ? (
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="yyyy-MM-dd"
              />
            ) : (
              <CalendarDays />
            )}
          </div>
        </div>
        <div
          className="flex justify-between align-middle"
          style={{ opacity: isDragging ? 0.3 : 1 }}
        >
          {isCreated ? (
            <button
              className="px-2 py-1 text-xs text-gray-500"
              onClick={deleteItem}
            >
              delete
            </button>
          ) : (
            <button
              className="px-2 py-1 text-xs text-gray-500"
              onClick={handleCreateTask}
            >
              create
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
