import React from "react";
import KanbanCreator from "./KanbanCreator";
import { useDrop } from "react-dnd";

const KanbanList = ({ title, children }) => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: "card",
    drop: () => ({ name: title }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const getTitleBedgeStyle = (title) => {
    switch (title) {
      case "To Do":
        return "bg-[#5030E5]";
      case "In Progress":
        return "bg-[#FFA500]";
      case "Completed":
        return "bg-[#8BC48A]";
      default:
        return "bg-gray-100 border-gray-500";
    }
  };

  const getTitleStyle = (title) => {
    switch (title) {
      case "To Do":
        return "border-[#5030E5]";
      case "In Progress":
        return "border-[#FFA500]";
      case "Completed":
        return "border-[#8BC48A]";
      default:
        return "bg-gray-100 border-gray-500";
    }
  };

  // useEffect(() => {
  //   console.log("KanbanList.jsx / children", children);
  // }, []);

  return (
    <div
      ref={drop}
      className={`shadow p-4 w-[300px] h-fit ${isOver ? "bg-blue-100" : "bg-[#F8F8FF]"}`}
    >
      <div
        className={`flex py-3 justify-between space-x-2 items-center border-b-[3px] ${getTitleStyle(title)}`}
      >
        <div className="flex justify-center align-middle items-center">
          <div
            className={`mr-2 rounded-[50%] w-2 h-2 ${getTitleBedgeStyle(title)} `}
          ></div>
          <div className="font-medium mr-2">{title}</div>
          <div className="bg-gray-200 text-gray-500 text-center text-xs rounded-[50%] w-5 h-5">
            {React.Children.count(children)}
          </div>
        </div>
        <KanbanCreator title={title} />
      </div>
      {children}
    </div>
  );
};

export default KanbanList;
