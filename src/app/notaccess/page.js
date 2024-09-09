import PageTop from "@/components/PageTop";
import Seo from "@/components/Seo";

export default function NotAccess () {

    return <>
    <Seo title="NotAccess | MinTAX" />
    <PageTop />  
    <h1 className="text-center pt-[200px] text-2xl text-red-500 font-extrabold stop-dragging">접근 권한이 없습니다!</h1>
    <div className="h-screen"></div>
    </>
}