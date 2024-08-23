import Link from "next/link";

export default function Navbar() {

  return (<div className="h-[50px] bg-slate-900 text-white lg:block hidden">        
   <div className="w-[1000px] h-full text-center m-auto leading-[50px]">
      <Link className="mr-10 text-xl" href="#">🌞</Link>
      <Link className="mr-10 text-md hover:text-blue-300" href={'/smart'}>SMART서비스</Link>
      <Link className="mr-10 text-md hover:text-blue-300" href={'/himoney'}>고소득자 플랜</Link>
      <Link className="mr-10 text-md hover:text-blue-300" href={'/bubin'}>법인 컨설팅</Link>
      <Link className="mr-10 text-md hover:text-blue-300" href={'/consult'}>세무상담</Link>    
      <Link className="mr-10 text-md hover:text-blue-300" href={'/susu'}>수수료안내</Link>
      <Link className="mr-[90px] text-md hover:text-blue-300" href={'/board'}>게시판</Link>         
      <Link className="border bg-slate-700  hover:text-yellow-300 w-[80px] h-[30px] text-sm text-center rounded-md p-1 px-3" href="/login">Login</Link>
        
    </div>
  </div>);
}