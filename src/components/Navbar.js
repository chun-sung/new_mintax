"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { SET_MENU_BTN, SET_LOGIN_WINDOW, SET_MEMBER_PANEL } from  "../redux/reducers/userSlice";
import { useRouter } from "next/navigation";
import Mobile_btn from "./Mobile_btn";
import Image from "next/image";


export default function Navbar({mode, setMode}) {

  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch()
  const pathname = usePathname();
  const router = useRouter();


  return (<>
        <div className={mode !== 'darkMode' ? "h-[60px] w-full m-auto bg-white border-b border-gray" :
            "h-[60px] w-full m-auto bg-black border-b-0 lg:border-b-0 border-gray" 
          }> 
            <div className="m-auto w-[80px] pt-2.5">
                <Link href="/">
                {
                    mode == 'darkMode' ?
                    <Image
                        src="/logo_white.svg"
                        width="80"
                        height="60"
                        alt="logo"
                        className="m-auto"            
                    />
                    :
                    <Image
                        src="/logo.svg"
                        width="80"
                        height="60"
                        alt="logo"
                        className="m-auto"            
                     />
                }
                </Link>
            </div>
        </div> 
  <nav className={user.menu !== true  ? `hidden lg:block  lg:bg-slate-900 lg:text-white start lg:opacity-100` : 
                                                            `bg-slate-100 lg:h-[50px] border lg:border-0 rounded lg:bg-slate-900 lg:text-white lg:block start end` }>
   <div className="mt-3 lg:mt-0 lg:w-[1000px] text-center m-auto leading-[50px]">
      <Link onClick={()=>{
        // if(typeof window != undefined ) {
          if(mode == 'lightMode') {                                    
                  document.cookie = 'mode=darkMode; max-age=' + (3600 * 24 * 400)
                  setMode('darkMode')
                  // console.log(mode)
                  setTimeout(()=> {
                    document.querySelector('.any')?.classList.add('none') // 커버 삭제 display: 'none'
                  }, 100)                                
                  router.refresh()
          } else {
              document.cookie = 'mode=lightMode; max-age=' + (3600 * 24 * 400)
              setMode('lightMode')
              // console.log(mode)
              setTimeout(()=> {
                document.querySelector('.any')?.classList.add('none') // 커버 삭제 display: 'none'
              }, 100)
              router.refresh()
          }
        // }  
      }}
        className="mr-0 align-middle lg:mr-5 text-xl hidden lg:inline-block" href="#">{ mode == 'darkMode' ? '🌙' : '🌞' }</Link>
      <Link href={'/smart'} onClick={()=> {dispatch(SET_MENU_BTN(false))}}
        className={clsx("border-b lg:border-0 ml-4 lg:ml-0 block text-left lg:inline mr-5 text-md py-1 px-2 lg:rounded-lg lg:border-1 lg:border-black lg:hover:border-gray-500 lg:hover:bg-slate-700",{
          'lg:bg-white bg-gray-200 lg:hover:bg-white text-black': pathname === '/smart'
        })}>SMART서비스
      </Link>
      <Link href={'/himoney'} onClick={()=> {dispatch(SET_MENU_BTN(false))}}
        className={clsx("border-b lg:border-0 ml-4 lg:ml-0 text-left block lg:inline mr-5 text-md py-1 px-2 lg:rounded-lg lg:border-1 lg:border-black lg:hover:border-gray-500 lg:hover:bg-slate-700",{
          'lg:bg-white bg-gray-200 lg:hover:bg-white text-black': pathname === '/himoney'
        })}>고소득자 플랜</Link>
      <Link  href={'/bubin'} onClick={()=> {dispatch(SET_MENU_BTN(false))}}
        className={clsx("border-b lg:border-0 ml-4 lg:ml-0 text-left block lg:inline mr-5 text-md py-1 px-2 lg:rounded-lg lg:border-1 lg:border-black lg:hover:border-gray-500 lg:hover:bg-slate-700",{
          'lg:bg-white bg-gray-200 lg:hover:bg-white text-black': pathname === '/bubin'
        })}>법인 컨설팅</Link>
      <Link  href={'/consult'} onClick={()=> {dispatch(SET_MENU_BTN(false))}}
        className={clsx("border-b lg:border-0 ml-4 lg:ml-0 text-left block lg:inline mr-5 text-md py-1 px-2 lg:rounded-lg lg:border-1 lg:border-black lg:hover:border-gray-500 lg:hover:bg-slate-700",{
          'lg:bg-white bg-gray-200 lg:hover:bg-white text-black': pathname === '/consult'
        })}>세무상담</Link>    
      <Link href={'/susu'} onClick={()=> {dispatch(SET_MENU_BTN(false))}}
        className={clsx("border-b lg:border-0 ml-4 lg:ml-0 text-left block lg:inline mr-5 text-md py-1 px-2 lg:rounded-lg lg:border-1 lg:border-black lg:hover:border-gray-500 lg:hover:bg-slate-700",{
          'lg:bg-white bg-gray-200 lg:hover:bg-white text-black': pathname === '/susu'
        })}>수수료안내</Link>
      <Link href={'/board'} onClick={()=> {dispatch(SET_MENU_BTN(false))}}
        className={clsx("border-b lg:border-0 lg:border-0v ml-4 lg:ml-0 text-left block lg:inline mr-5 lg:mr-[50px] text-md py-1 px-2 lg:rounded-lg lg:border-1 lg:border-black lg:hover:border-gray-500 lg:hover:bg-slate-700",{
          'lg:bg-white bg-gray-200 lg:hover:bg-white text-black': pathname === '/board'
        })}>Board</Link>      
      <button onClick={()=> { dispatch(SET_LOGIN_WINDOW(true));dispatch(SET_MENU_BTN(false));dispatch(SET_MEMBER_PANEL(false));}}
        className="mt-10 lg:mt-0 ml-[-30px] mr-[10px] border-[0.5px] bg-slate-900 hover:lg:bg-white text-white lg:text-white lg:hover:text-black w-[70px] h-[30px] text-sm text-center rounded-2xl p-1 px-3"
        >Login</button>        
      <button onClick={()=> { dispatch(SET_LOGIN_WINDOW(false));dispatch(SET_MENU_BTN(false));dispatch(SET_MEMBER_PANEL(true));}}
        className="mt-10 lg:mt-0 border-[0.5px] bg-blue-700 text-white lg:text-black hover:text-white w-[80px] h-[30px] text-sm text-center rounded-2xl p-1 px-3"
        >Sign up</button>
      <Link onClick={()=>{
        if(typeof window != undefined ) {
          if(mode == 'lightMode') {                                    
                  document.cookie = 'mode=darkMode; max-age=' + (3600 * 24 * 400)
                  setMode('darkMode')
                  // console.log(mode)
                  router.refresh()
                  setTimeout(()=> {
                    document.querySelector('.any')?.classList.add('none') // 커버 삭제 display: 'none'
                  }, 100)                                
          } else {
              document.cookie = 'mode=lightMode; max-age=' + (3600 * 24 * 400)
              setMode('lightMode')
              // console.log(mode)
              router.refresh()
              setTimeout(()=> {
                document.querySelector('.any')?.classList.add('none') // 커버 삭제 display: 'none'
              }, 100)
          }
        }  
      }}
        className="ml-[-85px] mr-0 lg:mr-5 mt-5 text-sm block lg:hidden" href="#">Mode: { mode == 'darkMode' ? '🌙' : '🌞' }
      </Link>  
    </div>        
  </nav>   
  <Mobile_btn mode={mode}/>
  </>);
}