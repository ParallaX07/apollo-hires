import { useRef } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./BannerSliderStyles.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function BannerSlider() {
    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.current.style.setProperty("--progress", 1 - progress);
    };

    return (
        <Swiper
            spaceBetween={30}
            loop={true}
            centeredSlides={true}
            autoplay={{
                delay: 5000,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
            }}
            // navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            onAutoplayTimeLeft={onAutoplayTimeLeft}
            className="mySwiper rounded-full border-4 border-primary dark:border-gray-100 max-h-96 max-w-sm dark:bg-black bg-white"
        >
            <SwiperSlide>
                <img
                    src="https://i.ibb.co/ZznWtZd/91a26039-a554-4de5-82a1-65c38bd00a66.jpg"
                    alt=""
                    className="object-cover object-center rounded-full p-1"
                />
            </SwiperSlide>
            <SwiperSlide>
                <img
                    src="https://i.ibb.co/YdnZVPp/lawyer-8462378-1280.webp"
                    alt=""
                    className="object-cover object-center rounded-full p-1"
                />
            </SwiperSlide>
            <SwiperSlide>
                <img
                    src="https://i.ibb.co/HYjKCD3/image.png"
                    alt=""
                    className="object-cover object-center rounded-full p-1"
                />
            </SwiperSlide>
            <SwiperSlide>
                <img
                    src="https://i.ibb.co/R47X4rH/image.png"
                    alt=""
                    className="object-cover object-center rounded-full p-1"
                />
            </SwiperSlide>
            <div className="autoplay-progress" slot="container-end">
                <svg viewBox="0 0 48 48" ref={progressCircle}>
                    <circle cx="24" cy="24" r="20"></circle>
                </svg>
                <span ref={progressContent}></span>
            </div>
        </Swiper>
    );
}
