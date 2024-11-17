import axios from "axios";
// import { useEffect, useState } from "react";
import { FallingLines } from 'react-loader-spinner'
import SimpleSlider from "../HomeSlider/HomeSlider";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import { useQuery } from "react-query";
import { Link } from 'react-router-dom';
import {CartContext} from "../../Context/CartContext"
import { useContext } from "react";
import toast from '../../../node_modules/react-hot-toast/src/index';


export default function Products() {

  const {addToCart} = useContext(CartContext)

  async function handelAddProduct(id){
    const productFlag = await addToCart(id) ;

    if(productFlag){
      toast.success("product add to cart"  )
    }
    else{
      toast.error("error adding to cart")
    }
  }
  
   function getAllProudcts() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products');
  }

  const {data ,isError ,isLoading ,error , isFetching} =  useQuery({
    queryKey: 'allProudcts',
    queryFn:getAllProudcts
  });  
  if (isError) {
    return <div>Error! {error.message}</div>;
  }
  if (isLoading) {
  return <div style={{backgroundColor:"#121212"}} className="h-screen flex justify-center items-center">
  <FallingLines
      color="#17b25f"
      width="100"
      visible={true}
      ariaLabel="falling-circles-loading"
  />
</div>}


  return (
    <>
        <div className="container  mx-auto">
        <h1 style={{color: "#17b25f"}} className="mt-4 font-extrabold text-center text-5xl"> FreshCart..</h1>
          <SimpleSlider/>
          <CategoriesSlider/>
          <h1 style={{color: "#17b25f"}} className="text-3xl  font-extrabold text-green-700 mb-4 ">Products</h1>
                  <div className=" grid md:grid-cols-3 lg:grid-cols-6"> 
              {data.data.data.map((product)=> <div key={product._id} className="product p-2" >
              <div  className="relative overflow-hidden group">

              <div className="cursor-pointer group-hover:translate-x-0 transition-[1000ms] text-green-700 text-3xl p-2 absolute top-0 end-1 translate-x-[200%]">
                <i onClick={()=>handelAddProduct(product._id)} className="fa-solid fa-cart-plus"></i>
                </div>
              <Link to={`/ProductDetails/${product._id}`}>
                {/* <div>
                  <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
                  <div className="flex justify-center items-center absolute top-0 left-0 w-full h-full">
                    <span className="text-2xl font-bold text-white">{product.quantity > 0? '' : 'Out of Stock'}</span>
                </div>
                </div> */}
                          <img className="w-full" src={product.imageCover}alt="tittle" />
                    <h6 style={{color: "#17b25f"}}>{product.category.name}</h6>
                    <h2>{product.title.split(' ').slice(0,2).join(' ')}</h2> 
                    <div className="flex justify-between items-center">
                    <p>
                      <span className={product.priceAfterDiscount?'line-through text-red-600':''}>{product.price}</span>
                      <span className="ml-5">{product.priceAfterDiscount}</span>
                      </p>
                    <p> <i className="fa-solid fa-star text-yellow-400"></i>{product.ratingsAverage}</p>
                    </div>
                    </Link>
                 </div>  
 

        </div> )}
            </div>
        </div>

    </>
  )
}


