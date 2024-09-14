'use client'
import { useSelector } from "react-redux";
import PageTop from "@/components/PageTop";
import Seo from "@/components/Seo";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

export default function Mypage() {

    const [inquiry, setInquiry] = useState([])
    const { user }= useSelector(state => state.user);    

    const { isLoading, error, data, postQuery, refetch } = useQuery({
      queryKey: ['inquiry'],        
      queryFn: () =>  fetch(`/api/inquiry`).then(res => res.json()).then( res => { 
          // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
          // console.log(res);
          const {result} = res;
          setInquiry(result);
          console.log(result);          
          return res
      }),        
    })


    return <>
        {/* <SuccessLogin /> */}
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
          inquiry.length !== 0 ? <>
            <div className="flex bg-gray-200 m-auto w-[340px] lg:w-[500px] bg-gray-100 p-2 mt-2 mb-5">
              <div className="text-right mr-2 px-2 py-3">
                <span>상담 요청 : </span><br/>
                <span>     완료 : </span> <br/>
                <span>   대기중 : </span>
              </div>
              <div className="font-semibold py-3">
                <span> {inquiry[0]?.total}</span><br/>
                <span>{inquiry[0]?.total_complete}</span><br/>
                <span>{inquiry[0]?.mis_complete}</span>
              </div>
            </div>
          </> : <><div className="flex bg-gray-200 m-auto w-[340px] lg:w-[500px] bg-gray-100 p-2 mt-2 mb-5">
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
        { inquiry.length !== 0 ?           
          <div className="w-[340px] lg:w-[500px] m-auto mt-10 mb-[80px] bg-red-00">
            <p className="font-bold text-left text-gray-500">NEW</p>
            <div className="w-[340px] h-[30px] leading-[100%] lg:w-[500px] min-h-[200px] m-auto border-gray-400 border-[1px] mt-2">
            <div className="flex ">  
                <p className="basis-3/4 border-b-[1px] border-gray-400 leading-[170%] lg:leading-[170%] bg-red-300 text-black text-center py-2">
                    {inquiry[inquiry?.length-1]?.title} 
                </p>
                <p className="basis-1/4 leading-[100%] lg:leading-[170%] border-b-[1px] border-gray-400 bg-red-300 text-black text-center py-2 text-sm">
                  <span className="text-[12px] lg:text-[12px]">{inquiry[inquiry?.length-1]?.regist_date}</span>
                </p>
            </div>
                <p className="px-3 py-2 text-black mt-5 mb-5">{inquiry[inquiry?.length-1]?.content}</p>
                <hr className="" />
                <p className="px-3 py-2 mt-5 mb-5">답변 : (대기중) </p>
              </div>
          </div>  : null
        }
        {
          inquiry.length == 0 ? null 
          : <div className="w-[340px] lg:w-[500px] m-auto mt-10 mb-[0px] bg-red-00">
              <p className="font-bold ml-2 text-left text-gray-500">상담 내역</p>
            </div>
        }
        
        { inquiry.map(({title, content, regist_date}, i)=> {
          return <>
           <div key={i} className="w-[340px] lg:w-[500px] m-auto mt-0 mb-[30px] bg-red-00">
              <div className="w-[340px]  lg:w-[500px] min-h-[200px] m-auto border-gray-400 border-[1px] mt-2">
                  <div className="flex ">                
                    <p className="basis-3/4 min-h-[30px] leading-[170%] lg:leading-[170%] border-b-[1px] border-gray-400 bg-gray-300 text-black text-center py-2">
                       {title} 
                    </p>
                    <p className="basis-1/4 min-h-[30px] leading-[100%] lg:leading-[170%] border-b-[1px] border-gray-400 bg-gray-300 text-black text-center py-2 text-sm">
                        <span className="text-[12px] lg:text-[12px]">{regist_date}</span>
                    </p>
                  </div>
                  
                  <p key={i} className="px-3 py-2 text-black mt-5 mb-5">{content}</p>
                  <hr className="" />
                  <p className="px-3 py-2 mt-5 mb-5">답변 : (대기중) </p>
               </div>
            </div>            
            </>
          })

        }
        <div className="w-[100%] lg:w-[800px] m-auto mt-3"><hr className="block mt-5 w-[80%] lg:w-[100%] m-auto"></hr></div>


        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-20">
                <h1 className="sm:text-2xl text-xl font-medium title-font mb-4 text-gray-900">고객 서비스 지원</h1>
                <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table. Franzen you probably haven't heard of them man bun deep jianbing selfies heirloom.</p>
                </div>
                <div className="flex flex-wrap -m-4">
                <div className="lg:w-1/3 sm:w-1/2 p-4">
                    <div className="flex relative">
                    <img alt="gallery" className="absolute inset-0 w-full h-full object-cover object-center" src="https://dummyimage.com/600x360"/>
                    <div className="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100">
                        <h2 className="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1">THE SUBTITLE</h2>
                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3">Shooting Stars</h1>
                        <p className="leading-relaxed">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.</p>
                    </div>
                    </div>
                </div>
                <div className="lg:w-1/3 sm:w-1/2 p-4">
                    <div className="flex relative">
                    <img alt="gallery" className="absolute inset-0 w-full h-full object-cover object-center" src="https://dummyimage.com/601x361"/>
                    <div className="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100">
                        <h2 className="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1">THE SUBTITLE</h2>
                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3">The Catalyzer</h1>
                        <p className="leading-relaxed">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.</p>
                    </div>
                    </div>
                </div>
                <div className="lg:w-1/3 sm:w-1/2 p-4">
                    <div className="flex relative">
                    <img alt="gallery" className="absolute inset-0 w-full h-full object-cover object-center" src="https://dummyimage.com/603x363"/>
                    <div className="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100">
                        <h2 className="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1">THE SUBTITLE</h2>
                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3">The 400 Blows</h1>
                        <p className="leading-relaxed">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.</p>
                    </div>
                    </div>
                </div>
                <div className="lg:w-1/3 sm:w-1/2 p-4">
                    <div className="flex relative">
                    <img alt="gallery" className="absolute inset-0 w-full h-full object-cover object-center" src="https://dummyimage.com/602x362" />
                    <div className="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100">
                        <h2 className="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1">THE SUBTITLE</h2>
                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3">Neptune</h1>
                        <p className="leading-relaxed">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.</p>
                    </div>
                    </div>
                </div>
                <div className="lg:w-1/3 sm:w-1/2 p-4">
                    <div className="flex relative">
                    <img alt="gallery" className="absolute inset-0 w-full h-full object-cover object-center" src="https://dummyimage.com/605x365"/>
                    <div className="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100">
                        <h2 className="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1">THE SUBTITLE</h2>
                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3">Holden Caulfield</h1>
                        <p className="leading-relaxed">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.</p>
                    </div>
                    </div>
                </div>
                <div className="lg:w-1/3 sm:w-1/2 p-4">
                    <div className="flex relative">
                    <img alt="gallery" className="absolute inset-0 w-full h-full object-cover object-center" src="https://dummyimage.com/606x366"/>
                    <div className="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100">
                        <h2 className="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1">THE SUBTITLE</h2>
                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3">Alper Kamu</h1>
                        <p className="leading-relaxed">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.</p>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </section>

            <section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="text-center mb-20">
      <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">Raw Denim Heirloom Man Braid</h1>
      <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine, ramps microdosing banh mi pug.</p>
      <div className="flex mt-6 justify-center">
        <div className="w-16 h-1 rounded-full bg-indigo-500 inline-flex"></div>
      </div>
    </div>
    <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
      <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
        <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10" viewBox="0 0 24 24">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
          </svg>
        </div>
        <div className="flex-grow">
          <h2 className="text-gray-900 text-lg title-font font-medium mb-3">Shooting Stars</h2>
          <p className="leading-relaxed text-base">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine, ramps microdosing banh mi pug VHS try-hard.</p>
          <a className="mt-3 text-indigo-500 inline-flex items-center">Learn More
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </div>
      <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
        <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10" viewBox="0 0 24 24">
            <circle cx="6" cy="6" r="3"></circle>
            <circle cx="6" cy="18" r="3"></circle>
            <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
          </svg>
        </div>
        <div className="flex-grow">
          <h2 className="text-gray-900 text-lg title-font font-medium mb-3">The Catalyzer</h2>
          <p className="leading-relaxed text-base">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine, ramps microdosing banh mi pug VHS try-hard.</p>
          <a className="mt-3 text-indigo-500 inline-flex items-center">Learn More
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </div>
      <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
        <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10" viewBox="0 0 24 24">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
        <div className="flex-grow">
          <h2 className="text-gray-900 text-lg title-font font-medium mb-3">Neptune</h2>
          <p className="leading-relaxed text-base">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine, ramps microdosing banh mi pug VHS try-hard.</p>
          <a className="mt-3 text-indigo-500 inline-flex items-center">Learn More
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
    <button className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button>
  </div>
</section>
        {/* <div classNameName="h-[2000px] bg-white "></div> */}
    </>
}