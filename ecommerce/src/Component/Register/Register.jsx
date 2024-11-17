import {useFormik } from 'formik'
import axios from 'axios';
import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner'

export default function Register() {
  const navigate = useNavigate();
  const [errorMessage, seterrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(false);
  const [isClicked, setisClicked] = useState(false)

  async function sendUserData (values) {
    console.log("hello from formik", values);
    // send object by api
    setisClicked(true)
   axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values)
   .then(function(x){
    setSuccessMessage(true);
    setisClicked(false)
    setTimeout(() => { navigate('/login')},2000)
   })

  
    .catch( function (x) {
      {
        seterrorMessage(error.response.data.message);
        setisClicked(false)

        setTimeout(() => { seterrorMessage(null)},3000)

      }
    
})
      

    
  }
  const RegisterFormik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
    onSubmit: sendUserData ,     // send object 
  
    validate: function (allData) {
      const errors = {};
      const nameRegex = /^[A-Za-z\s]{3,50}$/;
      const phoneRegex = /^(\+?20)?01[0-2|5][0-9]{8}$/;
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const passwordRegex = /^.{8,}$/;
  
      if (!nameRegex.test(allData.name)) {
        errors.name = "Please enter a valid name (letters and spaces only, 3-50 characters).";
      }
      if (!phoneRegex.test(allData.phone)) {
        errors.phone = "Please enter a valid Egyptian phone number (e.g., 01012345678).";
      }
      if (!emailRegex.test(allData.email)) {
        errors.email = "Please enter a valid email address (e.g., example@example.com).";
      }
      if (!passwordRegex.test(allData.password)) {
        errors.password = "Password must be at least 6 characters long.";
      }
      if (allData.rePassword !== allData.password) {
        errors.rePassword = "Passwords do not match.";
      }
  
      return errors;
    },
  });
  
  return (
    
        <div className="font-extralight ">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path
                fill="#121212"
                fillOpacity={1}
                d="M0,256L48,240C96,224,192,192,288,197.3C384,203,480,245,576,250.7C672,256,768,224,864,186.7C960,149,1056,107,1152,90.7C1248,75,1344,85,1392,90.7L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
              />
            </svg>
          {successMessage ?<div className='flex justify-center items-center'>
          <div className="flex p-4 mb-4 mt-4 items-center text-sm text-green-800 border border-green-300 rounded-lg bg-green-50" role="alert">
          <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
          </svg>
          <span className="sr-only">Info</span>
          <div>
            <span className="font-medium">Success alert!</span> Account created successfully
          </div>
        </div>
        </div> :''}
          {errorMessage?<div className='flex justify-center items-center'>
          <div className="flex p-4 mb-4 mt-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50" role="alert">
            <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
            </svg>
            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium">Danger Alert! </span>{errorMessage}
            </div>
          </div>
          </div>
          : ' ' }

        <h1 className=" pb-4 text-center text-green-700   ">REGISTER NOW</h1>
        <form  onSubmit={RegisterFormik.handleSubmit} className="bg-white shadow-2xl rounded-xl p-8 border border-green-700 max-w-md mx-auto">

        <div className="relative z-0 w-full mb-5 group">
                <input  value={RegisterFormik.values.name} onChange={RegisterFormik.handleChange} onBlur={RegisterFormik.handleBlur} type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-text-green-700 focus:outline-none focus:ring-0 focus:border-green-700 peer" placeholder=" " required />
                <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-700 peer-focus:dark:text-green-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                {RegisterFormik.errors.name && RegisterFormik.touched.name?
                <div className="p-4 mt-1 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
                  {RegisterFormik.errors.name}
                </div>:''}
            </div>

          <div className="relative z-0 w-full mb-5 group">
              <input value={RegisterFormik.values.email} onChange={RegisterFormik.handleChange} onBlur={RegisterFormik.handleBlur}  type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-text-green-700 focus:outline-none focus:ring-0 focus:border-green-700 peer" placeholder=" " required />
              <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-700 peer-focus:dark:text-green-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
              {RegisterFormik.errors.email && RegisterFormik.touched.email?
                <div className="p-4 mt-1 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
                  {RegisterFormik.errors.email}
                </div>:''}
          </div>
          <div className="relative z-0 w-full mb-5 group">
              <input value={RegisterFormik.values.phone} onChange={RegisterFormik.handleChange} onBlur={RegisterFormik.handleBlur} type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-text-green-700 focus:outline-none focus:ring-0 focus:border-green-700 peer" placeholder=" " required />
              <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-700 peer-focus:dark:text-green-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
              {RegisterFormik.errors.phone && RegisterFormik.touched.phone?
                <div className="p-4 mt-1 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
                  {RegisterFormik.errors.phone}
                </div>:''}
          </div>

          <div className="relative z-0 w-full mb-5 group">
              <input value={RegisterFormik.values.password} onChange={RegisterFormik.handleChange} onBlur={RegisterFormik.handleBlur} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-text-green-700 focus:outline-none focus:ring-0 focus:border-green-700 peer" placeholder=" " required />
              <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-700 peer-focus:dark:text-green-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
              {RegisterFormik.errors.password && RegisterFormik.touched.password?
                <div className="p-4 mt-1 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
                  {RegisterFormik.errors.password}
                </div>:''}
          </div>

          <div className="relative z-0 w-full mb-5 group">
              <input value={RegisterFormik.values.rePassword} onChange={RegisterFormik.handleChange} onBlur={RegisterFormik.handleBlur} type="password" name="rePassword" id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-text-green-700 focus:outline-none focus:ring-0 focus:border-green-700 peer" placeholder=" " required />
              <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-700 peer-focus:dark:text-green-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
              {RegisterFormik.errors.rePassword && RegisterFormik.touched.rePassword?
                <div className="p-4 mt-1 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
                  {RegisterFormik.errors.rePassword}
                </div>:''}
          </div>

          <div className="">
          <div className="pb-4 flex items-center justify-center">
          <button type="Register" className="text-white flex items-center justify-center  bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            
            {!isClicked? 'Register': <ColorRing
              visible={true}
              height="40"
              width="40"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={['#00000', '#00000', '#00000', '#00000', '#00000']}
              />}
            </button>
          </div>
          <Link className='flex justify-center underline text-green-700' to = '/Login' > Login Now </Link>
          </div>
        </form>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#121212"
            fillOpacity={1}
            d="M0,256L48,240C96,224,192,192,288,197.3C384,203,480,245,576,250.7C672,256,768,224,864,186.7C960,149,1056,107,1152,90.7C1248,75,1344,85,1392,90.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
    </div>
  )
}
