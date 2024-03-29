import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
// import "swiper/css/pagination";
import "../input.css";
import { Autoplay, Pagination } from "swiper";
import Testimonial from "./TestimonialData";

function Testimonials() {
  return (
    <div>
      <div className="hidden lg:block h-full ">
        <Swiper
          slidesPerView={2}
          spaceBetween={30}
          autoplay={{
            delay: 7500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="flex justify-between p-4 space-x-6">
              {/* <img
                src="./images/icon8-user.png"
                className="w-[30px] h-[30px]"
              /> */}
              <div className="flex flex-col items-start text-left">
                <p className="font-light">{Testimonial[0].content}</p>
                <p className="font-semibold pt-3 capitalize text-slate-700">
                  {Testimonial[0].name}
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex justify-between p-4 space-x-6">
              {/* <img
                src="./images/icon8-user.png"
                className="w-[30px] h-[30px]"
              /> */}
              <div className="flex flex-col items-start text-left">
                <p className="font-light">{Testimonial[1].content}</p>
                <p className="font-semibold pt-3 capitalize text-slate-700">
                  {Testimonial[1].name}
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex justify-between p-4 space-x-6">
              {/* <img
                src="./images/icon8-user.png"
                className="w-[30px] h-[30px]"
              /> */}
              <div className="flex flex-col items-start text-left">
                <p className="font-light">{Testimonial[2].content}</p>
                <p className="font-semibold pt-3 capitalize text-slate-700">
                  {Testimonial[2].name}
                </p>
                <img src="" />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex justify-between p-4 space-x-6">
              {/* <img
                src="./images/icon8-user.png"
                className="w-[30px] h-[30px]"
              /> */}
              <div className="flex flex-col items-start text-left">
                <p className="font-light">{Testimonial[3].content}</p>
                <p className="font-semibold pt-3 capitalize text-slate-700">
                  {Testimonial[3].name}
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex justify-between p-4 space-x-6">
              {/* <img
                src="./images/icon8-user.png"
                className="w-[30px] h-[30px]"
              /> */}
              <div className="flex flex-col items-start text-left">
                <p className="font-light">{Testimonial[0].content}</p>
                <p className="font-semibold pt-3 capitalize text-slate-700">
                  {Testimonial[0].name}
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex justify-between p-4 space-x-6">
              {/* <img
                src="./images/icon8-user.png"
                className="w-[30px] h-[30px]"
              /> */}
              <div className="flex flex-col items-start text-left">
                <p className="font-light">{Testimonial[4].content}</p>
                <p className="font-semibold pt-3 capitalize text-slate-700">
                  {Testimonial[4].name}
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex justify-between p-4 space-x-6">
              {/* <img
                src="./images/icon8-user.png"
                className="w-[30px] h-[30px]"
              /> */}
              <div className="flex flex-col items-start text-left">
                <p className="font-light">{Testimonial[5].content}</p>
                <p className="font-semibold pt-3 capitalize text-slate-700">
                  {Testimonial[5].name}
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex justify-between p-4 space-x-6">
              {/* <img
                src="./images/icon8-user.png"
                className="w-[30px] h-[30px]"
              /> */}
              <div className="flex flex-col items-start text-left">
                <p className="font-light">{Testimonial[6].content}</p>
                <p className="font-semibold pt-3 capitalize text-slate-700">
                  {Testimonial[6].name}
                </p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* mobile */}
      <div className="mt-14 md:mt-0 lg:hidden">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          autoplay={{
            delay: 7500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="flex justify-between p-4 space-x-6">
              {/* <img
                src="./images/icon8-user.png"
                className="w-[30px] h-[30px]"
              /> */}
              <div className="flex flex-col items-start text-left">
                <p className="font-light">{Testimonial[0].content}</p>
                <p className="font-semibold pt-3 capitalize text-slate-700">
                  {Testimonial[0].name}
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex justify-between p-4 space-x-6">
              {/* <img
                src="./images/icon8-user.png"
                className="w-[30px] h-[30px]"
              /> */}
              <div className="flex flex-col items-start text-left">
                <p className="font-light">{Testimonial[1].content}</p>
                <p className="font-semibold pt-3 capitalize text-slate-700">
                  {Testimonial[1].name}
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex justify-between p-4 space-x-6">
              {/* <img
                src="./images/icon8-user.png"
                className="w-[30px] h-[30px]"
              /> */}
              <div className="flex flex-col items-start text-left">
                <p className="font-light">{Testimonial[2].content}</p>
                <p className="font-semibold pt-3 capitalize text-slate-700">
                  {Testimonial[2].name}
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex justify-between p-4 space-x-6">
              {/* <img
                src="./images/icon8-user.png"
                className="w-[30px] h-[30px]"
              /> */}
              <div className="flex flex-col items-start text-left">
                <p className="font-light">{Testimonial[3].content}</p>
                <p className="font-semibold pt-3 capitalize text-slate-700">
                  {Testimonial[3].name}
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex justify-between p-4 space-x-6">
              {/* <img
                src="./images/icon8-user.png"
                className="w-[30px] h-[30px]"
              /> */}
              <div className="flex flex-col items-start text-left">
                <p className="font-light">{Testimonial[4].content}</p>
                <p className="font-semibold pt-3 capitalize text-slate-700">
                  {Testimonial[4].name}
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex justify-between p-4 space-x-6">
              {/* <img
                src="./images/icon8-user.png"
                className="w-[30px] h-[30px]"
              /> */}
              <div className="flex flex-col items-start text-left">
                <p className="font-light">{Testimonial[5].content}</p>
                <p className="font-semibold pt-3 capitalize text-slate-700">
                  {Testimonial[5].name}
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex justify-between p-4 space-x-6">
              {/* <img
                src="./images/icon8-user.png"
                className="w-[30px] h-[30px]"
              /> */}
              <div className="flex flex-col items-start text-left">
                <p className="font-light">{Testimonial[6].content}</p>
                <p className="font-semibold pt-3 capitalize text-slate-700">
                  {Testimonial[6].name}
                </p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default Testimonials;
