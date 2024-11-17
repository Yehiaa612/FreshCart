import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FallingLines } from "react-loader-spinner";
import useAllCategories from "../CustomHooks/useAllCategories";

export default function CategoriesSlider() {

   const {isLoading , isError , data} = useAllCategories();
  if (isLoading) {
    return (
      <div
        style={{ backgroundColor: "#121212" }}
        className="h-screen flex justify-center items-center"
      >
        <FallingLines
          color="#17b25f"
          width="100"
          visible={true}
          ariaLabel="falling-circles-loading"
        />
      </div>
    );
  }

  if (isError) return <h3>Error</h3>;

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
    rows: 1,
    slidesPerRow: 2,
  };

  return (
    <>
      <h1 style={{color: "#17b25f"}} className="mt-4 font-extrabold text-3xl">
        Shop Popular Category
      </h1>

      <div className="container mt-8 mb-8 slider-container">
        <Slider {...settings}>
          {data.data.data.map((category) => (
            <div key={category._id} className="p-4">
              <img
                className="w-40 h-40  rounded-lg"
                src={category.image}
                alt={category.name}
              />
              <h6 className="text-center mt-2">{category.name}</h6>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
