import { useContext } from "react"
import { CartContext } from "../../Context/CartContext"
import toast from '../../../node_modules/react-hot-toast/src/index';
import { Link } from "react-router-dom";

export default function Cart() {

  const { allProducts , totalCartPrice ,numOfCartItems ,updateUserCart ,removeFromCart } = useContext(CartContext);
  function handelUpdateCount(productId, newCount){
    updateUserCart(productId, newCount)
  }
  async function handelRemoveProduct(productId){
   const resFlaf = await removeFromCart(productId);
   if(resFlaf){
     toast.success("product removed from cart")
   }
   else(
    toast.error("product not removed from cart")
   )
  }

  return (
    <>
      <div className=" container mx-auto relative overflow-x-auto mt-8 shadow-md sm:rounded-lg">
        <table className=" border border-green-500 rounded-3xl w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-16 py-3">
              </th>
              
              
              <th scope="col" className="px-6 py-6 text-2xl font-extralight">Product</th>
              <th scope="col" className="px-6 py-3 text-2xl font-extralight">Qty</th>
              <th scope="col" className="px-6 py-3 text-2xl font-extralight">Price</th>
              <th scope="col" className="px-6 py-3 text-2xl font-extralight">Action</th>
            </tr>
          </thead>
          <tbody >
            {allProducts?.map((product) => (
              <tr key={product._id} className="bg-white border-b hover:bg-gray-50 border-x-2 border-green-500">
                <td className="p-4">
                  <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product.product.title} />
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900">
                  {product.product.title}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <button disabled={product.count === 1} onClick={()=>handelUpdateCount(product.product._id , product.count -1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200" type="button">
                      <span className="sr-only">Quantity button</span>
                      <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                      </svg>
                    </button>
                    <div>
                      <input type="text" readOnly id="first_product" className="bg-gray-50 w-14 border text-center border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1" placeholder={product.count}  />
                    </div>
                    <button onClick={()=>handelUpdateCount(product.product._id , product.count +1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200" type="button">
                      <span className="sr-only">Quantity button</span>
                      <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900">
                  {product.price}
                </td>
                <td className="px-6 py-4">
                  <a onClick={()=>handelRemoveProduct(product.product._id)} href="#" className="font-medium text-red-600 hover:underline">Remove</a>
                </td>
              </tr>
            
            ))}
            </tbody>
        </table>
        <div className="mb-4 p-8 border-x-2 bg-green-700 text-white border-gray-500">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-extralight">
                Subtotal <span className="text-sm text-gray-900 opacity-50">({numOfCartItems}) items</span>
              </h2>
              <span className="text-xl font-extralight">EGP {totalCartPrice}</span>
            </div>

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-extralight">Shipping Fee </h2>
              <span className="text-xl text-white "> FREE</span>
            </div>

            <div className="flex w-full justify-between items-center">
              <h2 className="text-4xl font-extralight">
                Total <span className="text-lg text-gray-900 opacity-50">(incl. VAT)</span>
              </h2>
              <span className="text-4xl font-extralight">EGP {totalCartPrice}</span>
            </div>
            {totalCartPrice > 0 ? (
              <Link to="/CashPayment">
                <div className="mt-3 flex justify-center items-center mb-4">
                  <button className="w-1/2 border border-black bg-white text-green-700 my-2 rounded-xl p-4 text-xl text-center">
                    Pay <span className="text-sm opacity-50 text-green-800">{totalCartPrice} EGP</span>
                  </button>
                </div>
              </Link>
            ) : ''}



          </div>
      </div>
    </>
  );
}
