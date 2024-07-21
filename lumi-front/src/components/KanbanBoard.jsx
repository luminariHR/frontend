import React, { useEffect } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { kanbanListState } from "../state/kanbanState";
import KanbanList from "./KanbanList";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Card from "./Card";
import { fetchTodoData } from "../api/kanbanApi.js";

const KanbanBoard = () => {
  const kanbanList = useRecoilValue(kanbanListState);
  const setKanbanList = useSetRecoilState(kanbanListState);

  const titleName = [
    { id: 1, title: "To Do" },
    { id: 2, title: "In Progress" },
    { id: 3, title: "Completed" },
  ];

  const cardDataHandler = (cardTitle) => {
    if (!kanbanList) return [];
    return kanbanList
      .filter(
        (data) => data.status === cardTitle.toLowerCase().replace(" ", "_"),
      )
      .map((item) => <Card key={item.id} item={item} />);
  };

  useEffect(() => {
    const getTodoData = async () => {
      const data = await fetchTodoData();
      if (data) {
        const formattedData = [
          ...data.to_do.map((task) => ({ ...task, status: "to_do" })),
          ...data.in_progress.map((task) => ({
            ...task,
            status: "in_progress",
          })),
          ...data.completed.map((task) => ({ ...task, status: "completed" })),
        ];
        setKanbanList(formattedData);
      }
    };

    getTodoData();
  }, [setKanbanList]);

  return (
    <div className="mt-2 flex space-x-6">
      <DndProvider backend={HTML5Backend}>
        {titleName.map((data) => (
          <KanbanList key={data.id} title={data.title}>
            {cardDataHandler(data.title)}
          </KanbanList>
        ))}
      </DndProvider>
    </div>
  );
};

export default KanbanBoard;
