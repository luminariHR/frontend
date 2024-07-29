import{k as _,u as A,r as n,j as e,D as C,O as i,z as P,B as u}from"./index-BvEyhJvC.js";import{f as S,s as D}from"./recruitmentApi-Bm-QUMlW.js";/* empty css                         */import{I as d}from"./input-D1N2lLD0.js";function L(){const{id:r}=_(),x=A(),[l,j]=n.useState(null),[p,g]=n.useState(""),[h,N]=n.useState(""),[f,b]=n.useState(""),[c,v]=n.useState({});n.useEffect(()=>{(async()=>{try{const t=(await S()).find(m=>m.id.toString()===r);t&&j(t)}catch(a){console.error("Error fetching job data:",a)}})()},[r]);const o=s=>{const{name:a,value:t}=s.target;a==="name"?g(t):a==="email"?N(t):a==="phone"&&b(t)},w=(s,a)=>{v(t=>({...t,[s]:a}))},y=async()=>{const s={posting_id:r,applicant_name:p,applicant_email:h,applicant_phone_number:f,answers:Object.entries(c).map(([a,t])=>({question_id:parseInt(a),answer_text:t}))};try{await D(s),alert("지원서가 성공적으로 제출되었습니다."),x("/career")}catch(a){console.error("지원서 제출 중 오류가 발생했습니다.",a),alert("지원서 제출 중 오류가 발생했습니다.")}};return l?e.jsxs("div",{className:"flex flex-col min-h-dvh",children:[e.jsxs("header",{className:"px-4 lg:px-6 h-14 flex items-center",children:[e.jsxs(i,{to:"/",className:"flex items-center justify-center",children:[e.jsx("img",{src:P,className:"h-16 w-auto",alt:"Logo"}),e.jsx("span",{className:"sr-only",children:"Acme Recruitment"})]}),e.jsx("nav",{className:"ml-auto flex gap-4 sm:gap-6",children:e.jsx(i,{to:"/login",className:"text-sm font-medium hover:underline underline-offset-4",children:"기업회원 로그인"})})]}),e.jsx("main",{className:"flex-1",children:e.jsx("section",{className:"w-full border-y",children:e.jsxs("div",{children:[e.jsx("div",{className:"flex justify-between p-6",children:e.jsx("div",{className:"text-xl font-medium",children:"자소서 작성하기"})}),e.jsxs("div",{className:"bg-white p-6 rounded-lg border mx-6 mb-12 shadow ",children:[e.jsx("div",{className:"mb-8 font-semibold",children:e.jsx("p",{className:"",children:`${l.position} 부문`})}),e.jsx("div",{className:"flex items-center pb-8 border-b border-gray-400 mb-4 text-sm",children:e.jsxs("div",{className:"",children:[e.jsxs("div",{className:"flex items-center mb-2",children:[e.jsx("p",{className:"w-[70px]",children:"지원자명 :"}),e.jsx(d,{name:"name",value:p,onChange:o})]}),e.jsxs("div",{className:"flex items-center mb-2",children:[e.jsx("p",{className:"w-[70px]",children:"이메일 :"}),e.jsx(d,{name:"email",value:h,onChange:o})]}),e.jsxs("div",{className:"flex items-center mb-2",children:[e.jsx("p",{className:"w-[70px]",children:"휴대전화 :"}),e.jsx(d,{name:"phone",value:f,onChange:o})]})]})}),e.jsx("div",{className:"flex flex-col py-4 mb-4",children:l.questions&&l.questions.map((s,a)=>{var t;return e.jsxs("div",{className:"pb-8 mb-8 border-b border-gray-200",children:[e.jsxs("div",{className:"mb-6 font-semibold",children:[e.jsxs("span",{children:[a+1,". "]}),e.jsx("span",{children:s.question_text}),e.jsx("span",{className:"ml-1",children:`(${s.max_length}자)`})]}),e.jsx("div",{children:e.jsxs("div",{className:"mb-2 flex flex-col",children:[e.jsx("textarea",{value:c[s.id]||"",onChange:m=>w(s.id,m.target.value),placeholder:"답변을 입력하세요",className:"w-full h-[150px] p-2 border rounded-md"}),e.jsxs("div",{className:"text-right text-sm text-gray-500 mt-1",children:[((t=c[s.id])==null?void 0:t.length)||0,"/",s.max_length]})]})})]},s.id)})}),e.jsxs("div",{className:"flex justify-center pt-5 pb-10",children:[e.jsx(u,{text:"목록으로",onClick:()=>x(-1),addClass:"mr-2"}),e.jsx(u,{text:"제출하기",variant:"teams",onClick:()=>{window.confirm("제출 후 수정 및 열람이 불가합니다. 정말 제출하시겠습니까?")&&y()}})]})]})]})})}),e.jsxs("footer",{className:"flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t",children:[e.jsx("p",{className:"text-xs text-muted-foreground",children:"© 2024 Luminary Recruitment. All rights reserved."}),e.jsxs("nav",{className:"sm:ml-auto flex gap-4 sm:gap-6",children:[e.jsx(i,{to:"/",className:"text-xs hover:underline underline-offset-4",children:"Terms of Service"}),e.jsx(i,{to:"/",className:"text-xs hover:underline underline-offset-4",children:"Privacy Policy"})]})]})]}):e.jsx(C,{})}export{L as default};
