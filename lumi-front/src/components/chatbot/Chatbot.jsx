import React, { useState, useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import { loggedInUserState } from "../../state/userAtom.js";
import { askQuestion } from "../../api/chatbotApi.js";
import ClipLoader from "react-spinners/ClipLoader";

export default function Chatbot({ isOpen, onClose }) {
  const user = useRecoilValue(loggedInUserState);
  const messagesEndRef = useRef(null);
  const [category, setCategory] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");
  const [hideIntroductoryText, setHideIntroductoryText] = useState(false);

  const categories = [
    { id: "onboarding_offboarding", label: "온보딩 / 오프보딩" },
    { id: "company_policies", label: "회사 가이드 / 정책" },
    { id: "others", label: "기타" },
  ];

  const handleSend = async () => {
    if (input.trim()) {
      const userMessageText = input;
      const userMessage = { text: userMessageText, sender: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInput("");
      setIsLoading(true);

      try {
        const response = await askQuestion(userMessageText, category);

        if (response) {
          const botMessage = { text: response.answer, sender: "bot" };
          setMessages((prevMessages) => [...prevMessages, botMessage]);
        } else {
          console.error("Error in API call");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleCategoryClick = (categoryId, categoryLabel) => {
    setCategory(categoryId);
    const botMessage = {
      text: `아하! ${categoryLabel}에 대해서 궁금하시군요! 어떤 점이 궁금하신가요?`,
      sender: "bot",
    };
    setMessages([...messages, botMessage]);
    setHideIntroductoryText(true);
  };

  const handleBackButtonClick = () => {
    setCategory(null);
    setMessages([]);
    setHideIntroductoryText(false);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-lg z-50 h-[600px] flex flex-col">
      <div className="bg-gray-800 text-white p-4 rounded-t-lg flex justify-between items-center">
        <span className="font-bold">루미와 대화하기</span>
        <button className="text-gray-300 hover:text-white" onClick={onClose}>
          &times;
        </button>
      </div>
      <div className="p-4 flex-grow overflow-y-auto">
        {!hideIntroductoryText ? (
          <>
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <p className="text-sm">{`안녕하세요!`}</p>
              <p className="text-sm">
                <b>{`${user.name}`}</b>
                {`님의 슬기로운 회사생활 도우미, `}
                <b>{`루미`}</b>
                {`입니다.`}
              </p>
              <p className="text-sm">{`도움이 필요하신 분야를 눌러주세요.`}</p>
            </div>
            <div className="space-y-2 flex flex-col items-center">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    handleCategoryClick(category.id, category.label);
                  }}
                  className="text-sm w-[80%] bg-white border-black border-[1px] py-2 px-4 rounded-full text-left hover:bg-gray-200"
                >
                  <b>{`${category.label}`}</b>
                  {`에 대해서 알고 싶어요.`}
                </button>
              ))}
            </div>
          </>
        ) : null}
        <div>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`py-2 px-4 rounded-full text-left mb-4 ${
                message.sender === "user"
                  ? "ml-auto bg-[#8583fd] p-4 rounded-lg text-sm text-white w-[90%]"
                  : "mr-auto bg-gray-100 p-4 rounded-lg text-sm text-black w-[90%]"
              }`}
            >
              {message.text}
            </div>
          ))}
          {isLoading && (
            <div
              key={"loading-bar"}
              className={`flex items-center py-2 px-4 rounded-full text-left mb-4 mr-auto bg-gray-100 p-4 rounded-lg text-sm text-black w-[90%]`}
            >
              <ClipLoader
                color={"#5d5bd4"}
                loading={isLoading}
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
              <span className={"ml-2"}>루미가 문서를 조회 중입니다...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="space-y-2 flex flex-col items-center">
          {hideIntroductoryText ? (
            <button
              onClick={() => {
                handleBackButtonClick();
              }}
              className="mt-3 text-sm w-[50%] bg-white border-black border-[1px] py-2 px-4 rounded-full text-center hover:bg-gray-200"
            >
              {`메인으로 돌아가기`}
            </button>
          ) : null}
        </div>
      </div>
      <div className="p-4 border-t">
        <input
          type="text"
          placeholder="Ask a question"
          className="w-full border rounded-full py-2 px-4"
          value={input}
          disabled={isLoading || !hideIntroductoryText}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
        />
      </div>
    </div>
  );
}
