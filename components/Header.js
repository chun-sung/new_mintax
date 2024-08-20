import Image from "next/image";
import Link from "next/link";

export default function Header() {


    return (<div class="bg-red-500">
        <Link href={'/'} className="bg-blue-500">
        <Image
            src="/logo.svg"
            width="100"
            height="90"
            alt="logo"
            class="mt-3 bg-blue-500"
            style={{margin:"auto"}}
        />
        </Link>
    </div>);
      
}
 