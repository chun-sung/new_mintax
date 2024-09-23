'use client'
import { useSelector } from "react-redux";
import PageTop from "@/components/PageTop";
import Seo from "@/components/Seo";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SuccessLogin from "@/components/SuccessLogin";

export default function Mypage() {

    const [inquiry, setInquiry] = useState([])
    const { user }= useSelector(state => state.user);    

    const { isLoading, error, data, postQuery, refetch } = useQuery({
      queryKey: ['inquiry'],        
      queryFn: () =>  fetch(`/api/inquiry`).then(res => res.json()).then( res => { 
          // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
          // console.log(res);
          if(res.msg == 'jwt_fail'){
            console.log('어드민페이지 msg: jwt_fail')
            return 
          } else {
            const {result} = res;
            setInquiry(result);
            console.log(result);          
            return res
          }
                              
      }),        
    })


    return <>
        <SuccessLogin />
        <Seo title='MyPage | MTAX'/>      
        <PageTop />  
        <h1 className="text-center pt-[120px] lg:pt-[200px] text-2xl font-extrabold stop-dragging border-1 border-red-300">관리자 페이지</h1>
        <h2 className="text-center mt-10 text-xl font-semibold"><span className="text-red-400 stop-dragging">{user?.nickname}</span> <span className="text-gray-400 font-base font-normal">님 환영합니다!</span></h2> 


        {isLoading == true ? 
          <div className="text-center mt-[50px] lg:mt-[50px] mb-[800px] p-2 bg-red-00 text-white w-36 rounded-full m-auto">
            <button type="button" className="bg-indigo-00 ..." disabled>
                <svg width="100" className="animate-spin h-[50px]" 
                    height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="44.5" stroke="#A4A3A3" strokeWidth="11"/>
                <path d="M19 10.5L13 17L9.5 21.5L19 26L23 21.5L27 18L32.5 15L39 12.5L45.5 10.5H49.5H55L58.5 1H53.5H49.5H41.5L32.5 3L26.5 6L19 10.5Z" fill="#141313" stroke="black"/>
                </svg>                              
            </button>
          </div>
          : null
        }
        {
          inquiry?.length !== 0 ? <>
            <div className="flex bg-gray-200 m-auto w-[340px] lg:w-[500px] p-2 mt-2 mb-5">
              <div className="text-right mr-2 px-2 py-3">
                <span>상담 요청 : </span><br/>
                <span>     완료 : </span> <br/>
                <span>   대기중 : </span>
              </div>
              <div className="font-semibold py-3">
                <span> {inquiry?.length}</span><br/>
                <span>{inquiry[0]?.total_complete}</span><br/>
                <span>{inquiry[0]?.mis_complete}</span>
              </div>
            </div>
          </> : <><div className="flex bg-gray-200 m-auto w-[340px] lg:w-[500px] p-2 mt-2 mb-5">
                  <div className="text-right mr-2 px-2 py-3">
                    <span>상담 요청 : </span><br/>
                    <span>     완료 : </span> <br/>
                    <span>   대기중 : </span>
                  </div>
                  <div className="font-semibold py-3">
                    <span>0</span><br/>
                    <span>0</span><br/>
                    <span>0</span>
                  </div>
                </div>
                <div  className="flex-none text-center mt-10 mb-10 font-bold text-gray-500"> <span>상담 신청 내역이 없습니다.</span></div></> 
        }
 
        { inquiry?.length !== 0 ? 
           <div className="w-[340px] lg:w-[500px] m-auto mt-0 mb-[30px] bg-red-00">
             <p className="font-bold text-left text-gray-500">NEW</p>
           <div className="w-[340px]  lg:w-[500px] min-h-[200px] m-auto border-gray-400 border-[1px] mt-2">
               <div className="flex ">                
                 <p className="basis-3/4 leading-[170%] lg:leading-[170%] border-b-[1px] border-gray-400 bg-red-300 text-black text-center py-2">
                    {inquiry[inquiry?.length-1]?.title}
                 </p>
                 <p className="basis-1/4 leading-[100%] lg:leading-[100%] border-b-[1px] border-gray-400 bg-red-300 text-black text-center py-2 text-sm">
                    <span className="text-[12px] lg:text-[12px]">{inquiry[inquiry?.length-1]?.regist_date}</span><br/>
                    <span className="text-[12px] lg:text-[12px]">id: {inquiry[inquiry?.length-1]?.user_id}</span>                  
                 </p>
               </div>
               
               <p className="px-3 py-2 text-black mt-5 mb-5">{inquiry[inquiry?.length-1]?.content}</p>
               <hr className="" />
               <p className="px-3 py-2 mt-5 mb-5">(대기중) 
                  <button onClick={()=> alert('미구현 상태 입니다')}
                    className="ml-5 text-white bg-red-400 hover:bg-blue-300  shadow-md rounded px-2">답변하기</button>
                </p>
            </div>
         </div>  : null     
        }
        {
          inquiry?.length == 0 ? null 
          : <div className="w-[340px] lg:w-[500px] m-auto mt-10 mb-[0px] bg-red-00">
              <p className="font-bold ml-2 text-left text-gray-500">상담 내역</p>
            </div>
        }
        
        { inquiry.map(({title, content, regist_date, user_id}, i)=> {
          return <>
           <div key={i} className="w-[340px] lg:w-[500px] m-auto mt-0 mb-[30px] bg-red-00">
              <div className="w-[340px]  lg:w-[500px] min-h-[200px] m-auto border-gray-400 border-[1px] mt-2">
                  <div className="flex ">                
                    <p className="basis-3/4 leading-[170%] lg:leading-[170%] border-b-[1px] border-gray-400 bg-gray-300 text-black text-center py-2">
                       {title} 
                    </p>
                    <p className="basis-1/4 leading-[100%] lg:leading-[100%] border-b-[1px] border-gray-400 bg-gray-300 text-black text-center py-2 text-sm">
                        <span className="text-[12px] lg:text-[12px]">{regist_date}</span><br />
                        <span className="text-[12px] lg:text-[12px]">id: {user_id}</span>                        
                    </p>
                  </div>
                  
                  <p key={i} className="px-3 py-2 text-black mt-5 mb-5">{content}</p>
                  <hr className="" />
                  <p className="px-3 py-2 mt-5 mb-5">(대기중)
                    <button onClick={()=> alert('미구현 상태 입니다')}
                      className="ml-5 text-white bg-red-400 hover:bg-blue-300  shadow-md rounded px-2">답변하기</button>
                  </p>
               </div>
            </div>            
            </>
          })

        }
        <div className="w-[100%] lg:w-[800px] m-auto mt-3"><hr className="block mt-5 w-[80%] lg:w-[100%] m-auto"></hr></div>
  </>
}