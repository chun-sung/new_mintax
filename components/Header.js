import Image from "next/image";
import Link from "next/link";

export default function Header() {

    return (<div className="bg-red-500 border-dashed" style={{"height":"70px"}}>
        <Link href={'/'} className="bg-red-500">
        <Image
            src="/logo.svg"
            width="100"
            height="90"
            alt="logo"
            className=""
            style={{margin:"auto", paddingTop: "10px"}}
        />
        {/* <img
            src="/logo.svg"            
            alt="logo"
            class=""
            style={{margin:"auto"}}
        /> */}
        </Link>
    </div>);
      
}
 