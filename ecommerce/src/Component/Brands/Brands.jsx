import axios from "axios";
import { useQuery } from "react-query";
import { FallingLines } from 'react-loader-spinner';

export default function Brands() {
  // دالة لجلب البيانات من API
  function getAllPrands() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/brands');
  }

  const { isLoading, isError, data } = useQuery({
    queryKey: 'allBrands',
    queryFn: getAllPrands, 
  });

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
    <div className="container mx-auto p-5">
              <h1 className="text-3xl text-center font-extralight text-green-700 mb-4 ">Brands</h1>
      <div className="grid grid-cols-4 gap-5">
        {data.data.data.map((brand) => (
          <div key={brand._id}className="brand p-3 rounded-xl bg-green-700 text-white">
            <img src={brand.image} alt="Brand Img" className="w-full h-32 object-cover rounded-md" />
            <h2 className="text-lg font-bold mt-2">{brand.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
