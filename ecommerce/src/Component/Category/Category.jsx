import { FallingLines } from "react-loader-spinner";
import useAllCategories from '../CustomHooks/useAllCategories';
export default function Category() {

  const {isLoading , isError , data} = useAllCategories();

  if (isLoading)
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

  if (isError) return <h3>Error</h3>;

  return (
    <>
   
    <div className="container mx-auto p-4">
        <h1 className="text-3xl text-center font-extralight text-green-700 ">Category</h1>
        <div className="grid grid-cols-4 m-4 gap-4">
          {data.data.data.map((category) => (
            <div
              key={category._id}
              className="brand p-3 rounded-xl bg-green-700 text-white"
            >
              <div className="flex justify-center items-center ">
                <img
                  className="w-40 h-40 "
                  src={category.image}
                  alt="category Img"
                />
              </div>
              <h4 className="text-center">{category.name}</h4>
            </div>
          ))}
        </div>
      </div>

    </>
  );
}
