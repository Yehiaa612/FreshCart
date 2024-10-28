
import{createBrowserRouter, RouterProvider} from 'react-router-dom'
import Layout from './Component/Layout/Layout';
import Register from './Component/Register/Register';
import Login from './Component/Login/Login';
import NotFound from './Component/NotFound/NotFound';
import AuthContext from './Context/AuthContext';
import Home from './Component/Home/Home';
import Brands from './Component/Brands/Brands';
import Category from './Component/Category/Category';
import Cart from './Component/Cart/Cart';
import Products from './Component/Products/Products';
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute';
import { QueryClient , QueryClientProvider } from "react-query";
import {Offline} from 'react-detect-offline'
import ProductDetails from './Component/ProductDetails/ProductDetails';
import CartContextProvider from './Context/CartContext';
import { Toaster } from '../node_modules/react-hot-toast/src/components/toaster';
import CashPayment from './Component/CashPayment/CashPayment';
import SplashScreen from './Component/SplashScreen/SplashScreen';

const router = createBrowserRouter([{path:'' , element: <Layout/> ,children:[
  {path:'register' , element : <Register/>},
  {path:'login' , element : <Login/>},
  {path:'SplashScreen' , element : <SplashScreen/>},
  {path:'ProductDetails/:id' , element :<ProtectedRoute> <ProductDetails/> </ProtectedRoute>},
  {path:'Home' , element :<ProtectedRoute> <Home/> </ProtectedRoute>},
  {path:'Brands' , element : <ProtectedRoute> <Brands/> </ProtectedRoute>},
  {path:'CashPayment' , element : <ProtectedRoute> <CashPayment/> </ProtectedRoute>},
  {path:'Category' , element :<ProtectedRoute>  <Category/> </ProtectedRoute>},
  {path:'Cart' , element :<ProtectedRoute>  <Cart/> </ProtectedRoute>},
  {path:'Products' , element :<ProtectedRoute> <Products/> </ProtectedRoute> },
  {path:'*' , element : <NotFound/>},

]}, // route
  ]) 
  
  const reactQueryConfig= new QueryClient();
export default function App() {

  return (
    <>
      <AuthContext>
        <QueryClientProvider client={reactQueryConfig}>
          <CartContextProvider>
            <RouterProvider router={router}/>
            <Toaster/>
            <Offline>
              <div className="fixed inset-0 flex items-center justify-center bg-gray-800 text-white">
                <div className="p-8 rounded-lg shadow-lg bg-red-600 text-center">
                  <h1 className="text-2xl font-bold">You're Offline!</h1>
                  <p className="mt-2">Please check your internet connection and try again.</p>
                </div>
              </div>
            </Offline>

          </CartContextProvider>
        </QueryClientProvider>
      </AuthContext>

    </>
  )
}
