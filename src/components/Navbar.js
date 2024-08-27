"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Navbar() {

  const pathname = usePathname();

  return (<div className="h-[50px] bg-slate-900 text-white lg:block hidden">
   <div className="w-[1000px] h-full text-center m-auto leading-[50px]">
      <Link className="mr-5 text-xl" href="#">🌞</Link>
      <Link href={'/smart'}
        className={clsx("mr-5 text-md py-1 px-2 rounded-lg border border-black hover:border-gray-500",{
          'bg-slate-600': pathname === '/smart'
        })}>SMART서비스
      </Link>
      <Link href={'/himoney'} 
        className={clsx("mr-5 text-md py-1 px-2 rounded-lg border border-black hover:border-gray-500",{
          'bg-slate-600': pathname === '/himoney'
        })}>고소득자 플랜</Link>
      <Link  href={'/bubin'} 
        className={clsx("mr-5 text-md py-1 px-2 rounded-lg border border-black hover:border-gray-500",{
          'bg-slate-600': pathname === '/bubin'
        })}>법인 컨설팅</Link>
      <Link  href={'/consult'} 
        className={clsx("mr-5 text-md py-1 px-2 rounded-lg border border-black hover:border-gray-500",{
          'bg-slate-600': pathname === '/consult'
        })}>세무상담</Link>    
      <Link href={'/susu'}
        className={clsx("mr-5 text-md py-1 px-2 rounded-lg border border-black hover:border-gray-500",{
          'bg-slate-600': pathname === '/susu'
        })}>수수료안내</Link>
      <Link href={'/board'}
        className={clsx("mr-[50px] text-md py-1 px-2 rounded-lg border border-black hover:border-gray-500",{
          'bg-slate-600': pathname === '/board'
        })} >게시판</Link>      
      <button className="mr-[10px] border-[0.5px] bg-white text-black hover:text-pink-500 w-[70px] h-[30px] text-sm text-center rounded-2xl p-1 px-3"
        >Login</button>        
      <button className="border-[0.5px] bg-blue-600 hover:text-gray-300 w-[80px] h-[30px] text-sm text-center rounded-2xl p-1 px-3"
        >Sign up</button>        
    </div>        
  </div>);
}