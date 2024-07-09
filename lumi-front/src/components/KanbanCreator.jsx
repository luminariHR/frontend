import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { kanbanListState } from "../state/kanbanState";
import { createTask } from "../api/kanbanApi.js";

export default function KanbanCreator({ title }) {
  const [kanbanList, setKanbanList] = useRecoilState(kanbanListState);

  const getCategoryFromTitle = (title) => {
    switch (title) {
      case "To Do":
        return "to_do";
      case "In Progress":
        return "in_progress";
      case "Completed":
        return "completed";
      default:
        return "to_do";
    }
  };

  const addCard = useCallback(() => {
    const newCard = {
      id: `temp-${new Date().getTime()}`,
      title: "",
      content: "",
      start_date: new Date().toISOString(),
      end_date: new Date().toISOString(),
      status: getCategoryFromTitle(title),
      isNew: true,
    };

    setKanbanList((prev) => [...prev, newCard]);
  }, [setKanbanList, title]);

  return (
    <div className="text-center">
      <button
        className="px-2 py-1 text-xs border-gray-200 bg-white font-medium"
        onClick={addCard}
      >
        + Add task
      </button>
    </div>
  );
}
