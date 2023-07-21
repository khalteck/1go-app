import{u as C,j as t,F as A,a as e,r as L,h,L as M,H as I,c as O,C as y,d as k,b as P,S as E}from"./index-505f3368.js";const u=({item:l})=>{const{navigate:s,formattedDate:n}=C();function x(){s(`/ride-history/${l.id}`)}return t(A,{children:[t("div",{onClick:x,className:"w-full p-3 mb-4 bg-blue-400/10 text-[0.85rem] md:text-[0.7rem] lg:text-[.9rem] rounded-md hidden md:flex flex-wrap md:flex-nowrap transition-all duration-300",children:[e("div",{className:"flex items-center px-2 py-1 md:p-2 border-2 border-blue-400/50 rounded-md md:mr-4",children:t("p",{children:["Date:"," ",e("strong",{children:(l==null?void 0:l.createdAt)===n?"Today":l==null?void 0:l.createdAt})]})}),e("div",{className:"flex items-center px-2 py-1 md:p-2 border-2 border-blue-400/50 rounded-md md:mr-4",children:t("p",{children:["Time: ",e("strong",{children:l==null?void 0:l.time})]})}),e("div",{className:"flex items-center px-2 py-1 md:p-2 border-2 border-blue-400/50 rounded-md md:mr-4",children:t("p",{children:["Booking Code: ",e("strong",{children:l==null?void 0:l.bookingCode})]})}),e("div",{className:"flex items-center px-2 py-1 md:p-2 border-2 border-blue-400/50 rounded-md md:mr-4",children:t("p",{children:["Terminal: ",e("strong",{children:l==null?void 0:l.terminal})]})}),e("div",{className:"flex items-center px-2 py-1 md:p-2 border-2 border-blue-400/50 rounded-md mr-auto",children:t("p",{children:["Seats: ",e("strong",{children:l==null?void 0:l.seats})]})}),e("div",{className:"flex items-center px-2 py-1 md:p-2 border-2 border-blue-400/50 rounded-md",children:t("p",{children:["Price:"," ",(l==null?void 0:l.price)!=="free"?t("strong",{children:["NGN ",l==null?void 0:l.price]}):e("strong",{className:"uppercase font-bold text-green-500",children:l==null?void 0:l.price})]})})]}),t("div",{onClick:x,className:"w-full px-3 py-2 mb-4 bg-blue-400/10 border-2 border-blue-400/20 text-[0.75rem] md:text-[1rem] rounded-md flex md:hidden flex-wrap md:flex-nowrap items-center transition-all duration-300 scale",children:[t("div",{className:"text-start pr-2 md:p-2 md:mr-4",children:[e("div",{children:"Date:"}),e("div",{className:"font-medium",children:(l==null?void 0:l.createdAt)===n?"Today":l==null?void 0:l.createdAt})]}),t("div",{className:" px-2 md:p-2 border-x-2 border-blue-400/50 md:mr-4",children:[e("div",{children:"Time:"}),e("div",{className:"font-medium",children:l==null?void 0:l.time})]}),t("div",{className:"px-2 md:p-2 border-r-2 border-blue-400/50",children:[e("div",{children:"Code:"}),e("div",{className:"font-medium",children:l==null?void 0:l.bookingCode})]}),t("div",{className:"pl-2",children:[e("div",{children:"Price:"}),(l==null?void 0:l.price)!=="free"?t("div",{children:["NGN ",l==null?void 0:l.price]}):e("div",{className:"uppercase font-bold text-green-500",children:l==null?void 0:l.price})]})]})]})},q=()=>{var w,v;const{currentUserFromDb:l,morningBookingTimesFromDb:s,noonBookingTimesFromDb:n,bookingSuccess:x,rideHistoryFromDb:a,formattedDate:o,toggleActive:W,active:p,loader:j,freeRideMod:S,bookFreeRide:T,ridesToday:Y,cancelBookFreeRide:G,freeRideBanner:R,cancelFreeRideMod:z}=C();let c=a==null?void 0:a.slice(0,5);const[i,B]=L.useState(!1);function g(){B(r=>!r)}let N=s.slice().sort((r,d)=>{const f=h(r.time,["h:mm A"]).format("HH:mm"),b=h(d.time,["h:mm A"]).format("HH:mm");return Number(f.replace(/:/g,""))-Number(b.replace(/:/g,""))}),m=n.slice().sort((r,d)=>{const f=h(r.time,["h:mm A"]).format("HH:mm"),b=h(d.time,["h:mm A"]).format("HH:mm");return Number(f.replace(/:/g,""))-Number(b.replace(/:/g,""))});return t(A,{children:[j&&e(M,{}),e(I,{}),S&&e("div",{className:"w-full h-screen text-center p-4 flex justify-center items-center bg-black/90 fixed top-0 left-0 z-[999] scale",children:t("div",{className:"w-full sm:w-[500px] h-fit bg-white px-5 pt-10 pb-5 border border-blue-400 rounded-lg relative",children:[e("img",{alt:"",src:"/images/icons8-discount-50.png",className:"w-20 h-20 absolute top-[-40px] left-[50%] translate-x-[-50%]"}),e("h1",{className:"text-[1.4rem] font-bold mb-3",children:"Get free rides!"}),e("div",{children:"Limited time offer: Free rides today for first 50 users! Book now!"}),t("div",{className:"flex justify-center gap-3 mt-4",children:[e("button",{onClick:z,className:"h-fit text-sm text-blue-500 text-[.75rem] bg-blue-500/20 px-8 py-1 md:py-2 uppercase hover:bg-blue-400 hover:text-white border-blue-500 border-2 rounded-md transition-all duration-300",children:"Cancel"}),e("button",{onClick:T,className:"h-fit text-sm text-white text-[.75rem] bg-blue-500 px-6 py-1 md:py-2 uppercase hover:bg-blue-400 border-blue-500 border-2 rounded-md transition-all duration-300",children:"Book now"})]})]})}),t("section",{className:"w-full min-h-screen pb-32 bg-slate-100 text-slate-700",children:[e("section",{className:"w-full bg-reg1 bg-cover bg-right lg:bg-center bg-no-repeat",children:t("section",{className:"w-full bg-gradient-to-b from-zinc-900/70 to-zinc-700/40 py-[150px] px-[5%] sm:px-[10.5%]",children:[e(O,{to:"/contact",children:t("div",{className:"absolute top-0 md:top-1 left-4 md:left-[10.5%] text-[0.9rem] text-slate-200 flex gap-2 items-center",children:[e("img",{alt:"",src:"/images/icons8-information-64.png",className:"w-4 h-4"}),e("p",{className:"underline",children:"Contact us"})]})}),t("section",{className:"w-full border-b border-zinc-300 pb-4 text-white flex",children:[t("div",{className:"w-2/3 mr-auto",children:[t("h2",{className:"text-[1.5rem] font-bold flex gap-2 items-center",children:[e("p",{children:" Hello"})," ",l?((w=l==null?void 0:l.firstname)==null?void 0:w.charAt(0).toUpperCase())+((v=l==null?void 0:l.firstname)==null?void 0:v.slice(1)):e("div",{className:"w-[25px] h-[25px] bg-gradient-to-b from-blue-500 to-white rounded-full relative rotate",children:e("div",{className:"w-1/2 h-1/2 bg-slate-600/90 rounded-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"})})]}),e("p",{className:"text-[0.9rem] md:text-[1.1rem] font-medium",children:"Welcome to your dashboard. You can book rides & view ride history here!"})]}),e("div",{className:"h-[fit-content] px-4 md:px-8 p-2 rounded-lg bg-white/40",children:e("img",{alt:"",src:"/images/icons8-user-64.png",className:"md:w-16 w-10 md:h-16 h-10"})})]}),p&&t("section",{className:"w-full mt-10 text-center sm:text-start",children:[t("div",{className:"text-[.9rem] md:text-[1.5rem] font-medium w-[fit-content] bg-white py-2 px-5 rounded-t-lg border-none relative bottom-[-2px] flex items-center gap-2",children:[e("h2",{children:"Successful bookings"}),(a==null?void 0:a.length)>0&&e("div",{className:"w-4 h-4 p-[7px] text-[.75rem] flex justify-center items-center border-2 border-blue-400/60 bg-blue-400/80 text-white rounded-full",children:a==null?void 0:a.length})]}),t("div",{className:"w-full min-h-[200px] bg-white rounded-b-lg rounded-tr-lg px-4 py-6 flex flex-col items-center transition-all duration-300 relative",children:[(a==null?void 0:a.length)>0&&!i?c==null?void 0:c.map((r,d)=>e(u,{item:r,rideHistoryFromDb:a},d)):(a==null?void 0:a.length)>0&&i?a==null?void 0:a.map((r,d)=>e(u,{item:r,rideHistoryFromDb:a},d)):t("div",{className:"w-full py-12 bg-sky-50 flex flex-col items-center",children:[e("img",{alt:"",src:"/images/empty.png",className:"w-20 h-20 mb-8"}),e("p",{className:"text-slate-400",children:"No bookings yet..."})]}),(a==null?void 0:a.length)>5&&e("button",{onClick:g,className:" px-10 py-2 bg-blue-400 hover:bg-blue-400/70 border border-blue-400 text-white rounded-md my-3",children:i?"Show less":"Show more"}),t("div",{className:" mt-1 flex gap-1 items-center absolute bottom-[8px] left-[10px]",children:[e("div",{className:"bg-blue-400 rounded-full flex justify-center items-center",children:e("img",{alt:"",src:"/images/icons8-information-64.png",className:"w-4 h-4"})}),e("p",{className:"text-[0.75rem] bg-blue-400/30 px-2 py-[1px] rounded-full",children:"Click a booking for more details"})]})]}),e("div",{className:"w-full md:w-fit p-1 md:px-4 bg-transparent rounded-md mt-3 text-[0.85rem] text-white text-start font-mediun",children:"Scroll down to book another ride."})]}),!p&&t("section",{className:"w-full border-b border-zinc-300 pb-16 pt-12",children:[e("h1",{className:"text-[1.5rem] md:text-[2rem] font-medium text-center text-white",children:"Departure times"}),e("div",{className:"w-[fit-content] text-[.9rem] sm:text-[1.1rem] font-medium text-white text-center mb-3 flex items-center gap-3 mx-auto",children:e("p",{children:" Click on an available time to book now"})}),t("div",{className:"w-full block md:flex",children:[e("div",{className:"w-full md:w-1/2 md:p-4 p-0",children:t("div",{className:"w-full min-h-[200px] bg-white rounded-lg p-4",children:[t("div",{className:" mt-1 flex gap-1 items-center mb-3",children:[e("div",{className:"bg-blue-400 rounded-full flex justify-center items-center",children:e("img",{alt:"",src:"/images/icons8-information-64.png",className:"w-4 h-4"})}),e("p",{className:"text-[0.75rem] bg-blue-400/30 px-2 py-[1px] rounded-full",children:"Click on an available time to book a ride"})]}),t("p",{className:"font-medium text-[.8rem] md:text-[.9rem]",children:["Today: ",o]}),e("h2",{className:"pb-1 border-b border-b-slate-400/80 text-[0.85rem] md:text-[1rem]",children:"From Outside school - Going to school park"}),e("div",{className:"my-4 w-full flex gap-3 md:gap-4 flex-wrap",children:(s==null?void 0:s.length)>0?N.map((r,d)=>e(y,{item:r},d)):e("div",{className:"w-[35px] h-[35px] bg-gradient-to-b from-blue-500 to-white rounded-full relative rotate mx-auto",children:e("div",{className:"w-1/2 h-1/2 bg-white rounded-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"})})})]})}),e("div",{className:"w-full md:w-1/2 md:p-4 p-0 mt-5 md:mt-0",children:t("div",{className:"w-full min-h-[200px] bg-white rounded-lg p-4",children:[t("div",{className:" mt-1 flex gap-1 items-center mb-3",children:[e("div",{className:"bg-blue-400 rounded-full flex justify-center items-center",children:e("img",{alt:"",src:"/images/icons8-information-64.png",className:"w-4 h-4"})}),e("p",{className:"text-[0.75rem] bg-blue-400/30 px-2 py-[1px] rounded-full",children:"Click on an available time to book a ride"})]}),t("p",{className:"font-medium text-[.8rem] md:text-[.9rem]",children:["Today: ",o]}),e("h2",{className:"pb-1 border-b border-b-slate-400/80 text-[0.85rem] md:text-[1rem]",children:"From Inside school - Going off-campus"}),e("div",{className:"my-4 w-full flex gap-3 md:gap-4 flex-wrap",children:(n==null?void 0:n.length)>0?m==null?void 0:m.map((r,d)=>e(k,{item:r},d)):e("div",{className:"w-[35px] h-[35px] bg-gradient-to-b from-blue-500 to-white rounded-full relative rotate mx-auto",children:e("div",{className:"w-1/2 h-1/2 bg-white rounded-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"})})})]})})]})]})]})}),!p&&t("section",{className:"w-full mt-10 px-[5%] sm:px-[10.5%]",children:[t("div",{className:"text-[1rem] md:text-[1.5rem] font-medium w-[fit-content] bg-white py-2 px-5 rounded-t-lg border-none relative bottom-[-2px] flex items-center gap-2",children:[e("h2",{children:"Successful bookings"}),(a==null?void 0:a.length)>0&&e("div",{className:"w-4 h-4 p-[10px] text-[.85rem] flex justify-center items-center border-2 border-slate-400/50 rounded-full",children:a==null?void 0:a.length})]}),t("div",{className:"w-full min-h-[200px] bg-white rounded-b-lg p-4 flex flex-col items-center transition-all duration-300",children:[(a==null?void 0:a.length)>0&&!i?c==null?void 0:c.map((r,d)=>e(u,{item:r,rideHistoryFromDb:a},d)):(a==null?void 0:a.length)>0&&i?a==null?void 0:a.map((r,d)=>e(u,{item:r,rideHistoryFromDb:a},d)):t("div",{className:"w-full py-12 bg-sky-50 flex flex-col items-center",children:[e("img",{alt:"",src:"/images/empty.png",className:"w-20 h-20 mb-8"}),e("p",{className:"text-slate-400",children:"No bookings yet..."})]}),(a==null?void 0:a.length)>5&&e("button",{onClick:g,className:" px-10 py-2 bg-blue-400 hover:bg-blue-400/70 border border-blue-400 text-white rounded-md my-3",children:i?"Show less":"Show more"})]})]}),p&&t("section",{className:"w-full mt-10 px-[5%] sm:px-[10.5%]",children:[e("h1",{className:"text-[1.5rem] md:text-[2rem] font-medium text-center text-slate-700",children:"Departure times"}),e("div",{className:"w-[fit-content] text-[.9rem] sm:text-[1.1rem] font-medium text-slate-700 text-center mb-3 flex items-center gap-3 mx-auto",children:e("p",{children:" Click on an available time to book now"})}),t("div",{className:"w-full block md:flex",children:[e("div",{className:"w-full md:w-1/2 md:p-4 p-0",children:t("div",{className:"w-full min-h-[200px] bg-white rounded-lg p-4",children:[t("div",{className:" mt-1 flex gap-1 items-center mb-3",children:[e("div",{className:"bg-blue-400 rounded-full flex justify-center items-center",children:e("img",{alt:"",src:"/images/icons8-information-64.png",className:"w-4 h-4"})}),e("p",{className:"text-[0.75rem] bg-blue-400/30 px-2 py-[1px] rounded-full",children:"Click on an available time to book a ride"})]}),t("p",{className:"font-medium text-[.8rem] md:text-[.9rem]",children:["Today: ",o]}),e("h2",{className:"pb-1 border-b border-b-slate-400/80 text-[0.85rem] md:text-[1rem]",children:"From Outside school - Going to school park"}),e("div",{className:"my-4 w-full flex gap-3 md:gap-4 flex-wrap",children:(s==null?void 0:s.length)>0?N.map((r,d)=>e(y,{item:r},d)):e("div",{className:"w-[35px] h-[35px] bg-gradient-to-b from-blue-500 to-white rounded-full relative rotate mx-auto",children:e("div",{className:"w-1/2 h-1/2 bg-white rounded-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"})})})]})}),e("div",{className:"w-full md:w-1/2 md:p-4 p-0 mt-5 md:mt-0",children:t("div",{className:"w-full min-h-[200px] bg-white rounded-lg p-4",children:[t("div",{className:" mt-1 flex gap-1 items-center mb-3",children:[e("div",{className:"bg-blue-400 rounded-full flex justify-center items-center",children:e("img",{alt:"",src:"/images/icons8-information-64.png",className:"w-4 h-4"})}),e("p",{className:"text-[0.75rem] bg-blue-400/30 px-2 py-[1px] rounded-full",children:"Click on an available time to book a ride"})]}),t("p",{className:"font-medium text-[.8rem] md:text-[.9rem]",children:["Today: ",o]}),e("h2",{className:"pb-1 border-b border-b-slate-400/80 text-[0.85rem] md:text-[1rem]",children:"From Inside school - Going off-campus"}),e("div",{className:"my-4 w-full flex gap-3 md:gap-4 flex-wrap",children:(n==null?void 0:n.length)>0?m==null?void 0:m.map((r,d)=>e(k,{item:r},d)):e("div",{className:"w-[35px] h-[35px] bg-gradient-to-b from-blue-500 to-white rounded-full relative rotate mx-auto",children:e("div",{className:"w-1/2 h-1/2 bg-white rounded-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"})})})]})})]})]})]}),e(P,{}),e(E,{}),R&&t("div",{className:"w-full bg-white px-2 md:px-5 py-[6px] md:py-3 fixed bottom-0 left-0 flex items-center z-10",children:[t("div",{className:"flex items-center gap-2 md:gap-4 mr-auto",children:[e("img",{alt:"",src:"/images/icons8-discount-50.png",className:"w-8 h-8 md:w-12 md:h-12"}),e("p",{className:"text-[.75rem] md:text-[1rem]",children:"Limited time offer: Free rides today for first 50 users! Book now!"})]}),e("div",{onClick:G,className:"w-8 h-7 bg-white flex items-center justify-center rounded-full border border-blue-500 cursor-pointer",children:e("img",{alt:"",src:"/images/icons8-close-30.png",className:"w-3 h-3"})})]})]})};export{q as default};