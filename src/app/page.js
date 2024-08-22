import Image from "next/image";
import { db } from '@vercel/postgres'


export default async function Home() {
  const data = await db`SELECT * FROM users`;
  let { rows }  =  data 
  console.log(rows[0].name);

  return (
    <main className="">
      <div className="bg-[url('/main_bg.png')] w-1200 m-auto h-72 lg:max-w-[1920px] lg:h-[585px] bg-left-bottom lg:bg-top lg:bg-cover lg:bg-no-repeat relative z-0 stop-dragging">
      <div className="m-auto  lg:w-[1000px] p-1 h-full pt-[110px] lg:pt-[350px]">
            <p className="font-bold bottom-[85px] text-center lg:text-left m-auto lg:left-[340px] text-black text-3xl lg:text-5xl lg:leading-[130%] lg:tracking-[0px] mb-10">
              <span className="inline text-gray-200">내 손안의</span> <span className="inline text-blue-500">SMART</span><br/><span className="inline text-gray-200">세무 회계</span> <span className="inline text-red-500">MinTAX</span>
            </p>
            <p className="text-center lg:text-left lg:left-[340px] text-white text-sm lg:text-lg  lg:leading-[150%]">
              모바일 앱 하나로 사업현황을 실시간으로 관리<br/>스마트한 서비스제공
            </p>
          </div>          
      </div>

      <div className="wrapper w-full lg:w-[1200px] m-auto text-center">        

        <div className=" leading-[160%] lg:leading-[140%] tracking-[-2px] lg:tracking-[-4px] lg:h-[360px]">  
          <div className="w-full lg:max-w-[870px] m-auto mt-0 relrative lg:pt-[92px] ">
            <p className="text-xl lg:text-4xl w-[340px] lg:w-full mt-0 lg:ml-[10px] m-auto tracking-[-2px] lg:tracking-[-3px]">매달 인출되는 기장료, 제대로 된 서비스를 받고 계신가요?</p>              
            <p className="mt-10 lg:mt-0 text-xl lg:text-4xl  mb-10 w-[280px] lg:w-full m-auto lg:mb-10"><span className="text-md lg:min-w-[800px]"><span className="text-blue-600 font-bold">실시간 사업현황 관리</span>가 가능한 MinTAX <span className="text-blue-600 font-bold">스마트 기장 서비스</span></span></p>
            
            <p className="px-10 text-center lg:text-center  leading-[180%] mb-0 lg:mb-0 text-[13px] lg:text-lg font-semibold text-gray-500 tracking-[0px]">APP설치 하나로 금융거래내역 관리, 카드매출매입 관리, 경영리포트,<br />
              세금납부내역조회 등 사업장 현황을 실시간으로 관리
            </p>
          </div> 
        </div>

        <hr className="text-center w-[300px] lg:w-[800px] m-auto my-20" />

        <div className="m-auto lg:flex lg:justify-between items-center lg:w-[1200px] px-14 lg:h-[360px]">
          <div className="">
            <img className="w-[350px] m-auto lg:w-[400px] h-40 lg:h-50" src="/money.png"/>
          </div>
          <div className="mt-0 lg:mt-0  ">
            <p className="text-sm lg:text-3xl mt-10 lg:mt-0 ml-0 lg:ml-0 text-center lg:text-left "><span className="text-blue-600 font-bold lg:leading-[140%]">경영리포트</span>를 통해 <span className="text-blue-600 font-bold">사업장현황</span>을<br/> 실시간으로 파악하세요</p>
            <p className="text-[13px] mt-5 lg:text-base lg:ml-0 mb-0 text-gray-500 font-semibold"><span className="block lg:inline">매출매입잔액, 계좌잔액, 채권잔액, 월별 매출매입증감내역 등을</span><br />실시간으로 조회하여 사업장현황을 한눈에 확인할 수 있습니다.</p>
          </div>
        </div> 
        
        <hr className="text-center w-[300px] lg:w-[800px] m-auto my-20 bg-red-300" />

        {/* 중심점 확인 */}
        {/* <div className="border-2 border-black w-5 ml-[630px] absolute m-auto" ></div> */}

        <div className="px-3 lg:px-14 lg:flex lg:justify-between items-center w-full lg:w-[1200px] m-auto leading-[180%] text-[#333333] lg:h-[360px]">
          <div className="">
            <p className="text-center lg:text-left lg:w-[500px] text-sm lg:text-3xl lg:leading-[140%]">금융 거래 내역, 카드채권내역,<br/><span className="text-blue-600 font-bold">세금이력</span> 간편하게 확인하세요</p>
            <p className="text-center lg:text-left mt-10 mb-3 text-[12px] lg:text-[14px] font-bold text-gray-500 ">– 은행잔액과 거래내역 이젠 일일이 조회 할 필요 없습니다.<br /> 간편한 앱 터치 하나로 실시간으로 한 눈에 확인할 수 있습니다.</p>
            <p className="text-center lg:text-left text-[12px] mb-3 lg:text-[14px] font-bold text-gray-500">– 카드채권의 일별 승인액과 입금 예정내역을 간편히 조회해보세요.</p>
            <p className="text-center lg:text-left text-[12px]  lg:text-[14px] font-bold text-gray-500">– 세금이력 조회를 위해 담당세무대리인에게 연락할 필요가 없습니다.<br/>기납부내역, 고지내역, 체납내역, 환급내역을 확인할 수 있습니다.</p>
          </div>
          <div className="mt-20 lg:mt-0 lg:w-[400px] mr-0 lg:mr-16">
            <img src="/phone1.png"/>
          </div>

        </div>
        <hr className="text-center w-[300px] lg:w-[800px] m-auto my-20" />
        {/* <div className="h-[2000px] bg-white "></div> */}

      </div> 

    </main>
  );
}
