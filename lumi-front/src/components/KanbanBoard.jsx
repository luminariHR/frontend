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
      // const data = {
      //   to_do: [
      //     {
      //       id: 1,
      //       order_index: 1.0,
      //       assignee: {
      //         id: 3,
      //         name: "변시영",
      //         job_title: "엔지니어",
      //       },
      //       reporter: {
      //         id: 3,
      //         name: "변시영",
      //         job_title: "엔지니어",
      //       },
      //       created_at: "2024-07-01T13:45:47.459703Z",
      //       updated_at: "2024-07-01T13:45:47.459727Z",
      //       title: "주별 업무 API",
      //       content: "주별 업무 API 구현하기",
      //       start_date: "2024-07-01T22:27:46.358015Z",
      //       end_date: "2024-07-14T22:27:46.358015Z",
      //       status: "to_do",
      //       priority: "low",
      //       is_deleted: false,
      //     },
      //   ],
      //   in_progress: [
      //     {
      //       id: 10,
      //       order_index: 0.0,
      //       assignee: {
      //         id: 3,
      //         name: "변시영",
      //         job_title: "엔지니어",
      //       },
      //       reporter: {
      //         id: 3,
      //         name: "변시영",
      //         job_title: "엔지니어",
      //       },
      //       created_at: "2024-07-01T14:26:45.565532Z",
      //       updated_at: "2024-07-01T14:26:45.565545Z",
      //       title: "운동 하기",
      //       content: "운동 하기",
      //       start_date: "2024-07-01T22:27:46.358015Z",
      //       end_date: "2024-07-14T22:27:46.358015Z",
      //       status: "in_progress",
      //       priority: "low",
      //       is_deleted: false,
      //     },
      //     {
      //       id: 12,
      //       order_index: 0.5,
      //       assignee: {
      //         id: 3,
      //         name: "변시영",
      //         job_title: "엔지니어",
      //       },
      //       reporter: {
      //         id: 3,
      //         name: "변시영",
      //         job_title: "엔지니어",
      //       },
      //       created_at: "2024-07-01T14:27:09.061533Z",
      //       updated_at: "2024-07-01T14:27:48.255561Z",
      //       title: "영화 보기",
      //       content: "영화 보기",
      //       start_date: "2024-07-01T22:27:46.358015Z",
      //       end_date: "2024-07-14T22:27:46.358015Z",
      //       status: "in_progress",
      //       priority: "low",
      //       is_deleted: false,
      //     },
      //     {
      //       id: 11,
      //       order_index: 1.0,
      //       assignee: {
      //         id: 3,
      //         name: "변시영",
      //         job_title: "엔지니어",
      //       },
      //       reporter: {
      //         id: 3,
      //         name: "변시영",
      //         job_title: "엔지니어",
      //       },
      //       created_at: "2024-07-01T14:26:58.292189Z",
      //       updated_at: "2024-07-01T14:26:58.292201Z",
      //       title: "오프라인 참석하기",
      //       content: "오프라인 참석하기",
      //       start_date: "2024-07-01T22:27:46.358015Z",
      //       end_date: "2024-07-14T22:27:46.358015Z",
      //       status: "in_progress",
      //       priority: "low",
      //       is_deleted: false,
      //     },
      //   ],
      //   completed: [
      //     {
      //       id: 2,
      //       order_index: 0.0,
      //       assignee: {
      //         id: 3,
      //         name: "변시영",
      //         job_title: "엔지니어",
      //       },
      //       reporter: {
      //         id: 3,
      //         name: "변시영",
      //         job_title: "엔지니어",
      //       },
      //       created_at: "2024-07-01T14:00:02.519913Z",
      //       updated_at: "2024-07-01T14:03:56.109463Z",
      //       title: "주별 업무 디자인",
      //       content: "주별 업무 디자인하기",
      //       start_date: "2024-07-01T22:27:46.358015Z",
      //       end_date: "2024-07-14T22:27:46.358015Z",
      //       status: "completed",
      //       priority: "low",
      //       is_deleted: false,
      //     },
      //   ],
      // };
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
