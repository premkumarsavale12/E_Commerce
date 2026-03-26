import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"; // Using Fi icons for a thinner look

const Hero_Section = () => {
  const [slider, setSlider] = useState([]);
  const swiperRef = useRef(null);

  useEffect(() => {
    FetchSliderApi();
  }, []);

  const FetchSliderApi = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/hero_section/all");
      setSlider(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="relative group w-full bg-[#f9f9f9]">

      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700&display=swap');
          .minimal-hero { font-family: 'Jost', sans-serif; }`}
      </style>

      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop={true}
        pagination={{
          clickable: true,
          el: ".custom-pagination"
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className="minimal-hero w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]"
      >
        {slider.map((item) => (
          <SwiperSlide key={item._id}>
            <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] flex items-center overflow-hidden">

              <div className="absolute inset-0">
                <img
                  src={`http://localhost:5000/uploads/${item.Image}`}
                  alt={item.Heading || "Hero Slide"}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-white/40"></div>
              </div>

              <div className="relative z-10 max-w-7xl w-full mx-auto px-6 md:px-12 lg:px-20">
                <div className="w-full md:w-[55%] lg:w-[45%]">

                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-black mb-3 leading-tight">
                    {item.Heading}
                  </h1>

                  {item.Sub_Heading && (
                    <h3 className="text-lg sm:text-xl md:text-2xl text-gray-800 font-light mb-6">
                      {item.Sub_Heading}
                    </h3>
                  )}

                  <div className="w-12 h-[2px] bg-black mb-6"></div>

                  <p className="text-gray-700 text-sm md:text-base lg:text-lg mb-6 max-w-md leading-relaxed">
                    {item.Description}
                  </p>

                  {item.Sub_Description && (
                    <p className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-black mb-8">
                      {item.Sub_Description}
                    </p>
                  )}

                  <button className="bg-black text-white px-8 py-3 text-sm md:text-base font-semibold uppercase tracking-widest hover:bg-gray-800 transition">
                    {item.Button || "Shop Now"}
                  </button>

                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>


      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 hover:bg-white text-black rounded-full flex items-center justify-center shadow-sm transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-105 active:scale-90"
        aria-label="Previous slide"
      >
        <FiChevronLeft className="text-2xl" />
      </button>

      <button
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 hover:bg-white text-black rounded-full flex items-center justify-center shadow-sm transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-105 active:scale-90"
        aria-label="Next slide"
      >
        <FiChevronRight className="text-2xl" />
      </button>

      <div className="custom-pagination absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2"></div>


      <style jsx global>{`
        .custom-pagination .swiper-pagination-bullet {
          width: 6px;
          height: 6px;
          background: #ccc;
          opacity: 0.5;
          margin: 0 4px !important;
          transition: all 0.3s ease;
        }
        .custom-pagination .swiper-pagination-bullet-active {
          background: #000;
          opacity: 1;
          transform: scale(1.5);
        }
      `}</style>
    </div>
  );
};

export default Hero_Section;
