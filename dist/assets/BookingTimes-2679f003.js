import{j as r,a as e,u as T,r as p,h as s,L as B,S as E}from"./index-505f3368.js";import{S}from"./Sidebar-e735ffdf.js";const F=({item:l,handleDeleteMorningTime:t})=>r("div",{className:"px-3 py-1 bg-blue-300 rounded-md relative flex items-center mb-5",children:[e("div",{onClick:()=>t(l.id),className:"absolute top-[-10px] right-[-10px] w-6 h-6 rounded-full flex items-center justify-center bg-white border hover:border-blue-600 border-blue-400 hover:bg-blue-300 cursor-pointer",children:e("img",{alt:"",src:"/images/icons8-remove-32.png",className:"w-3 h-3"})}),e("div",{className:"text-[0.85rem] transition-all duration-300",children:l==null?void 0:l.time}),r("div",{className:"text-[0.75rem] border border-blue-400 rounded-md px-3 absolute bottom-[-23px] left-[50%] translate-x-[-50%] font-medium flex gap-1",children:[e("p",{children:l.slots}),r("p",{className:"text-blue-400 border-l border-blue-400 pl-1",children:["#",l.price]})]})]}),H=({item:l,handleDeleteNoonTime:t})=>r("div",{className:"px-3 py-1 bg-blue-300 rounded-md relative flex items-center mb-5",children:[e("div",{onClick:()=>t(l.id),className:"absolute top-[-10px] right-[-10px] w-6 h-6 rounded-full flex items-center justify-center bg-white border hover:border-blue-600 border-blue-400 hover:bg-blue-300 cursor-pointer",children:e("img",{alt:"",src:"/images/icons8-remove-32.png",className:"w-3 h-3"})}),e("div",{className:"text-[0.85rem] transition-all duration-300",children:l==null?void 0:l.time}),r("div",{className:"text-[0.75rem] border border-blue-400 rounded-md px-3 absolute bottom-[-23px] left-[50%] translate-x-[-50%] font-medium flex gap-1",children:[e("p",{children:l.slots}),r("p",{className:"text-blue-400 border-l border-blue-400 pl-1",children:["#",l.price]})]})]}),j=()=>{const{handleMorningChange:l,morningForm:t,handlenoonChange:d,noonForm:q,loader:f,handleMorningBookingTimeSubmit:N,morningBookingTimesFromDb:b,handleNoonBookingTimeSubmit:w,noonBookingTimesFromDb:h,handleDeleteMorningTime:v,handleDeleteNoonTime:A,handlePriceChange:D,fieldsRequired:i}=T(),[y,k]=p.useState(!1);function g(){k(n=>!n)}const[C,M]=p.useState(!1);function x(){M(n=>!n)}p.useState(!1);let a=b.slice().sort((n,o)=>{const c=s(n.time,["h:mm A"]).format("HH:mm"),u=s(o.time,["h:mm A"]).format("HH:mm");return Number(c.replace(/:/g,""))-Number(u.replace(/:/g,""))}),m=h.slice().sort((n,o)=>{const c=s(n.time,["h:mm A"]).format("HH:mm"),u=s(o.time,["h:mm A"]).format("HH:mm");return Number(c.replace(/:/g,""))-Number(u.replace(/:/g,""))});return r("div",{className:"w-full",children:[f&&e(B,{}),e(S,{}),r("div",{className:"w-full md:w-[80%] min-h-screen pb-24 float-right bg-sky-50 pt-[80px] md:pt-[60px] px-3 md:px-12 transition-all duration-500 text-slate-700",children:[e("h1",{className:"w-full font-bold text-[1.75rem]",children:"Departure times"}),r("div",{className:"w-full min-h-[200px] bg-white p-4 mt-8 rounded-lg shadow-xl shadow-slate-300/30 border border-sky-500 relative",children:[r("h2",{className:"pb-1 border-b border-b-slate-400/80",children:["Manage departure times"," ",e("strong",{children:"( From Outside school - Going to school park)"})]}),r("div",{className:"my-4 w-full flex gap-4 flex-wrap",children:[b&&(a==null?void 0:a.map((n,o)=>e(F,{item:n,handleDeleteMorningTime:v},o))),r("button",{onClick:g,className:"px-8 py-1 bg-white flex gap-3 items-center border-2 border-blue-400  hover:bg-blue-500 hover:text-white rounded-md text-[0.85rem] transition-all duration-300",children:[e("img",{alt:"",src:"/images/icons8-plus-30.png",className:"w-6 h-6"}),e("p",{children:"Add"})]})]}),y&&r("div",{className:"w-full h-full sm:h-[77%] bg-blue-50 absolute bottom-0 left-0 rounded-lg slide-up",children:[e("img",{alt:"",src:"/images/icons8-close-30.png",className:"w-6 h-6 mb-8 absolute top-3 right-3 cursor-pointer",onClick:g}),r("div",{className:"w-full p-2 flex flex-col items-center",children:[e("h2",{className:"pb-4 text-center font-medium",children:"Add booking time"}),r("form",{className:"flex gap-2 sm:gap-4 flex-wrap",children:[e("input",{type:"number",id:"morningHour",onChange:l,placeholder:"7",className:"bg-blue-50 w-10 sm:w-16 px-[6px] sm:p-3 border-2 border-blue-400 rounded-md outline-none",required:!0}),e("p",{className:"font-bold text-[2rem]",children:":"}),e("input",{type:"number",id:"morningMinute",onChange:l,placeholder:"15",className:"bg-blue-50 w-10 sm:w-16 px-[6px] sm:p-3 border-2 border-blue-400 rounded-md outline-none",required:!0}),e("div",{className:"relative",children:r("div",{className:"text-center",children:[r("select",{id:"morningAmpm",onChange:l,defaultValue:"DEFAULT",className:"bg-blue-50 w-12 sm:w-[70px] py-1 px-[6px] sm:px-3 border-2 border-blue-400 rounded-md outline-none",children:[e("option",{value:"DEFAULT",disabled:!0,hidden:!0,children:"- -"}),e("option",{value:"AM",children:"AM"}),e("option",{value:"PM",children:"PM"})]}),e("p",{children:"AM/PM"})]})}),r("div",{className:"text-center",children:[e("input",{type:"number",id:"slots",onChange:l,placeholder:"14",className:"bg-blue-50 w-12 sm:w-16 px-[6px] sm:px-3 border-2 border-blue-400 rounded-md outline-none",required:!0}),e("p",{children:"Slots"})]}),r("div",{className:"text-center",children:[e("input",{type:"number",id:"price",onChange:l,placeholder:"200",className:"bg-blue-50 w-14 sm:w-16 px-[6px] sm:px-3 border-2 border-blue-400 rounded-md outline-none",required:!0}),e("p",{children:"Price"})]}),e("button",{onClick:N,className:"h-[fit-content] py-3 px-5 sm:px-8 bg-blue-400 rounded-md text-white hover:bg-blue-500",children:"Add"}),i&&e("div",{className:"w-full p-1 text-[.75rem] rounded-md border border-red-400 bg-red-400/30",children:i})]})]})]})]}),r("div",{className:"w-full min-h-[200px] bg-white p-4 mt-8 rounded-lg shadow-xl shadow-slate-300/30 border border-sky-500 relative",children:[r("h2",{className:"pb-1 border-b border-b-slate-400/80",children:["Manage departure times"," ",e("strong",{children:"( From Inside school - Going off-campus )"})]}),r("div",{className:"my-4 w-full flex gap-4 flex-wrap",children:[h&&(m==null?void 0:m.map((n,o)=>e(H,{item:n,handleDeleteNoonTime:A},o))),r("button",{onClick:x,className:"px-8 py-1 bg-white flex gap-3 items-center border-2 border-blue-400  hover:bg-blue-500 hover:text-white rounded-md text-[0.85rem] transition-all duration-300",children:[e("img",{alt:"",src:"/images/icons8-plus-30.png",className:"w-6 h-6"}),e("p",{children:"Add"})]})]}),C&&r("div",{className:"w-full h-full sm:h-[77%] bg-blue-50 absolute bottom-0 left-0 rounded-lg slide-up",children:[e("img",{alt:"",src:"/images/icons8-close-30.png",className:"w-6 h-6 mb-8 absolute top-3 right-3 cursor-pointer",onClick:x}),r("div",{className:"w-full p-2 flex flex-col items-center",children:[e("h2",{className:"pb-4 text-center font-medium",children:"Add booking time"}),r("form",{className:"flex gap-2 sm:gap-4 flex-wrap",children:[e("input",{type:"number",id:"noonHour",onChange:d,placeholder:"7",className:"bg-blue-50 w-10 sm:w-16 px-[6px] sm:p-3 border-2 border-blue-400 rounded-md outline-none",required:!0}),e("p",{className:"font-bold text-[2rem]",children:":"}),e("input",{type:"number",id:"noonMinute",onChange:d,placeholder:"15",className:"bg-blue-50 w-10 sm:w-16 px-[6px] sm:p-3 border-2 border-blue-400 rounded-md outline-none",required:!0}),r("div",{className:"text-center",children:[r("select",{id:"noonAmpm",onChange:d,defaultValue:"DEFAULT",className:"bg-blue-50 w-12 sm:w-[70px] py-1 px-[6px] sm:px-3 border-2 border-blue-400 rounded-md outline-none",children:[e("option",{value:"DEFAULT",disabled:!0,hidden:!0,children:"- -"}),e("option",{value:"AM",children:"AM"}),e("option",{value:"PM",children:"PM"})]}),e("p",{children:"AM/PM"})]}),r("div",{className:"text-center",children:[e("input",{type:"number",id:"slots",onChange:d,placeholder:"14",className:"bg-blue-50 w-12 sm:w-16 px-[6px] sm:px-3 border-2 border-blue-400 rounded-md outline-none",required:!0}),e("p",{children:"Slots"})]}),r("div",{className:"text-center",children:[e("input",{type:"number",id:"price",onChange:d,placeholder:"200",className:"bg-blue-50 w-14 sm:w-16 px-[6px] sm:px-3 border-2 border-blue-400 rounded-md outline-none",required:!0}),e("p",{children:"Price"})]}),e("button",{onClick:w,className:"h-[fit-content] py-3 px-5 sm:px-8 bg-blue-400 rounded-md text-white hover:bg-blue-500",children:"Add"}),i&&e("div",{className:"w-full p-1 text-[.75rem] rounded-md border border-red-400 bg-red-400/30",children:i})]})]})]})]})]}),e(E,{})]})};export{j as default};
