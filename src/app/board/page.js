'use client'
import BoardList from "./BoardList";
import Seo from "@/components/Seo";
import PageTop from "@/components/PageTop";

export default function Board() {
  
  return <>
    <Seo title='게시판-MinTAX'/>
    {/* <PageTop />         */}
    <h1 className="text-center pt-[110px] lg:pt-[200px] text-2xl stop-dragging">고객 게시판</h1>

      <BoardList />

    </>
}