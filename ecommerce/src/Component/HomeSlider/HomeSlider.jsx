import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import sliderImg1 from '../../assets/slider1.jpg';
import sliderImg2 from '../../assets/slider2.jpg';
import sliderImg3 from '../../assets/slider3.jpg';
import sliderImg4 from '../../assets/slider4.jpg';
import sliderImg5 from '../../assets/slider5.jpg';


export default function  SimpleSlider () {


        const settings = {
          dots: true,
          infinite: true,
          slidesToShow: 3,
          slidesToScroll: 1,
          autoplay: true,
          speed: 3000,
          autoplaySpeed: 3000,
          cssEase: "linear",
        };
      
        return (
          <div className=" mt-5  flex justify-center items-center ">
            <div className="  w-3/4">
              <Slider {...settings} arrows={false}    >
                <div>
                  <img className="p-1 rounded-xl shadow-2xl w-full h-auto" src={sliderImg1} alt="Slider Image 1" />
                </div>
                <div>
                  <img className="p-1 rounded-xl shadow-2xl w-full h-auto" src={sliderImg2} alt="Slider Image 2" />
                </div>
                <div>
                  <img className="p-1 rounded-xl shadow-2xl w-full h-auto" src={sliderImg3} alt="Slider Image 3" />
                </div>
                <div>
                  <img className="p-1 rounded-xl shadow-2xl w-full h-auto" src={sliderImg4} alt="Slider Image 4" />
                </div>
                <div>
                  <img className="p-1 rounded-xl shadow-2xl w-full h-auto" src={sliderImg5} alt="Slider Image 5" />
                </div>
              </Slider>
            </div>
          </div>
        );
}
