import{u as m,r as p,j as t,a as l,c as d,S as u}from"./index-505f3368.js";import{h as f}from"./html2canvas.esm-18c4afc9.js";const g=({eachTime:h,detailsForm:b})=>{const{cloaseSuccessModal:x,rideHistoryFromDb:n}=m();let e=n[0];const s=p.useRef(null),r=()=>{f(s.current).then(c=>{c.toBlob(o=>{const i=URL.createObjectURL(o),a=document.createElement("a");a.download="screenshot.png",a.href=i,a.click()})})};return t("div",{className:"w-full h-[100vh] py-16 px-4 md:px-8 bg-blue-50 flex justify-center",children:[l("div",{ref:s,className:"w-full h-fit text-[.9rem] text-slate-600 md:text-[1.2rem] rounded-2xl flex justify-center py-[40px]",children:t("div",{className:"w-full sm:max-w-[550px] sm:h-fit scale flex flex-col gap-2 items-center bg-blue-50 sm:p-8 sm:shadow-md rounded-lg relative",children:[t("div",{className:"px-3 pb-3 pt-12 rounded-md bg-blue-300/10",children:[l("div",{className:"w-fit h-fit rounded-full bg-white mx-auto absolute top-[-30px] md:top-[-15px] left-[50%] translate-x-[-50%]",children:l("img",{alt:"",src:"/images/icons8-checkmark-64.png",className:"w-16 sm:w-20 h-16 sm:h-20"})}),(e==null?void 0:e.terminal)==="School park"&&t("p",{className:"text-center",children:["Successful booking!",l("br",{})," Please proceed promptly to the"," ",l("span",{className:"font-bold",children:e==null?void 0:e.terminal})," , as your bus will depart school park at"," ",l("span",{className:"font-bold",children:e==null?void 0:e.time})]}),(e==null?void 0:e.terminal)!=="School park"&&t("p",{className:"text-center",children:[l("span",{className:"text-[1.2rem] font-bold",children:"Successful booking!"}),l("br",{})," Please proceed promptly to your pickup terminal -"," ",l("span",{className:"font-bold",children:e==null?void 0:e.terminal})," , as your bus will depart terminus at"," ",l("span",{className:"font-bold",children:e==null?void 0:e.time})]})]}),t("div",{className:"w-full p-3 rounded-md bg-blue-300/10 mt-3 text-[.8rem]",children:[t("div",{className:"w-full p-2 border-b border-slate-400/30 flex justify-between items-center",children:[l("p",{children:"Date:"}),l("p",{className:"font-medium",children:e==null?void 0:e.createdAt})]}),t("div",{className:"w-full p-2 border-b border-slate-400/30 flex justify-between items-center",children:[l("p",{children:"Departure time:"}),l("p",{className:"font-medium",children:e==null?void 0:e.time})]}),t("div",{className:"w-full p-2 border-b border-slate-400/30 flex justify-between items-center",children:[l("p",{children:"Seats:"}),l("p",{className:"font-medium",children:e==null?void 0:e.seats})]}),t("div",{className:"w-full p-2 border-b border-slate-400/30 flex justify-between items-center",children:[l("p",{children:"Pickup terminal:"}),l("p",{className:"font-medium",children:e==null?void 0:e.terminal})]}),t("div",{className:"w-full p-2 border-b border-slate-400/30 flex justify-between items-center",children:[l("p",{children:"Booking code:"}),l("p",{className:"font-medium",children:e==null?void 0:e.bookingCode})]}),t("div",{className:"w-full p-2 border-b border-slate-400/30 flex justify-between items-center",children:[l("p",{children:"Price:"}),t("p",{className:`${(e==null?void 0:e.price)==="free"?"uppercase text-green-500":""} font-medium`,children:[(e==null?void 0:e.price)!=="free"&&"NGN"," ",e==null?void 0:e.price]})]}),t("div",{className:"w-full p-2 border-b border-slate-400/30 flex justify-between items-center",children:[l("p",{children:"Ride coordinator contact:"}),t("div",{className:"font-medium flex gap-1 items-center",children:[l("img",{alt:"",src:"/images/icon-phone-png",className:"w-5 h-5"}),l("a",{href:"tel:+2348166864740",children:l("p",{children:"08166864740"})})]})]}),t("div",{className:"w-full p-2 border-b border-slate-400/30 flex justify-between items-center",children:[l("p",{children:"Vehicle description:"}),l("p",{className:"font-medium",children:"A white 14-Seater Bus"})]}),t("div",{className:"w-full p-2 flex flex-col justify-between items-start",children:[l("p",{className:"font-medium",children:"Terminal description:"}),l("p",{children:(e==null?void 0:e.terminal)==="Terminus"?"Terminus: infront of the triple t mall just beside the university terminus":(e==null?void 0:e.terminal)==="Mark"?"Mark:just before mark junction in front of the Al ummah mosque and directly opposite bravo fuel station":(e==null?void 0:e.terminal)==="Ilesanmi"?"Ilesanmi: in front of anchor kiddies palace just before the Tanke iledu community junction while coming from tipper garage":(e==null?void 0:e.terminal)==="Sanrab"?"Sanrab: before the sanrab / Tanke bubu junction directly opposite Monique unisex hair palace":(e==null?void 0:e.terminal)==="Chapel"?"Chapel junction, directly in front of Made art concept, Chapel, Tanke.":(e==null?void 0:e.terminal)==="Okeodo"?"Okeodo: Directly opposite Item 7 restaurant, in front of Puff Puff town, Oke odo, Tanke.":(e==null?void 0:e.terminal)==="Stella maris"?"Stella maris Junction, Stella maris, Tanke":(e==null?void 0:e.terminal)==="School park"?"University of Ilorin school park":null})]})]}),t("div",{className:"w-full flex gap-3 mt-4",children:[l(d,{to:"/book-ride",className:"w-1/2",children:l("button",{type:"submit",className:"w-full px-10 py-2 bg-blue-400 hover:bg-blue-400/70 border border-blue-400 text-white rounded-md",children:"Close"})}),t("button",{onClick:r,className:"w-1/2 px-10 py-2 bg-blue-400 hover:bg-blue-400/70 border border-blue-400 text-white rounded-md flex gap-2 items-center justify-center",children:[l("p",{className:"whitespace-nowrap",children:"Save PDF"}),l("img",{alt:"",src:"/images/icons8-form-24.png",className:"w-4 h-4"})]})]})]})}),l(u,{})]})};export{g as default};
