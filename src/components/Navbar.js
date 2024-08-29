"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { SET_MENU_BTN, SET_LOGIN_WINDOW } from  "../redux/reducers/userSlice";
import { useRouter } from "next/navigation";
import Login from "./Login";


export default function Navbar() {

  const pathname = usePathname();
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch()
  const router = useRouter();
  
  return (<><nav className={user.menu !== true  ? `hidden lg:block  lg:bg-slate-900 lg:text-white start lg:opacity-100` : 
                                                            `bg-slate-100 lg:h-[50px] border lg:border-0 rounded lg:bg-slate-900 lg:text-white lg:block start end` }>
   <div className="mt-3 lg:mt-0 lg:w-[1000px] text-center m-auto leading-[50px]">
      <Link className="mr-0 align-middle lg:mr-5 text-xl hidden lg:inline-block" href="#">🌞</Link>
      <Link href={'/smart'} onClick={()=> {dispatch(SET_MENU_BTN(false))}}
        className={clsx("border-b ml-4 lg:ml-0 block text-left lg:inline mr-5 text-md py-1 px-2 lg:rounded-lg lg:border-1 lg:border-black hover:border-gray-500 lg:hover:bg-slate-800",{
          'lg:bg-slate-600 bg-gray-200': pathname === '/smart'
        })}>SMART서비스
      </Link>
      <Link href={'/himoney'} onClick={()=> {dispatch(SET_MENU_BTN(false))}}
        className={clsx("border-b ml-4 lg:ml-0 text-left block lg:inline mr-5 text-md py-1 px-2 lg:rounded-lg lg:border-1 lg:border-black hover:border-gray-500 lg:hover:bg-slate-800",{
          'lg:bg-slate-600 bg-gray-200': pathname === '/himoney'
        })}>고소득자 플랜</Link>
      <Link  href={'/bubin'} onClick={()=> {dispatch(SET_MENU_BTN(false))}}
        className={clsx("border-b ml-4 lg:ml-0 text-left block lg:inline mr-5 text-md py-1 px-2 lg:rounded-lg lg:border-1 lg:border-black hover:border-gray-500 lg:hover:bg-slate-800",{
          'lg:bg-slate-600 bg-gray-200': pathname === '/bubin'
        })}>법인 컨설팅</Link>
      <Link  href={'/consult'} onClick={()=> {dispatch(SET_MENU_BTN(false))}}
        className={clsx("border-b ml-4 lg:ml-0 text-left block lg:inline mr-5 text-md py-1 px-2 lg:rounded-lg lg:border-1 lg:border-black hover:border-gray-500 lg:hover:bg-slate-800",{
          'lg:bg-slate-600 bg-gray-200': pathname === '/consult'
        })}>세무상담</Link>    
      <Link href={'/susu'} onClick={()=> {dispatch(SET_MENU_BTN(false))}}
        className={clsx("border-b ml-4 lg:ml-0 text-left block lg:inline mr-5 text-md py-1 px-2 lg:rounded-lg lg:border-1 lg:border-black hover:border-gray-500 lg:hover:bg-slate-800",{
          'lg:bg-slate-600 bg-gray-200': pathname === '/susu'
        })}>수수료안내</Link>
      <Link href={'/board'} onClick={()=> {dispatch(SET_MENU_BTN(false))}}
        className={clsx("border-b ml-4 lg:ml-0 text-left block lg:inline mr-5 lg:mr-[50px] text-md py-1 px-2 lg:rounded-lg lg:border-1 lg:border-black hover:border-gray-500 lg:hover:bg-slate-800",{
          'lg:bg-slate-600 bg-gray-200': pathname === '/board'
        })}>Board</Link>      
      <button onClick={()=> { dispatch(SET_LOGIN_WINDOW(true));dispatch(SET_MENU_BTN(false));}}
        className="mt-10 lg:mt-0 ml-[-30px] mr-[10px] border-[0.5px] bg-gray-300 lg:bg-white text-black hover:text-white lg:hover:text-blue-300 w-[70px] h-[30px] text-sm text-center rounded-2xl p-1 px-3"
        >Login</button>        
      <button className="mt-10 lg:mt-0 border-[0.5px] bg-blue-600 text-white lg:text-white hover:text-gray-300 w-[80px] h-[30px] text-sm text-center rounded-2xl p-1 px-3"
        >Sign up</button>
      <Link className="ml-[-85px] mr-0 lg:mr-5 mt-5 text-sm block lg:hidden" href="#">Mode: 🌞</Link>  
    </div>        
  </nav>
      <Login />      
  </>);
}