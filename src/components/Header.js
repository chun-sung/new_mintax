import Image from "next/image";
import Link from "next/link";
import Navbar from "./Navbar";
import Rsidebar from "./Rsidebar";

export default function Header() {

    return (<header className="fixed w-full stop stop-dragging z-50">
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
            <Image className="absolute top-[20px] left-[15px] hover:scale-110 hover:border-[2px] border-red-300 lg:hidden block"
                src="/hamburger.svg"
                width="40"
                height="40"
                alt="menu_button"
            />
    </div>
    <Navbar />
    <Rsidebar />
    </header>);
      
}
 