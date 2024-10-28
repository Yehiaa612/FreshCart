import logo from '../../assets/shop.svg'
import  {Link, NavLink, useNavigate} from 'react-router-dom'
import Navcss from '../Navbar/Navbar.module.css'
import { useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext';

export default function Navbar() {
  const {token ,settoken} = useContext(AuthContext);
  const navigate = useNavigate()

  function handelLogout() {
    localStorage.removeItem('tkn');
    settoken(null);
    navigate('/login');
    
  }
  return (
    <>

    <nav className={Navcss.NavBg}  >
      <div className='container p-3 mx-auto flex items-center justify-between '>
      <div className=' flex items-center gap-3'>
          <Link style={{color:'#17b25f', fontSize:'30px'}} className='flex  items-center font-extrabold ' to='/home'> <img src={logo} alt="" /> FreshCart</Link>

          {token?<ul className='flex pl-6 items-center space-x-3'>
            <li>
              <NavLink to='/Products'>Products</NavLink>
            </li>
            <li>
              <NavLink to='/Category'>Category</NavLink>
            </li>
            <li>
              <NavLink to='/Brands'>Brand</NavLink>
            </li>
            <li>
              <NavLink to='/Cart'>Cart</NavLink>
            </li>
          </ul> :null}

   
      </div>

      <div className=' flex items-center gap-4'>
        <ul className=' flex items-center gap-3'> 
          <li>
            <i className='fa-brands cursor-pointer fa-facebook-f'></i>
          </li>
          <li>
            <i className='fa-brands cursor-pointer  fa-github'></i>
          </li>
          <li>
            <i className='fa-brands cursor-pointer  fa-linkedin'></i>
          </li>
          <li>
            <i className='fa-brands cursor-pointer  fa-behance'></i>
          </li>
        </ul>


        <ul className=' flex items-center gap-2 '>

        {token?
            <>
              <li><span className='cursor-pointer' onClick={handelLogout}> Logout</span></li>
            </>  :
             <>
              <li>
                <NavLink to='/Register'> Register</NavLink>
              </li>
              <li>
                <NavLink to='/login'> Login</NavLink>
              </li>
            </>          
 }





        </ul>
      </div>
      </div>


    </nav>

    </>
  )
}
