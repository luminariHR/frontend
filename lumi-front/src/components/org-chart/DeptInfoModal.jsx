import React, { useEffect, useState } from "react";
import { UserAvatar } from "../ui/avatar.jsx";
import { fetchOneDepartment } from "../../api/departmentApi.js";
import ClipLoader from "react-spinners/ClipLoader.js";
import { useRecoilValue } from "recoil";
import { loggedInUserState } from "../../state/userAtom.js";
import Button from "../ui/button.jsx";

export default function DeptInfoModal({ isOpen, onClose, dept }) {
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useRecoilValue(loggedInUserState);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (dept) {
        const response = await fetchOneDepartment(dept.data.object_id);
        setDepartment(response);
        setLoading(false);
      }
    };
    fetchData();
  }, [dept]);

  const isDuplicate = (department, member) => {
    return (
      !department.head || (department.head && member.id !== department.head.id)
    );
  };

  if (!isOpen || !dept) return null;

  return (
    <div
      className={
        "absolute top-32 right-20 bg-white shadow-lg rounded-lg w-[30%] h-[80%] max-w-96 py-12 px-8"
      }
    >
      {department && !loading ? (
        <>
          <div className={"flex items-center justify-between"}>
            <div className={"font-bold text-2xl mb-1"}>{department.name}</div>
            <div className={"mx-1"}>
              <Button variant="default" text={"닫기"} onClick={onClose} />
            </div>
          </div>
          <div className={"text-gray-500 text-lg mb-8"}>
            {department.address}
          </div>
          <div className={"font-semibold text-md my-2 text-gray-700"}>
            부서장
          </div>
          <div className={"flex items-center mt-4"}>
            {department.head ? (
              <>
                <div className="bg-gray-200 flex-shrink-0 overflow-hidden rounded-full mr-3 w-7 h-7">
                  <UserAvatar
                    userProfileImg={department.profile_image}
                    userName={department.name}
                  />
                </div>
                <div className={"text-md mr-2"}>{department.head.name}</div>
                <div className={"text-sm text-gray-500"}>
                  {department.head.job_title}
                </div>
                {department.head.id === user.id ? (
                  <div
                    className={
                      "text-sm ml-3 rounded-[8px] border-[1px] py-[2px] px-[10px] border-black font-bold text-center inline-block"
                    }
                  >
                    본인
                  </div>
                ) : null}
                {department.head.is_ooo ? (
                  <div
                    className={
                      "text-sm ml-3 rounded-[8px] border-[1px] py-[2px] px-[10px] border-black font-bold text-center inline-block"
                    }
                  >
                    휴가
                  </div>
                ) : null}
              </>
            ) : (
              <>
                <div className="bg-gray-200 flex-shrink-0 overflow-hidden rounded-full mr-3 w-7 h-7"></div>
                <div className={"text-md"}>{"공석"}</div>
              </>
            )}
          </div>
          <div className={"font-semibold text-md mt-14 mb-2 text-gray-700"}>
            소속 멤버
          </div>
          <div className={"relative mt-4"}>
            {department.members.length == 0 ? (
              <div className={"text-md mr-2"}>없음</div>
            ) : null}
            {department.members.map((member, index) => {
              if (isDuplicate(department, member)) {
                return (
                  <div key={member.id} className={"flex items-center mb-4"}>
                    <div className="bg-gray-200 flex-shrink-0 overflow-hidden rounded-full mr-3 w-7 h-7">
                      <UserAvatar
                        userProfileImg={member.profile_image}
                        userName={member.name}
                      />
                    </div>
                    <div className={"text-md mr-2"}>{member.name}</div>
                    <div className={"text-sm text-gray-500"}>
                      {member.job_title}
                    </div>
                    {member.id === user.id ? (
                      <div
                        className={
                          "text-sm ml-3 rounded-[8px] border-[1px] py-[2px] px-[10px] border-black font-bold text-center inline-block"
                        }
                      >
                        본인
                      </div>
                    ) : null}
                    {member.is_ooo ? (
                      <div
                        className={
                          "text-sm ml-3 rounded-[8px] border-[1px] py-[2px] px-[10px] border-black font-bold text-center inline-block"
                        }
                      >
                        휴가
                      </div>
                    ) : null}
                  </div>
                );
              }
              return null;
            })}
          </div>
          <div className={"font-semibold text-md mt-14 mb-2 text-gray-700"}>
            기타 정보
          </div>
          <div className={"relative mt-4"}>
            <div className={"flex items-center mb-2"}>
              <div className={"text-sm mr-2"}>상위 부서</div>
              <div className={"text-sm text-gray-500"}>
                {department.parent_department_id}
              </div>
            </div>
            <div className={"flex items-center mb-2"}>
              <div className={"text-sm mr-2"}>직속 부서</div>
              <div className={"text-sm text-gray-500"}>
                {dept.data._directSubordinates}
              </div>
            </div>
            <div className={"flex items-center mb-2"}>
              <div className={"text-sm mr-2"}>하위 부서</div>
              <div className={"text-sm text-gray-500"}>
                {dept.data._totalSubordinates}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div
          className={"flex w-full justify-center items-center m-auto w-1/2 p-8"}
        >
          <ClipLoader
            color={"#5d5bd4"}
            loading={loading}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
    </div>
  );
}
