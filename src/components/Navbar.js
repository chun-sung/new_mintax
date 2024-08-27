"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Navbar() {

  const pathname = usePathname();

  return (<nav className="lg:h-[50px] border rounded bg-white lg:bg-slate-900 lg:text-white lg:block">
   <div className="mt-3 lg:mt-0 lg:w-[1000px] h-full text-center m-auto leading-[50px]">
      <Link className="mr-0 lg:mr-5 text-xl block hidden lg:inline" href="#">🌞</Link>
      <Link href={'/smart'}
        className={clsx("border-b ml-4 lg:ml-0 block text-left lg:inline mr-5 text-md py-1 px-2 lg:rounded-lg lg:border lg:border-black hover:border-gray-500",{
          'lg:bg-slate-600 bg-red-300': pathname === '/smart'
        })}>SMART서비스
      </Link>
      <Link href={'/himoney'} 
        className={clsx("border-b ml-4 lg:ml-0 text-left block lg:inline mr-5 text-md py-1 px-2 lg:rounded-lg lg:border lg:border-black hover:border-gray-500",{
          'lg:bg-slate-600 bg-red-300': pathname === '/himoney'
        })}>고소득자 플랜</Link>
      <Link  href={'/bubin'} 
        className={clsx("border-b ml-4 lg:ml-0 text-left block lg:inline mr-5 text-md py-1 px-2 lg:rounded-lg lg:border lg:border-black hover:border-gray-500",{
          'lg:bg-slate-600 bg-red-300': pathname === '/bubin'
        })}>법인 컨설팅</Link>
      <Link  href={'/consult'} 
        className={clsx("border-b ml-4 lg:ml-0 text-left block lg:inline mr-5 text-md py-1 px-2 lg:rounded-lg lg:border lg:border-black hover:border-gray-500",{
          'lg:bg-slate-600 bg-red-300': pathname === '/consult'
        })}>세무상담</Link>    
      <Link href={'/susu'}
        className={clsx("border-b ml-4 lg:ml-0 text-left block lg:inline mr-5 text-md py-1 px-2 lg:rounded-lg lg:border lg:border-black hover:border-gray-500",{
          'lg:bg-slate-600 bg-red-300': pathname === '/susu'
        })}>수수료안내</Link>
      <Link href={'/board'}
        className={clsx("border-b ml-4 lg:ml-0 text-left block lg:inline mr-5 lg:mr-[50px] text-md py-1 px-2 lg:rounded-lg lg:border lg:border-black hover:border-gray-500",{
          'lg:bg-slate-600 bg-red-300': pathname === '/board'
        })} >게시판</Link>      
      <button className="mt-10 lg:mt-0 mr-[10px] border-[0.5px] bg-gray-300 lg:bg-white text-black hover:text-pink-500 w-[70px] h-[30px] text-sm text-center rounded-2xl p-1 px-3"
        >Login</button>        
      <button className="mt-10 lg:mt-0 border-[0.5px] bg-blue-600 hover:text-gray-300 w-[80px] h-[30px] text-sm text-center rounded-2xl p-1 px-3"
        >Sign up</button>
      <Link className="mr-0 lg:mr-5 mt-5 text-sm block lg:inline lg:hidden" href="#">DarkMode: 🌞</Link>        
    </div>        
  </nav>);
}