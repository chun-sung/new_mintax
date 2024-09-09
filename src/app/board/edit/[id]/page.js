'use client'
import PageTopPure from "@/components/PageTopPure";
import Seo from "@/components/Seo";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import dayjs from "dayjs"  


export default function Create() {

    const [ title, setTitle] = useState('');
    const [ contents, setContents] = useState('');

    const router = useRouter()
    const { user } = useSelector( state => state.user)

    let params = useParams();
    const encodeStr = params.id;
    const decodeStr = decodeURIComponent(encodeStr);
    console.log(decodeStr);
    const number = decodeStr.match(/\d+/); // 숫자 추출
    // const id = parseInt(number[0], 10);
    const id = number[0];
    
    console.log('edit[id] 의 id', id)

    // console.log(window.location)
    const urlStr = window.location.href
    let url = new URL(urlStr);
    let urlparams = url.searchParams;
    let pageNumber = urlparams.get('page');

    useEffect(()=> {
      fetch(`/api/board/edit`,{
         method: 'POST',
         body: JSON.stringify(id)
      })
      .then( res => {
         return res.json()         
      })
      .then( res => {
        console.log('에디터 게시글 값',res)
         setTitle(res[2][0].title)
         setContents(res[2][0].content)
      })
      .catch(err => console.log(err))
    },[])

    return <>
        <Seo title='글작성 | MinTAX'/>
        {/* <PageTop /> */}
        <h1 className="text-center pt-[100px] lg:pt-[200px] text-2xl stop-dragging">글수정</h1>

        <div className="article__section mt-[0px] bg-neutral-00 p-1 lg:p-10 w-full lg:w-[1200px] m-auto">
            <div className="article__wrapper w-full lg:w-[1000px] h-[600px] lg:h-[600px] m-auto">
            <div className="text-right mb-1 w-full lg:w-[800px] m-auto">                  
                </div>
                <table className="w-full mt-9 lg:w-[900px] border-l-[1px] border-r-[1px] m-auto">
                                <thead className="">
                                    <tr className=" text-[14px] lg:text-md lg:border-b border-2 bg-slate-300 h-10">
                                        {/* <th width="50%">수정일: {dayjs(Date.now()).format('YY.MM.DD')}</th> */}
                                        {/* <th width="10%"></th>
                                        <th width="10%"></th> */}
                                        <th width="50%" className="font-normal text-base">수정: {user.user_id}</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm lg:text-md">                            
                                    <tr className="border-b border-1 border-slate-200" >
                                        <td  colSpan='4' className="p-1.5 lg:p-3">
                                            <div className="relative mb-2">
                                                {/* <label htmlFor="name" className="leading-7 text-sm text-gray-600">제목</label> */}
                                                <input placeholder="제목" type="text" id="name" name="title" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none
                                                 text-gray-700 py-0 px-3 leading-8 transition-colors duration-200 ease-in-out" defaultValue={title} onChange={(e)=>{
                                                  setTitle(e.target.value) 
                                                }}/>
                                            </div>                                        
                                            <div className="relative">
                                                {/* <label htmlFor="message" className="leading-7 text-sm text-gray-600">내용</label> */}
                                                <textarea placeholder="내용" id="message" name="content" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-60 text-base outline-none 
                                                text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" defaultValue={contents} onChange={(e)=>{
                                                  setContents(e.target.value)
                                                }}></textarea>
                                            </div>                                          
                                        </td>          
                                    </tr>                            
                                </tbody>
                </table>
                <div className="text-right mb-1 w-full lg:w-[900px] m-auto stop-dragging">
                    <button className="shadow-md inline-block p-1 px-3 bg-gray-400 hover:bg-gray-600 text-white rounded mr-1 mt-2 text-sm" onClick={()=> router.back()}>취소</button>
                    <button className="shadow-md inline-block p-1 px-3 bg-blue-400 hover:bg-blue-600 text-white rounded mr-1 mb-0 text-sm" onClick={()=>{
                      
                      if(title == '') {
                        alert('제목을 입력해주세요')
                        return
                      } else if(contents == '') {
                        alert('내용을 입력해주세요')
                        return
                      }
                      // let date = new Date();       
                      // console.log(date)        // 1684044653856
                      // console.log(dayjs(Date.now()).format('YY.MM.DD'))                      

                      let data = {title, contents, article_idx: id,
                                        // modify_userid: user.user_id,
                                        // nickName: user.nickName, 
                                        // modify_date: dayjs(Date.now()).format('YY.MM.DD HH:mm:ss')
                                  }

                      fetch('/api/board/update',{
                        method: 'POST',
                        body: JSON.stringify(data)
                      })
                      .then((res) => res.json())
                      .then((res) => {                                 
                      if(res.msg == 'success') {
                        alert('수정 되었습니다')
                        router.push(`/board/${data.article_idx}?page=${pageNumber}`)
                      } else {
                        alert('수정 실패!')
                      }
                      
                      }).catch(err => console.log(err))

                    }}>수정</button>
                </div>
                
                </div>
        </div>

    </>
}