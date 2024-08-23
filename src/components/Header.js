import Image from "next/image";
import Link from "next/link";

export default function Header() {

    return (<div className="h-[60px] xl:w-[1000px] m-auto" > 
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
            <Image className="absolute top-[20px] left-[15px] hover:scale-110 lg:hidden block"
                src="/hamburger.svg"
                width="40"
                height="40"
                alt="menu_button"
            />
    </div>);
      
}
 