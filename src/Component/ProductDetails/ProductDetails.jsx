import axios from "axios"
import { FallingLines } from "react-loader-spinner"
import { useQuery } from "react-query"
import { Link, useParams } from "react-router-dom"
import { useContext } from "react"; 
import {CartContext} from "../../Context/CartContext"
import toast from '../../../node_modules/react-hot-toast/src/index';


export default function ProductDetails() {
    
   const {id} = useParams()
   const { addToCart } = useContext(CartContext);

   async function  handelAddToCart(id) {

   const resFlag = await addToCart(id);
   console.log('resflag' ,resFlag);
   
    if(resFlag){
      toast.success("product add to cart"  )
    }
    else{
      toast.error("error adding to cart")
    }
   }


    function getProductDetails (){
       return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }
    const {isError, isLoading , data ,error} = useQuery({
        queryKey: ['productDetails',id] ,
        queryFn: getProductDetails,
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

    if (isError) {
    return <div>Error! {error.message}</div>;
    }


    const pdata=data.data.data;
  return (
    <>
    <div className="container mx-auto flex items-center justify-between">
        <div className="w-1/4">
        <img src={pdata.imageCover} className="w-full" alt={pdata.tittle} />
        </div>
        <div className="w-[70%]">
            <h1 className="font-bold text-3xl">{pdata.title}</h1>
            <p className="text-2xl font-extralight">{pdata.description}</p>
            <h5 className="text-xl" >categoiry: {pdata.category.name}</h5>
            <h5 className="text-xl" >Price: {pdata.price}</h5>
            <button onClick={()=>handelAddToCart(pdata._id)} className="w-full bg-green-700 text-white  py-4 px-4 rounded-lg mb-3 hover:bg-white  hover:text-black border border-green-700 "  > + Add To Cart</button>
            <Link to="/products">
            <button  className="w-full bg-green-700 text-white  py-4 px-4 rounded-lg mb-3 hover:bg-white  hover:text-black border border-green-700 "  > Continue Shoping</button>
            </Link>
            <Link to="/cart">
            <button  className="w-full bg-green-700 text-white  py-4 px-4 rounded-lg mb-3 hover:bg-white  hover:text-black border border-green-700 "  > View Cart</button>
            </Link>

        </div>
        


    </div>
    </>
  )
}
