import Image from "next/image";
import Link from "next/link";

export default function Header() {

    return (<div className="h-[60px] w-[1000px] m-auto" > 
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
    </div>);
      
}
 