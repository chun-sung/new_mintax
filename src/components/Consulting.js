'use client';

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { SET_MEMBER_PANEL, SET_CONSULTING_PANEL } from "../redux/reducers/userSlice"
import dayjs from "dayjs";

export default function Inquiry() {
    
    const { user } = useSelector((state) => state.user)
    const id = user.id;
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    
    const dispatch = useDispatch()
 
    return <>
    <div className=" lg:mt-[50px] lg:mb-[50px] z-20">

    {/*상담 신청 & 회원 가입 */}
    <div className="flex mt-20 w-full lg:w-[980px] m-auto lg:m-auto justify-center lg:justify-start mb-10">
            <p className="shadow-lg bg-blue-600 p-2 lg:p-4 w-[104px] lg:w-[120px] mr-0 lg:mr-0 text-neutral-100 text-md cursor-pointer hover:bg-red-400" onClick={()=>{
           user?.user_id !== null ? dispatch(SET_CONSULTING_PANEL(true)) : alert('로그인해야 합니다')
        }}>상담신청</p>
        { user?.user_id == null ?
            <p className="shadow-lg bg-gray-400 p-2 lg:p-4 w-[104px] lg:w-[120px] text-white text-md cursor-pointer hover:bg-red-400" onClick={() => {
                dispatch(SET_MEMBER_PANEL(true))
            }}>회원가입</p>        
            : <p className="shadow-lg bg-gray-400 p-2 lg:p-4 w-[220px] lg:w-[220px] text-white text-md" onClick={() => {
                
            }}>궁금한 내용이 있으신가요?</p>     
        }
  
    </div>        

    {/* 상담 신청 패널 */}
  <div className="relative m-auto lg:w-[520px]">
  { user?.member_consul == true ? 
      <div className="absolute border-stone-400 border-[1px] bg-white w-[345px] px-4 lg:px-6 lg:w-[500px] lg:mt-0 top-[-375px] lg:top-[-582px] p-3 h-92 shadow-2xl z-10 rounded left-[50%] translate-x-[-50%] stop-dragging">
          <div className="text-center mb-2">
              {/* <span>전화번호 입력 후 확인을 눌러주세요</span><br /> */}
              <span className="text-md stop-dragging">문의 내용</span><br />
          </div>
          <div className="w-full mb-2">   
              <form>
                  <div className="relative sm:mb-0 w-full mb-2">
                      <label htmlFor="full-name" className="leading-7 text-sm text-gray-600"></label>
                      {/* <input type="hidden" name="id" value={10} /> */}
                      <input autoComplete="off" placeholder="제목" type="text" id="full-name" name="name" className="tracking-tight w-full bg-gray-200 bg-opacity-40 rounded border text-md text-base border-gray-400 focus:border-indigo-100 focus:ring-2 focus:ring-indigo-400 focus:bg-transparent outline-none text-gray-700 px-1 leading-8 transition-colors duration-200 ease-in-out" 
                          onChange={(e) => setTitle(e.target.value)} 
                      />
                  </div>
                  <div className="relative sm:mb-0 flex-grow w-full mt-2">
                      <label htmlFor="name" className="leading-7 text-sm text-gray-900"></label>
                      <textarea autoComplete="off" placeholder="내용" type="text" id="name" name="telNumber" className="tracking-tight resize-none w-full h-[210px] bg-gray-200 bg-opacity-40 rounded border border-gray-400 text-md focus:border-indigo-100 focus:ring-2 focus:ring-indigo-400 focus:bg-transparent outline-none text-gray-700 px-1 leading-normal transition-colors duration-200 ease-in-out" 
                          onChange={(e) => setContent(e.target.value)}
                      />
                  </div>
              </form>
          </div>
          <div className="mt-2 text-center text-sm mb-1">
              <button className="p-1.5 px-4 shadow rounded mr-2 bg-blue-500 hover:bg-blue-400 text-white" 
                  onClick={()=> {                    
                    if(title == '') {
                        alert('제목을 입력하세요')
                        return 
                    } else if(content == '') {
                        alert('내용을 입력하세요')
                        return
                    }
                    fetch('https://www.n-mintax.store/api/inquiry/create', {
                        method: 'POST',
                        body: JSON.stringify({
                            id, 
                            title,
                            content,
                            regist_date: dayjs(Date.now()).format('YYYY.MM.DD HH:mm') })
                    })
                    .then((res) => {
                        return res.json();
                    })
                    .then(data => {
                        if(data.msg == 'success') {
                            alert('상담 결과는 Mypage에서 확인할 수 있습니다.')
                            alert(`${user.user_id } 님의 상담 요청이 접수 되었습니다`)                          
                            dispatch(SET_CONSULTING_PANEL(false))
                            setTitle('')
                            setContent('')
                          } else {
                            alert('데이터 전송중 에러발생 마이 페이지에서 등록 여부 확인')
                          }
                    })                     
                  }}
              >확인</button>
              <button className="p-1.5 px-4 shadow rounded bg-red-500 hover:bg-red-300 text-white" 
              onClick={()=> dispatch(SET_CONSULTING_PANEL(false))}
              >취소</button> 
          </div>
      </div> 
      : null
      }   
      </div>
  </div>
</>
}