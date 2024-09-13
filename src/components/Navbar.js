"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { SET_MENU_BTN, SET_CONSULTING_PANEL ,SET_LOGIN_WINDOW, SET_MEMBER_PANEL, SET_LOGOUT } from  "../redux/reducers/userSlice";
import { useRouter } from "next/navigation";
import Mobile_btn from "./Mobile_btn";
import Image from "next/image";
import axios from "axios";
import SuccessLogin from "./SuccessLogin";

export default function Navbar({mode, setMode}) {

  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch()
  const pathname = usePathname();
  const router = useRouter();

  return (<>
    <SuccessLogin />
    <div className={mode !== 'darkMode' ? "relative h-[60px] lg:h-[75px] w-full m-auto bg-white border-b border-gray" :
        "relative h-[60px] lg:h-[75px] w-full m-auto bg-black border-b-0 lg:border-b-0 border-gray" 
      }> 
        <div className="relative m-auto w-[80px] pt-2.5 lg:pt-5">
            <Link href="/">
            {
                mode == 'darkMode' ?
                <Image onClick={()=>{
                  dispatch(SET_LOGIN_WINDOW(false))
                  dispatch(SET_MEMBER_PANEL(false))
                  dispatch( SET_MENU_BTN(false))
                }}
                    src="/logo_white.svg"
                    width="80"
                    height="60"
                    alt="logo"
                    className="m-auto"            
                />
                :
                <Image onClick={()=>{
                  dispatch(SET_LOGIN_WINDOW(false))
                  dispatch(SET_MEMBER_PANEL(false))
                  dispatch( SET_MENU_BTN(false))
                }}
                    src="/logo.svg"
                    width="80"
                    height="60"
                    alt="logo"
                    className="m-auto"            
                  />
            }
            </Link>
            { user.user_id !== null ?
              <span className="absolute lg:hidden bottom-[-1px] left-[130px] lg:left-[430px] text-blue-500 
                  border-[1px] px-2 rounded-md text-sm">{user.user_id}</span>
                :
              <span className="absolute lg:hidden bottom-[-3px] left-[130px] lg:left-[430px] text-gray-400 
                  px-2 rounded-md text-sm">Guest</span>
            }            
        </div>
    </div> 
    <nav className={user.menu !== true  ? `hidden lg:block  lg:bg-slate-900 lg:text-white start lg:opacity-100` : 
      `${mode !== 'darkMode' ? 'bg-slate-100 lg:h-[50px] border lg:border-0 rounded lg:bg-slate-900 lg:text-white lg:block start end' :'bg-gray-800 text-white lg:h-[50px] border lg:border-0 rounded lg:bg-slate-900 lg:text-white lg:block start end' }`}>
    <div className="mt-3 lg:mt-0 lg:w-[1000px] text-center m-auto leading-[48px]">
        <Link onClick={()=>{
          if(typeof window != undefined ) {
            if(mode == 'lightMode') {                                    
                    document.cookie = 'mode=darkMode; max-age=' + (3600 * 24 * 400)
                    setMode('darkMode')
                    // console.log(mode)
                    setTimeout(()=> {
                      document.querySelector('.any')?.classList.add('none') // 커버 삭제 display: 'none'
                      router.refresh()                    
                    }, 100)                                
            } else {
                document.cookie = 'mode=lightMode; max-age=' + (3600 * 24 * 400)
                setMode('lightMode')
                // console.log(mode)
                setTimeout(()=> {
                  document.querySelector('.any')?.classList.add('none') // 커버 삭제 display: 'none'
                  router.refresh()                
                }, 100)
            }
          }  
        }}
          className="mr-0 align-middle lg:mr-5 text-xl hidden lg:inline-block" href="#">{ mode == 'darkMode' ? '🌙' : '🌞' }</Link>
        <Link href={'/smart'} onClick={()=> {dispatch(SET_MENU_BTN(false))}}
          className={clsx("border-b lg:border-0 ml-4 lg:ml-0 block text-left lg:inline mr-5 text-md py-1 px-2 lg:rounded-lg lg:border-1 lg:border-black lg:hover:border-gray-500 lg:hover:bg-slate-700",{
            'lg:bg-white bg-gray-200 lg:hover:bg-white text-black': pathname === '/smart'
          })}>스마트서비스
        </Link>
        <Link href={'/himoney'} onClick={()=> {dispatch(SET_MENU_BTN(false))}}
          className={clsx("border-b lg:border-0 ml-4 lg:ml-0 text-left block lg:inline mr-5 text-md py-1 px-2 lg:rounded-lg lg:border-1 lg:border-black lg:hover:border-gray-500 lg:hover:bg-slate-700",{
            'lg:bg-white bg-gray-200 lg:hover:bg-white text-black': pathname === '/himoney'
          })}>고소득자플랜</Link>
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
          })}>고객게시판</Link>
        { user.user_id !== null ? 
          <Link href={'/mypage'} onClick={()=> {dispatch(SET_MENU_BTN(false))}}
            className={clsx("font-bold  text-red-400 lg:hidden border-b lg:border-0 lg:border-0v ml-4 lg:ml-0 text-left block mr-5 lg:mr-[50px] text-md py-1 px-2 lg:rounded-lg lg:border-1 lg:border-black lg:hover:border-gray-500 lg:hover:bg-slate-700",{
              'lg:bg-white bg-gray-200 lg:hover:bg-white text-red-400': pathname === '/mypage'
          })}>My Page</Link> : null
        }
          
        {
          user.user_id !== null ? 
            // <p onClick={()=>{ router.push('/mypage')}} 
            //   className={`h-10 w-[10px] ml-[-45px] lg:ml-[5px] text-sm text-red-500 lg:hover:bg-slate-700 inline border-gray-600 border-[1px]  rounded-l-xl p-1`}>
            //     <span className="text-blue-400 px-1 text-[12px]">{user.user_id}</span>
            // </p>
            <button onClick={()=>{ router.push('/mypage')}} 
              className={`inline-block h-10 w-[px] h-[27px] ml-[-45px] lg:ml-[5px] text-sm text-red-500 lg:hover:bg-slate-700 inline border-gray-400 lg:border-gray-600 border-[0px] lg:border-[1px] rounded-l-xl p-1`}>
                <span className="text-blue-400 px-1 text-[16px] leading-[15px]">{user.user_id}</span>
            </button>
            :
          <p className={`h-10 w-[10px] ml-[115px] lg:hidden`}>Guest</p>
        }
        {
          user.user_id !== null ? 
          <button onClick={()=>{
              if(confirm('로그아웃 하시겠습니까?')) {
                axios({
                    url:"http://localhost:3005/api/logout",
                    method: "POST",
                    withCredentials: true,
                }).then((res) => {
                    if(res.data.msg == 'success') {
                        dispatch(SET_LOGOUT(null));
                        dispatch(SET_CONSULTING_PANEL(false));
                        dispatch(SET_MENU_BTN(false));
                        console.log('로그아웃 성공')
                        router.push('/')
                    }
                }).catch(err => console.log(err))
              }}}
            // className="mt-[10px] lg:mt-0 ml-[0px] mr-[0px] border-[1px] border-1 bg-slate-000 hover:bg-white text-black lg:font-light lg:text-white lg:hover:text-red-300 w-[70px] h-[0px] text-[12px] text-center rounded-2xl"
            className="border-[1px] border-slate-600 shadow-md border-black border-[1px] lg:border-[1px] mt-5 lg:mt-0 text-[16px] lg:text-[14px] rounded-r-xl
                     bg-slate-600 lg:bg-slate-900 text-white h-[27px] px-2 p-0 leading-[23px] lg:leading-[28px] lg:hover:bg-slate-700"
            >logout
            </button>
          :<>
            <button onClick={()=> { dispatch(SET_LOGIN_WINDOW(true));dispatch(SET_MENU_BTN(false));dispatch(SET_MEMBER_PANEL(false));}}
              className="mt-0 lg:mt-0 min-w-[70px] ml-[-49px] lg:ml-[-5px] mr-[0px] lg:hover:bg-slate-700 text-blue-400 lg:text-blue-400  w-[65px] h-[27px] text-[16px] text-center rounded-l-xl
                       border-[1px] border-gray-400 lg:border-gray-400 lg:border-gray-700 leading-[20px] shadow-md"
              >login</button>        
            <button onClick={()=> { dispatch(SET_LOGIN_WINDOW(false));dispatch(SET_MENU_BTN(false));dispatch(SET_MEMBER_PANEL(true));}}
              className="ml-[-1px] lg:ml-[0px] mt-0 lg:mt-0 lg:bg-slate-000 text-red-400 lg:text-white w-[70px] h-[27px] text-[16px] text-center rounded-r-xl
                       border-[1px] border-gray-400 lg:border-gray-400 lg:border-gray-700 lg:hover:bg-slate-700 leading-[20px] shadow-md"
              >sign up</button>
          </>
        }
        <Link onClick={()=>{
          if(typeof window != undefined ) {
            if(mode == 'lightMode') {                                    
                    document.cookie = 'mode=darkMode; max-age=' + (3600 * 24 * 400)
                    setMode('darkMode')
                    // console.log(mode)
                    setTimeout(()=> {
                      document.querySelector('.any')?.classList.add('none')      // 커버 삭제 display: 'none'
                      document.querySelector('body')?.classList.add('darkMode')  // 다크모드 클래스 추가
                      router.refresh();                  
                    }, 100)                                
            } else {
                document.cookie = 'mode=lightMode; max-age=' + (3600 * 24 * 400)
                setMode('lightMode')
                // console.log(mode)
                setTimeout(()=> {
                  document.querySelector('.any')?.classList.add('none') // 커버 삭제 display: 'none'
                  document.querySelector('body')?.classList.remove('darkMode') // 다크모드 클래스 추가
                  router.refresh();                       
                }, 100)
            }
          }  
        }}
          className="ml-[20px] w-[180px] mr-0 lg:mr-5 mt-5 text-sm block lg:hidden" href="#">mode: <span
          className={ mode !== 'darkMode' ? `ml-1 border-[1px] border-gray-400 bg-gray-300 px-3 py-[3px] rounded-2xl` 
          : `ml-1 border-[1px] border-gray-400 bg-black px-3 py-[3px] rounded-2xl` }>{ mode == 'darkMode' ? '🌙' : '🌞' }</span>
        </Link>  
      </div>
      <div>
        <p className="mt-[40px] ml-[-40px] text-center text-sm">Test Account :</p> 
        <p className="ml-[-50px] text-center text-[14px]">test / 1234</p>
      </div> 
    </nav>   
    <Mobile_btn mode={mode}/>
  </>);
}