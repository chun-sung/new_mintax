import Image from "next/image";
import { db } from '@vercel/postgres'
import Consulting from "@/components/Consulting";

export default async function Home() {
  // const data = await db`SELECT * FROM members`;
  // let { rows }  =  data 
  // console.log('메인 페이지',rows[0].user_id);

  return (<>
    <main className="z-0 lg:pt-[110px] start2">    
      <div className="bg-[url('/main_bg.png')] w-1200 m-auto h-72 lg:max-w-[1920px] lg:h-[585px] bg-left-bottom lg:bg-top lg:bg-cover lg:bg-no-repeat relative stop-dragging z-0">
      <div className="m-auto  lg:w-[1000px] p-1 h-full pt-[140px] lg:pt-[350px]">
            <p className="font-bold bottom-[85px] text-center lg:text-left m-auto lg:left-[340px] text-black text-3xl lg:text-5xl lg:leading-[130%] lg:tracking-[0px] mb-10">
              <span className="inline text-gray-200">내 손안의</span> <span className="inline text-blue-500">SMART</span><br/><span className="inline text-gray-200">세무 회계</span> <span className="inline text-red-500">MinTAX</span>
            </p>
            <p className="text-center lg:text-left lg:left-[340px] text-white text-sm lg:text-lg  lg:leading-[150%] lg:block hidden">
              모바일 앱 하나로 사업현황을 실시간으로 관리<br/>스마트한 서비스제공
            </p>
          </div>          
      </div>

      <div className="wrapper w-full lg:w-[1200px] m-auto text-center">        

        <div className=" leading-[160%] lg:leading-[140%] tracking-[-2px] lg:tracking-[-3px] lg:h-[360px]">  
          <Consulting />
          <div className="w-full lg:max-w-[870px] m-auto mt-0 relrative lg:pt-[92px] ">
            <p className="text-xl lg:text-4xl w-[340px] lg:w-full mt-0 lg:ml-[10px] m-auto tracking-[-2px] lg:tracking-[-2px] pt-10">매달 인출되는 기장료, 제대로 된 서비스를 받고 계신가요?</p>              
            <p className="mt-10 lg:mt-0 text-xl lg:text-4xl  mb-10 w-[280px] lg:w-full m-auto lg:mb-10"><span className="text-md lg:min-w-[800px]"><span className="text-blue-600 font-bold">실시간 사업현황 관리</span>가 가능한 MinTAX <span className="text-blue-600 font-bold">스마트 기장 서비스</span></span></p>
            
            <p className="px-10 text-center lg:text-center  leading-[180%] mb-0 lg:mb-0 text-[13px] lg:text-lg font-semibold text-gray-500 tracking-[0px]">APP설치 하나로 금융거래내역 관리, 카드매출매입 관리, 경영리포트,<br />
              세금납부내역조회 등 사업장 현황을 실시간으로 관리
            </p>
          </div> 
        </div>

        <hr className="text-center w-[300px] lg:w-[900px] m-auto my-20 bg-gray-300 h-[2px]" />

        <div className="m-auto lg:flex lg:justify-between items-center lg:w-[1200px] px-14 lg:h-[360px]">
          <div className="">            
            <Image width={"400"} height={"200"} className="w-[350px] m-auto lg:w-[400px] h-40 lg:h-50" src="/money.png"/>
          </div>
          <div className="mt-0 lg:mt-0  ">
            <p className="text-sm lg:text-3xl mt-10 lg:mt-0 ml-0 lg:ml-0 text-center lg:text-left "><span className="text-blue-600 font-bold lg:leading-[140%]">경영리포트</span>를 통해 <span className="text-blue-600 font-bold">사업장현황</span>을<br/> 실시간으로 파악하세요</p>
            <p className="text-[13px] mt-5 lg:text-base lg:ml-0 mb-0 text-gray-500 font-semibold"><span className="block lg:inline">매출매입잔액, 계좌잔액, 채권잔액, 월별 매출매입증감내역 등을</span><br />실시간으로 조회하여 사업장현황을 한눈에 확인할 수 있습니다.</p>
          </div>
        </div> 
        
        <hr className="text-center w-[300px] lg:w-[900px] m-auto my-20 bg-gray-300 h-[2px]" />

        {/* 중심점 확인 */}
        {/* <div className="border-2 border-black w-5 ml-[630px] absolute m-auto" ></div> */}

        <div className="px-3 lg:px-14 lg:flex lg:justify-between items-center w-full lg:w-[1200px] m-auto leading-[180%] text-[#333333] lg:h-[360px]">
          <div className="">
            <p className="text-center lg:text-left lg:w-[500px] text-sm lg:text-3xl lg:leading-[140%]">금융 거래 내역, 카드채권내역,<br/><span className="text-blue-600 font-bold">세금이력</span> 간편하게 확인하세요</p>
            <p className="text-center lg:text-left mt-10 mb-3 text-[12px] lg:text-[14px] font-bold text-gray-500 ">– 은행잔액과 거래내역 이젠 일일이 조회 할 필요 없습니다.<br /> 간편한 앱 터치 하나로 실시간으로 한 눈에 확인할 수 있습니다.</p>
            <p className="text-center lg:text-left text-[12px] mb-3 lg:text-[14px] font-bold text-gray-500">– 카드채권의 일별 승인액과 입금 예정내역을 간편히 조회해보세요.</p>
            <p className="text-center lg:text-left text-[12px]  lg:text-[14px] font-bold text-gray-500">– 세금이력 조회를 위해 담당세무대리인에게 연락할 필요가 없습니다.<br/>기납부내역, 고지내역, 체납내역, 환급내역을 확인할 수 있습니다.</p>
          </div>
          <div className="mt-20 lg:mt-0 lg:w-[400px] mr-0 lg:mr-16 pb-10">            
            <Image width={"400"} height={"200"} src="/phone1.png"/>
          </div>

        </div>
        <hr className="text-center w-[300px] lg:w-[900px] m-auto my-20 bg-gray-300 h-[2px]" />        

      </div> 

      <section className="text-gray-600 body-font">
        <div className="container px-5 pb-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Our Team</h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table. Franzen you probably haven't heard of them.</p>
          </div>
          <div className="flex flex-wrap -m-2">
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://dummyimage.com/80x80"/>
                <div className="flex-grow">
                  <h2 className="text-gray-900 title-font font-medium">Holden Caulfield</h2>
                  <p className="text-gray-500">UI Designer</p>
                </div>
              </div>
            </div>
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://dummyimage.com/84x84"/>
                <div className="flex-grow">
                  <h2 className="text-gray-900 title-font font-medium">Henry Letham</h2>
                  <p className="text-gray-500">CTO</p>
                </div>
              </div>
            </div>
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://dummyimage.com/88x88"/>
                <div className="flex-grow">
                  <h2 className="text-gray-900 title-font font-medium">Oskar Blinde</h2>
                  <p className="text-gray-500">Founder</p>
                </div>
              </div>
            </div>
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://dummyimage.com/90x90"/>
                <div className="flex-grow">
                  <h2 className="text-gray-900 title-font font-medium">John Doe</h2>
                  <p className="text-gray-500">DevOps</p>
                </div>
              </div>
            </div>
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://dummyimage.com/94x94"/>
                <div className="flex-grow">
                  <h2 className="text-gray-900 title-font font-medium">Martin Eden</h2>
                  <p className="text-gray-500">Software Engineer</p>
                </div>
              </div>
            </div>
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://dummyimage.com/98x98"/>
                <div className="flex-grow">
                  <h2 className="text-gray-900 title-font font-medium">Boris Kitua</h2>
                  <p className="text-gray-500">UX Researcher</p>
                </div>
              </div>
            </div>
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://dummyimage.com/100x90"/>
                <div className="flex-grow">
                  <h2 className="text-gray-900 title-font font-medium">Atticus Finch</h2>
                  <p className="text-gray-500">QA Engineer</p>
                </div>
              </div>
            </div>
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://dummyimage.com/104x94"/>
                <div className="flex-grow">
                  <h2 className="text-gray-900 title-font font-medium">Alper Kamu</h2>
                  <p className="text-gray-500">System</p>
                </div>
              </div>
            </div>
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://dummyimage.com/108x98"/>
                <div className="flex-grow">
                  <h2 className="text-gray-900 title-font font-medium">Rodrigo Monchi</h2>
                  <p className="text-gray-500">Product Manager</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </>);
}
