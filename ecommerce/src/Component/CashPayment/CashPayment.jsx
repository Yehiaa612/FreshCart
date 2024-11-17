import { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { useFormik } from 'formik';
import axios from "axios";
import { Link } from "react-router-dom";

export default function CashPayment() {
    const {   totalCartPrice , CartId , clearUI  } = useContext(CartContext);
    const [onlinePay, setonlinePay] = useState(false)

    function detectAndCall(values){
        if (onlinePay) {
            onlinePayment(values);
        }
        else {
            createCashOrder(values);
        }
    
    }

    function createCashOrder(values) {
        const backendBody = {
            shippingAddress : values,
        }
        axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${CartId}`,backendBody,
            {headers :{ token: localStorage.getItem("tkn"),},})
            .then((res)=>{
                console.log("after cash order",res);
                clearUI();
                
            })
            .catch((error)=>{
                console.log(error);
                
            })
    }

    function onlinePayment(values) {
        const backendBody = {
            shippingAddress : values,
        }
        axios.post(
            `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${CartId}`,
            backendBody,
            {
              headers: { token: localStorage.getItem("tkn") },
              params: { url: 'http://localhost:3333' },
            }
          )
            .then((res)=>{
                console.log("after online order",res);
                window.open(res.data.session.url,'_self');
                
            })
            .catch((error)=>{
                console.log(error);
                
            })
    }


    const paymentFormik = useFormik({
        initialValues: {
          details: '',
          city: '',
          phone: '',
        },
        onSubmit: detectAndCall 
      });
    

  return (
    <>
<section className="bg-white py-8 antialiased md:py-16">
  <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
    <div className="mx-auto max-w-5xl">
      <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">Payment</h2>
      <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12">
        <form onSubmit={(e)=>{paymentFormik.handleSubmit()}} action="#" className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6 lg:max-w-xl lg:p-8">
          <div className="mb-6 grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="details" className="mb-2 block text-sm font-medium text-gray-900">
                Name 
              </label>
              <input type="text" name="details" id="details" value={paymentFormik.values.details} onChange={paymentFormik.handleChange} onBlur={paymentFormik.handleBlur} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500" placeholder="Name Details" required />
              {paymentFormik.errors.details && paymentFormik.touched.details?
                <div className="p-4 mt-1 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
                  {paymentFormik.errors.details}
                </div>:''}
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-900"> 
                Phone
              </label>
              <input type="text" name="phone" id="phone" value={paymentFormik.values.phone} onChange={paymentFormik.handleChange} onBlur={paymentFormik.handleBlur} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pe-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500" placeholder="01-xxx-xxx-xxx"/>
              {paymentFormik.errors.phone && paymentFormik.touched.phone?
                <div className="p-4 mt-1 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
                  {paymentFormik.errors.phone}
                </div>:''}
            </div>

            <div>
              <label htmlFor="city" className="mb-2 flex items-center gap-1 text-sm font-medium text-gray-900">
                Address
              </label>
              <input type="text"  name="city" id="city" value={paymentFormik.values.city} onChange={paymentFormik.handleChange} onBlur={paymentFormik.handleBlur} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500" placeholder="Address Detailes" required />
              {paymentFormik.errors.city && paymentFormik.touched.city?
                <div className="p-4 mt-1 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
                  {paymentFormik.errors.city }
                </div>:''}
            </div>
          </div>
          <button onClick={()=>{setonlinePay(false)}} type="submit" className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-lg font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300">
            Cash on Delivery
          </button>
          <button onClick={()=>{setonlinePay(true)}} type="submit" className="mt-4 flex w-full items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-lg font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300">
            Pay Now <span className= " text-gray-900 opacity-[50%] text-xs">(Online Payment)</span>
          </button>
        </form>
        <div className="mt-6 grow sm:mt-8 lg:mt-0">
          <div className="space-y-4 rounded-lg border border-gray-100 bg-gray-50 p-6">
            <div className="space-y-2">
              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500">Original price</dt>
                <dd className="text-base font-medium text-gray-900">{totalCartPrice} EGP</dd>
              </dl>

              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500">Shipping</dt>
                <dd className="text-base font-medium text-gray-900">Free</dd>
              </dl>

            </div>
            <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
              <dt className="text-base font-bold text-gray-900">Total</dt>
              <dd className="text-base font-bold text-gray-900">{totalCartPrice}</dd>
            </dl>
          </div>
          <div className="mt-6 flex items-center justify-center gap-8">
            <img className="h-8 w-auto" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal.svg"  />
            <img className="h-8 w-auto" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg"  />
            <img className="h-8 w-auto" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard.svg"  />
          </div>
        </div>
      </div>

    </div>
  </div>
</section>



    </>
  );
}
