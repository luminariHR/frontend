import Layout from "../Layout.jsx";
import { SidebarProvider } from "../Sidebar.jsx";
import React, { useState, useEffect, useRef } from "react";
import { OrgChartModal } from "./OrgChart.jsx";
import { fetchDepartments } from "../../api/departmentApi.js";
import DeptInfoModal from "./DeptInfoModal.jsx";
import { CircleAlert } from "lucide-react";

export default function OrgChartPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeptInfoModal, setShowDeptInfoModal] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  let addNodeChildFunc = null;
  const orgChartContainer = useRef(null);

  function onNodeClick(node) {
    setShowDeptInfoModal(true);
    setSelectedNode(node);
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchDepartments();
      setData(
        response.map((dept) => ({
          id: dept.department_id,
          parentId: dept.parent_department_id,
          department_id: dept.department_id,
          object_id: dept.id,
          name: dept.name,
          head: dept.head ? dept.head.name : "공석",
          address: dept.address,
        })),
      );
      setLoading(false);
    };
    fetchData();
  }, [true]);

  return (
    <SidebarProvider>
      <Layout>
        <div className={"h-[80%]"} ref={orgChartContainer}>
          <div className="flex flex-row justify-between">
            <h2>
              <span className="text-[#8a8686]">메인 &gt;</span>{" "}
              <span className="font-semibold text-[#20243f]">조직도</span>
            </h2>
            <h2 className="flex">
              <span>
                <CircleAlert className="text-gray-500 h-[20px]" />
              </span>
              <span className="text-gray-500 ml-2 text-[14px]">
                업무 외 개인정보 이용 금지
              </span>
            </h2>
          </div>
          <OrgChartModal
            setClick={(click) => (addNodeChildFunc = click)}
            onNodeClick={onNodeClick}
            data={data}
          />
          <DeptInfoModal
            dept={selectedNode}
            isOpen={showDeptInfoModal}
            onClose={() => {
              setSelectedNode(null);
              setShowDeptInfoModal(false);
            }}
          />
        </div>
      </Layout>
    </SidebarProvider>
  );
}
