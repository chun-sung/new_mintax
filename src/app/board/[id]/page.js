'use client'
import PageTopPure from "@/components/PageTopPure";
import Seo from "@/components/Seo";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
// import dayjs from "dayjs"             // 날짜 포맷 
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
 
export default function Detail() {

   const user = useSelector(state => state.user.user)
    
    const [article, setArticle] = useState([]);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const [commentBtn, setCommentBtn] = useState(false);

    let params = useParams();
    console.log(params.id);
    const encodeStr = params.id;
    const decodeStr = decodeURIComponent(encodeStr);
    console.log(decodeStr);
    const number = decodeStr.match(/\d+/); // 숫자 추출
    // const id = parseInt(number[0], 10);
    const id = number;
 
 
    console.log('쿼리', number[0])
    console.log('숫자추출', id )
    
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
        const obj = res[0]
        console.log('Board[id]', obj)
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
        {/* <PageTop /> */}
        <div className="text-center pt-[100px] h-[32px] text-2xl stop-dragging">
          <h1 className="">{article.title}</h1>
        </div>

      {/* 게시글 출력창 */}
        <div className="article__section mt-[100px] bg-neutral-000 p-1 lg:p-10 w-full lg:w-[1200px] m-auto">
            <div className="article__wrapper w-full lg:w-[1000px] h-full lg:h-full m-auto">
                <div className="text-right mb-2 w-full lg:w-[900px] m-auto stop-dragging">
                    {/* <button className="shadow-md inline-block p-1 px-3 bg-gray-400 hover:bg-gray-600 text-white rounded mr-1 mb-0 text-sm" onClick={() => router.back()}>뒤로</button> */}
                    <button className="shadow-md inline-block p-1 px-3 bg-gray-400 hover:bg-gray-600 text-white rounded mr-1 mb-0 text-sm" onClick={() => router.push(`/board?page=${pageNumber}`)}>뒤로</button>
                     { user.user_id !== null ?
                     <> 
                       <button className="shadow-md inline-block p-1 px-3 bg-blue-400 hover:bg-blue-600 text-white rounded mr-1 mb-0 text-sm" onClick={()=> { 
     
                        user?.user_id == null ? alert('로그인 부탁드립니다') : router.push(`/board/edit/${id.id}?page=${pageNumber}`)
     
                       }}>수정</button>
                       <button className="shadow-md inline-block p-1 px-3 bg-red-400 hover:bg-red-600 text-white rounded mr-1 mb-0 text-sm" onClick={()=> {
     
                        if(user.user_id == null) {
                           alert('로그인 부탁드립니다')
                           return;
                        } 
                        if(confirm('삭제 하시겠습니까?')) {
                           fetch('/api/board/delete',{
                              method: 'POST',
                              body: JSON.stringify({article_idx: article[0]?.article_idx })
                           })
                           .then(res => { return res.json()})                     
                           .then(res => {
                              if(res.msg == 'success') {
                                 router.push(`/board?page=${pageNumber}`)
                              }
                           }).catch(err => console.log(err))
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
                        <tr className=" text-[13px] lg:text-md lg:border-b border-2 bg-slate-300 h-10">
                            <th width="20%">No.{article[0]?.article_idx}</th>
                            <th width="40%"></th>
                            {/* <th width="20%">{dayjs(article[0]?.regist_date).format("YY.MM.DD")}</th> */}
                            <th width="30%" className="">{article[0]?.nickName}</th>
                        </tr>
                    </thead>
                </table>
                <div className="border-b lg:border border-1 border-slate-200 p-1 w-full lg:w-[900px] m-auto bg-zinc-100">
                    <span  colSpan='4' className="p-1.5 lg:p-3 h-96 text-lg">
                        <br/>{article[0]?.contents}<br/><br/>
                    </span>          
                </div>      
                
              {/* 댓글 입력 버튼 */}

                  <div className="text-right mb-1 w-full lg:w-[900px] m-auto stop-dragging">
                    <button className="shadow-md inline-block p-1 px-3 bg-blue-400 hover:bg-blue-600 text-white text-right rounded mt-2 mb-3 text-sm" onClick={()=>{
                      user.user_id == null ? alert('로그인 부탁드립니다.') 
                      : setCommentBtn(true)
                    }}>댓글</button>
                  </div>


                <div className="relative bg-zinc-0 mt-0 py-0 w-full lg:w-[900px] m-auto">

                  {/* 댓글 입력 패널 */}

                  { commentBtn == true ?
                    <div className="absolute lg:absolute top-[-48px] lg:top-[-48px] lg:left-[40px] z-20 bg-gray-300 border-[1px] border-gray-300 p-1 shadow-md rounded-md w-full lg:w-[800px] m-auto">
                      <input className="w-full pl-1 h-[3em] lg:h-[3em] leading-[3em] lg:leading-[3em] rounded border border-indigo-400 outline-indigo-400 bg-gray-100 text-[16px] lg:text-[18px]" onChange={(e) => setComment(e.target.value)} type="text" />
                      <div className="text-right">
                        <button className="shadow-md inline-block p-1 px-3 bg-blue-400 hover:bg-blue-600 text-white text-right rounded mt-2 mb-0 text-sm mr-2" onClick={()=> {

                          if(comment.length == '' ) return alert('댓글을 입력하세요')

                          let commentData = { comment, nickName_comment: user.nickName,
                                              regist_userid_comment: user.user_id,
                                              article_idx_comment: article[0].article_idx,
                                              // regist_date_comment: dayjs(Date.now()).format('YYYY.MM.DD HH:mm.ss')
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
                        <button className="shadow-md inline-block p-1 px-3 bg-red-400 hover:bg-red-600 text-white text-right rounded mt-2 mb-0 text-sm" onClick={()=> { 
                          setComment('')
                          setCommentBtn(false)}}>취소</button>
                      </div>
                    </div>
                    :null
                  }
                </div>
            </div>

            {/* isLoading */}
            
            {
              isLoading == true ? <div className="text-center p-2 bg-red-400 text-white w-36 rounded-lg m-auto">Loading...</div> : null
            }

            {/* 댓글 출력창  */}

            { article[0]?.comment_idx !==  null 
              
              ? article?.map((item, i) => {                     
                  return <div className="text-center mb-2 text-sm bg-orange-000 w-full lg:w-[900px] m-auto stop-dragging" key={i}>
                            <span className="inline-block bg-zinc-300 p-0.5 lg:p-1 px-3 lg:px-4 rounded-xl">{item.comment}</span>
                            <span className="text-[12px] lg:text-[12px] ml-2 mr-2 rounded-full bg-indigo-400 text-white py-[1px] px-2 pb-0.5 leading-[10%]">{item.nickName_comment}</span>
                            {/* <span className="text-[12px] lg:text-[12px]">{dayjs(item.regist_date_comment).format('YY.MM.DD')}</span> */}
                            { user.user_id == item.regist_userid_comment
                             ? <span className="hover:bg-red-500 ml-2 w-[15px] h-[15px] inline-block text-[12px] text-white lg:text-[12px] leading-[40%] bg-red-300 rounded-full p-1 cursor-pointer" onClick={()=>{
  
                              confirm(`"${item.comment}" \n댓글을 삭제하시려구요?`) 
                              ? fetch('/api/board/comments/delete',{
                                method: 'POST',
                                body: JSON.stringify({ comment_idx: item.comment_idx })
                              })
                              .then(res => res.json())
                              .then(res => { 
                                refetch();
                                // if(res.msg == 'success') return console.log('댓글 1건 삭제 되었습니다.')                       
                              }).catch(err => console.log(err))
                              
                              : null
                              }}>x</span>
                              : <span className="hover:bg-red-500 ml-2 w-[15px] h-[15px] inline-block text-[12px] lg:text-[12px] leading-[90%] text-black hover:text-white bg-white border-[1px] border-blue-200 rounded-full p-0 cursor-pointer" onClick={()=> alert('내가 쓴 댓글만 삭제할 수 있어요!')}>x</span>
                            }
                        </div>
                })                  
              : <span className="block w-60 text-center text-gray-400 bg-gray-200 m-auto rounded-full p-1 mt-3 mb-3">댓글이 없습니다</span>
            }
            
      </div>

        
    </>
}