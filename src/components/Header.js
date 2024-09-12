'use client'
import Navbar from "./Navbar";
import Rsidebar from "./Rsidebar";
import Login from "./Login";
import Modal from "./Modal";
import MemPanel from "./MemPanel";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Mobile_btn from "./Mobile_btn";

export default function Header() {
    
  const [mode, setMode] = useState('')   
  const router = useRouter();

// 쿠키에 최초 라이트 모드 값을 셋팅 한다.
  useEffect(()=> {
    setMode(('; '+document.cookie).split(`; mode=`).pop().split(';')[0])     // mode 가 없으면 '' 리턴 됨                

    // console.log(('; '+document.cookie).split(`; mode=`).pop().split(';')[0])

    // 초기값 비교는 state 함수가 비동기라 비교하여 적용할 수 없다. 비교는 쿠키에 직접 접근하는 코드로 비교해야 한다.
    if(('; '+document.cookie).split(`; mode=`).pop().split(';')[0] == '' || ('; '+document.cookie).split(`; mode=`).pop().split(';')[0] == 'lightMode') {
        document.cookie = 'mode=lightMode; max-age=' + (3600 * 24 * 400)
        setMode('lightMode')        
    } else {
        // document.cookie = 'mode=darkMode; max-age=' + (3600 * 24 * 400)
        setMode('darkMode')        
    }
  },[])

  return (<>
  <Modal />
  <header className="fixed w-full stop stop-dragging z-50">         
      <Mobile_btn />
      <Navbar mode={mode} setMode={setMode} />
      <Login mode={mode} />             
      <MemPanel mode={mode} />
      <Rsidebar />    
  </header>
  </>);
      
}
 