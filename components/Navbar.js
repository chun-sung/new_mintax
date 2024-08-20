import Link from "next/link";

export default function Navbar() {

    return (<div className="bg-red-800 w-[full] h-[200px]">        
        <Link  className="block hover:bg-red-500 mr-2" href={'/smart'}>SMART서비스</Link>
        <Link  className="block hover:bg-red-500 mr-2" href={'/'}     >고소득자 플랜</Link>
        <Link  className="block hover:bg-red-500 mr-2" href={'/'}     >법인 컨설팅</Link>
        <Link  className="block hover:bg-red-500 mr-2" href={'/'}     >세무상담</Link>    
        <Link  className="block hover:bg-red-500 mr-2" href={'/'}     >수수료안내</Link>
        <Link  className="block hover:bg-red-500 mr-2" href={'/'}     >게시판</Link>         
    </div>);
}