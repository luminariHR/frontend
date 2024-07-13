import React, { useEffect, useState } from "react";
import { fetchAllUsers } from "../../api/userApi.js";
import { UserCard } from "../ui/userCard.jsx";
import "../../styles/scrollbar.css";

export const AddApprovalStepModal = ({
  userData,
  isOpen,
  onSelect,
  onClose,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);

  const filteredData = searchTerm
    ? users.filter((item) => {
        return item.name.toLowerCase().includes(searchTerm.toLowerCase());
      })
    : users;

  const isUserSelected = (userId) => {
    return userData.some((user) => user.id === userId);
  };

  const handleItemSelect = (item) => {
    if (!isUserSelected(item.id)) {
      onSelect(item);
      // Reset search term to prevent further filtering and close the modal
      setSearchTerm("");
      onClose();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAllUsers();
      if (data) {
        setUsers(data);
      }
    };
    fetchData();
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-20">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 h-[60%] overflow-hidden">
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-gray-900 float-right"
        >
          닫기
        </button>
        <h2 className=" text-xl mb-4 font-semibold">결재권자 추가</h2>
        <input
          type="text"
          placeholder="이름을 적어주세요."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <div className={"h-[80%] overflow-y-auto hide-scrollbar"}>
          <ul className={""}>
            {filteredData.map((item, index) => {
              return (
                <li
                  key={index}
                  className={`p-2 border-b border-gray-300 ${
                    isUserSelected(item.id) || !item.department
                      ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                      : "hover:bg-gray-200 cursor-pointer"
                  }`}
                  onClick={() => handleItemSelect(item)}
                >
                  <UserCard userItem={item} />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
