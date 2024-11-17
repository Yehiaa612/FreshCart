import axios from "axios";
import { useQuery } from "react-query";


export default function useAllCategories() {

    function getCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
    }

  const categoryData = useQuery({
    queryKey: "allCategories",
    queryFn: getCategories,
  });

  return categoryData;
}
