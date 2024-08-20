import Link from "next/link";

export default function Smart() {
    return (<>
    <div className="text-center text-2xl">스마트서비스</div>
    <Link className="bg-red-500 hover:bg-blue-500" href={'/'}>Home</Link>
    </>)
}