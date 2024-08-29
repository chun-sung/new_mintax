import Image from "next/image";
import Link from "next/link";
import Navbar from "./Navbar";
import Rsidebar from "./Rsidebar";
import Mobile_btn from "./Mobile_btn";
import Login from "./Login";
import Modal from "./Modal";

export default function Header() {

    return (<>
    <Modal />
    <header className="fixed w-full stop stop-dragging z-50">
        <div className="h-[60px] w-full m-auto bg-white border-b border-gray" > 
            <div className="m-auto w-[80px] pt-2.5">
                <Link href="/">
                <Image
                    src="/logo.svg"
                    width="80"
                    height="60"
                    alt="logo"
                    className="m-auto"            
                />
                </Link>
            </div>
        </div>        
        <Mobile_btn />
        <Navbar />
        <Login />
        <Rsidebar />    
    </header>
    </>);
      
}
 