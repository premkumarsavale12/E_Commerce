import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";


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
    }
     catch (err) {

      console.log(err);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000 }}
        loop={true}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {slider.map((item) => (
          <SwiperSlide key={item._id}>
            <img
              src={item.Image}
              alt={item.title}
              style={{
                width: "100%",
                height: "400px",
                objectFit: "cover",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        onClick={() => swiperRef.current.slidePrev()}
        style={arrowStyle("left")}
      >
        <FaArrowLeft />
      </div>

      <div
        onClick={() => swiperRef.current.slideNext()}
        style={arrowStyle("right")}
      >
        <FaArrowRight />
      </div>
    </div>
  );
};


const arrowStyle = (position) => ({
  position: "absolute",
  top: "50%",
  [position]: "20px",
  transform: "translateY(-50%)",
  width: "50px",
  height: "50px",
  background: "#eee",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  zIndex: 10,
  boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
});

export default Hero_Section;