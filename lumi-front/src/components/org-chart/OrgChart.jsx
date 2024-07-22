import React, { useLayoutEffect, useRef, useEffect } from "react";
import { OrgChart } from "d3-org-chart";
import * as d3 from "d3";

export const OrgChartModal = (props, ref) => {
  const d3Container = useRef(null);
  let chart = null;

  const addNode = (node) => {
    chart.addNode(node);
  };

  props.setClick(addNode);

  // We need to manipulate DOM
  useLayoutEffect(() => {
    if (props.data && d3Container.current) {
      if (!chart) {
        chart = new OrgChart();
      }
      chart
        .container(d3Container.current)
        .linkUpdate(function (d, i, arr) {
          d3.select(this).attr("stroke", "black");
        })
        .data(props.data)
        .nodeContent((d) => {
          const color = "#FFFFFF";
          return `
            <div style="font-family: 'Inter', sans-serif;background-color:${color}; position:absolute;margin-top:-1px; margin-left:-1px;width:${d.width}px;height:${d.height}px;border-radius:10px;border: 1px solid #E4E2E9">
              <div style="color:#08011E;position:absolute;right:20px;top:17px;font-size:10px;"><i class="fas fa-ellipsis-h"></i></div>
              <div style="background-color:#5d5bd4;height:14px;width:${
                d.width - 2
              }px;border-top-right-radius:10px;border-top-left-radius:10px"></div>
              <div style="font-size:15px;color:#08011E;margin-left:20px;margin-top:15px"> ${d.data.name} </div>
              <div style="color:#08011E;margin-left:20px;margin-top:3px;font-size:10px;"> ${d.data.department_id} </div>
              <div style="color:#08011E;margin-left:20px;margin-top:3px;font-size:10px;"> 부서장: ${d.data.head} </div>
              <div style="color:#08011E;margin-left:20px;margin-top:3px;font-size:10px;"> 직속 부서: ${d.data._directSubordinates} 하위 부서: ${d.data._totalSubordinates}</div>
           </div>`;
        })
        .nodeWidth((d) => 200)
        .nodeHeight((d) => 120)
        .onNodeClick((d, i, arr) => {
          props.onNodeClick(d);
        })
        .render();
    }
  }, [props.data, d3Container.current]);

  return (
    <div>
      <div ref={d3Container} />
    </div>
  );
};
