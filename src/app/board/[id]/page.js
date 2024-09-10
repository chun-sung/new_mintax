'use client'
import Seo from "@/components/Seo";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import dayjs from "dayjs"             // 날짜 포맷 
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import PageTop from "@/components/PageTop";
 
export default function Detail() {

   const user = useSelector(state => state.user.user)
    
    const [article, setArticle] = useState([]);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const [commentBtn, setCommentBtn] = useState(false);

    let params = useParams();
    // console.log('파람스',params);
    
    const encodeStr = params.id;
    const decodeStr = decodeURIComponent(encodeStr);
    // console.log(decodeStr);
    const number = decodeStr.match(/\d+/); // 숫자 추출
    // const id = parseInt(number[0], 10);
    const id = number;
 
 
    // console.log('쿼리', number[0])
    // console.log('숫자추출', id )
    
    let router = useRouter();
    
  
    // console.log(window.location)

    let urlStr = window.location.href
    let url = new URL(urlStr);
    let urlparams = url.searchParams;
    let pageNumber = urlparams.get('page');


       // tanstack/react-query 1            
    // const { isLoading, error, data, postQuery } = useQuery({
    //   queryKey: ['article'],        
    //   queryFn: () =>  fetch(`/api/board`,{
    //     method: 'POST',
    //     body: JSON.stringify({id: id.id})

    //   }).then(res => res.json()).then( res => { 
    //     // console.log('게시글 1건',res)
    //     setArticle(res)        
    //     return res
    //   }),
    // })      

    
    // const info = article?.article_idx  // 종속 변수 1


    // // tanstack/react-query 2  (종속 쿼리)     
    // let { refetch } = useQuery({   

    //   queryKey:['comment'],
    //   queryFn: () =>  fetch(`/api/comments?article_idx=${article.article_idx}`).then(res => res.json()).then( res => { 
    //     // console.log('댓글리스트',res)
    //     setComments(res)
    //     console.log(res);
    //     return res
    //   }),
    //   enabled: !!info       // info 에 데이터가 존재해야 쿼리됨
    // })
    


    // tanstack/react-query 3            
    const { isLoading, error, data, postQuery, refetch } = useQuery({
      queryKey: ['article'],        
      queryFn: () =>  fetch(`/api/comments?article_idx=${id}`)
      .then(res => res.json()).then( res => { 
        // const obj = res[0]
        // console.log('Board[id]', res)
        setArticle(res)        
        return res
      }),
    })


    // useQuery 데이터 로딩중 (여기서 사용하면 안됨)
    // if(isLoading) return <div className="text-center mt-10 p-2 bg-red-200 text-white w-36 rounded-lg m-auto">Loading...</div>
    
    // useQuery 에러처리
    if(error) return <pre>{JSON.stringify(postQuery?.error)}</pre>

    return <>
        <Seo title='MinTax 게시판 | MinTAX'/>
        <PageTop />
        <div className="text-center pt-[120px] lg:pt-[200px] pb-[50px] h-[32px] text-2xl stop-dragging">
          <h1 className="">{article[0]?.title}</h1>
        </div>

      {/* 게시글 출력창 */}
        <div className="article__section mt-[0px] bg-neutral-000 p-1 lg:p-10 w-full lg:w-[1200px] m-auto">
            <div className="article__wrapper w-full lg:w-[1000px] h-full lg:h-full m-auto">
                <div className="text-right mb-2 w-full lg:w-[900px] m-auto stop-dragging">
                    {/* <button className="shadow-md inline-block p-1 px-3 bg-gray-400 hover:bg-gray-600 text-white rounded mr-1 mb-0 text-sm" onClick={() => router.back()}>뒤로</button> */}
                    <button className="shadow-md inline-block p-1 px-3 bg-gray-400 hover:bg-gray-600 text-white rounded mr-1 mb-0 text-sm" onClick={() => router.push(`/board?page=${pageNumber}`)}>뒤로</button>
                     { user.user_id !== null ?
                     <> 
                       <button className="shadow-md inline-block p-1 px-3 bg-blue-400 hover:bg-blue-600 text-white rounded mr-1 mb-0 text-sm" onClick={()=> { 
                        if(user?.user_id !== article[0]?.regist_userid){
                          alert('본인의 게시글만 수정할 수 있습니다.')
                          return
                        }                        
                        user?.user_id == null ? alert('로그인 부탁드립니다') : router.push(`/board/edit/article_idx=${id}?page=${pageNumber}`)
     
                       }}>수정</button>
                       <button className="shadow-md inline-block p-1 px-3 bg-red-400 hover:bg-red-600 text-white rounded mr-1 mb-0 text-sm" onClick={()=> {
     
                        if(user.user_id == null) {
                           alert('로그인하기 바랍니다')
                           return;
                        } 
                        if(user.user_id !== article[0]?.regist_userid) {
                           alert('본인의 게시물만 삭제할 수 있습니다.')
                           return;
                        } 
                        if(user.user_id == article[0]?.regist_userid) {
                          if(confirm('삭제 하시겠습니까?')) {
                             fetch('/api/board/delete',{
                                method: 'POST',
                                body: JSON.stringify({article_idx: Number(id) })
                             })
                             .then(res => { return res.json()})                     
                             .then(res => {
                                if(res.msg == 'success') {
                                  alert('1건의 게시물이 삭제되었습니다')
                                   router.push(`/board?page=${pageNumber}`)
                                }
                             }).catch(err => console.log(err))
                          }     
                        }
                       }} >삭제</button>                       
                     </>
                     :<> 
                        <button className="shadow-md inline-block p-1 px-3 bg-blue-200 hover:bg-blue-200 text-white rounded mr-1 mb-0 text-sm">수정</button>
                        <button className="shadow-md inline-block p-1 px-3 bg-red-200 hover:bg-red-200 text-white rounded mr-1 mb-0 text-sm">삭제</button>                       
                     </>
                     }
                </div>

              {/* 게시글 정보 */}
                <table className="w-full lg:w-[900px] border-l-[1px] border-r-[1px] m-auto">
                    <thead className="">
                        <tr className=" text-[14px] lg:text-md lg:border-b border-2 bg-slate-300 h-10">
                            <th width="20%" className="font-normal text-base">번호. {id}</th>
                            <th width="40%"></th>
                            {/* <th width="20%">{dayjs(article[0]?.regist_date).format("YY.MM.DD")}</th> */}
                            <th width="50%" className="font-normal text-base text-black">작성자: {article[0]?.regist_userid}</th>
                        </tr>
                    </thead>
                </table>
                <div className="border-b lg:border border-1 border-slate-200 p-1 pb-6 w-full lg:w-[900px] m-auto bg-zinc-100 text-center">
                    <span  colSpan='4' className="p-1.5 lg:p-3 h-96 text-lg">
                        <br/>{article[0]?.content}<br/><br/>
                        
                        {/* { isLoading == true ? <div className="text-center mb-[500px] p-2 bg-red-300 text-white w-36 rounded-full m-auto">loading...</div> : null } */}
                        { isLoading == true ? <div className="text-center mb-[500px] p-2 bg-red-00 text-white w-36 rounded-full m-auto">
                                                <button type="button" className="bg-indigo-00 ..." disabled>
                                                  <svg width="100" className="animate-spin h-[50px]" 
                                                      height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                      <circle cx="50" cy="50" r="44.5" stroke="#A4A3A3" strokeWidth="11"/>
                                                  <path d="M19 10.5L13 17L9.5 21.5L19 26L23 21.5L27 18L32.5 15L39 12.5L45.5 10.5H49.5H55L58.5 1H53.5H49.5H41.5L32.5 3L26.5 6L19 10.5Z" fill="#141313" stroke="black"/>
                                                  </svg>                              
                                              </button>
                        </div> : null }

                    </span>
                    <div>
                        {/* 댓글 출력창  */}
                      { article[0]?.comment_idx !==  null 
                        
                        ? article?.map((item, i) => {                     
                            return <div className="mb-1 text-sm w-full lg:w-[900px] m-auto stop-dragging text-right lg:pr-[30px]" key={i}>
                                  <span className="inline-block bg-zinc-200 text-gray-500 text-[14px] p-0.5 lg:p-1 px-2 lg:px-4 rounded-md">{item.comment}

                                  <span className="inline-block h-[20px] text-[14px] lg:text-[14px] ml-2 pt-2 bg-indigo-00 text-black font-bold py-[5px] px-1 pb-0.5 leading-[40%]">
                                    {item.nickname_comment}
                                  </span>

                                  {/* <span className="text-[12px] lg:text-[12px]">{dayjs(item.regist_date_comment).format('YY.MM.DD')}</span> */}

                                  { user.user_id == item.regist_userid_comment
                                    ? <span className="hover:bg-red-500 ml-2 w-[15px] h-[15px] inline-block text-[12px] text-white lg:text-[12px] leading-[50%] bg-red-300 rounded-full p-1 cursor-pointer" onClick={()=>{
          
                                      confirm(`"${item.comment}" \n댓글을 삭제할까요?`) 
                                      ? fetch('/api/board/comments/delete',{
                                        method: 'POST',
                                        body: JSON.stringify({ comment_idx: item.comment_idx })
                                      })
                                      .then(res => res.json())
                                      .then(res => { 
                                        refetch();
                                        if(res.msg == 'success') return console.log('댓글을 삭제했습니다')                       
                                      }).catch(err => console.log(err))                                        
                                      : null
                                      }}>
                                        x
                                      </span>
                                      : <span className="hover:bg-red-500 ml-2 w-[15px] h-[15px] inline-block text-[12px] lg:text-[12px] leading-[70%] text-black hover:text-white bg-white border-[1px] border-blue-200 rounded-full p-0.5 cursor-pointer text-center" 
                                          onClick={()=> alert('내가 쓴 댓글만 삭제할 수 있어요!')}>
                                          x
                                         </span>
                                      }
                                  </span>
                                  </div>
                          })                  
                        : ''
                        // <span className="block w-[100px] lg:w-[200px] text-center text-gray-400 bg-gray-200 m-auto rounded-full p-1 mt-3 lg:mt-10 mb-[0px] lg:mb-[0px] text-[10px] lg:text-[16px]">댓글이 없습니다</span>
                      }
                    </div>          
                </div>      
               
              {/* 댓글 입력 버튼 */}

                  <div className="text-right mb-1 w-full lg:w-[900px] m-auto stop-dragging">
                    <button className="shadow-md inline-block p-1 px-3 bg-blue-400 hover:bg-blue-600 text-white text-right rounded mt-2 mb-3 text-sm" onClick={()=>{
                      user.user_id == null ? alert('로그인해야 합니다') 
                      : setCommentBtn(true)
                    }}>댓글</button>
                  </div>


                <div className="relative bg-zinc-0 mt-0 py-0 w-full lg:w-[900px] m-auto">

                  {/* 댓글 입력 패널 */}

                  { commentBtn == true ?
                    <div className="absolute lg:absolute top-[-48px] pb-1 lg:pb-3 lg:top-[-48px] lg:left-[40px] z-20 bg-gray-300 border-[1px] border-gray-300 p-1 shadow-md rounded-md w-full lg:w-[800px] m-auto">
                      <input className="w-full pl-1 h-[35px] lg:h-[40px] leading-[3em] lg:leading-[3em] rounded border border-indigo-400 outline-indigo-400 bg-gray-100 text-[16px] lg:text-[18px]" onChange={(e) => setComment(e.target.value)} type="text" />
                      <div className="text-right">
                        <button className="shadow-sm inline-block p-1 px-3 bg-blue-400 hover:bg-blue-600 text-white text-right rounded mt-2 lg:mt-4 mb-0 text-sm mr-1" onClick={()=> {

                          if(comment.length == '' ) return alert('댓글을 입력하세요')

                            let commentData = { article_idx: Number(id),
                                                comment, 
                                                nickname_comment: user.nickname,
                                                regist_userid_comment: user.user_id,
                                                regist_date: dayjs(Date.now()).format('YYYY.MM.DD HH:mm.ss')
                          }
                          fetch('/api/board/comments', {
                            method: 'POST',
                            body: JSON.stringify(commentData)
                          })
                          .then(res => {
                            return res.json()
                          })
                          .then(res => {

                            if(res.msg == 'success'){
                              refetch();
                              setCommentBtn(false)
                              setComment('')
                            } else {
                              alert('등록에 실패하였습니다.')
                            }
                          }).catch(err => console.log(err))

                        }}>확인</button>
                        <button className="shadow-md inline-block p-1 px-3 bg-red-400 hover:bg-red-600 text-white text-right rounded mt-2 lg:mt-4 mr-2 mb-0 text-sm" onClick={()=> { 
                          setComment('')
                          setCommentBtn(false)}}>취소</button>
                      </div>
                    </div>
                    :null
                  }
                </div>
            </div>            
      </div>     
      <div className="h-[30vh] lg:h-[50vh]"></div>   
    </>
}