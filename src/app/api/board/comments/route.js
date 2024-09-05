import { db } from '@vercel/postgres'

// 아래 GET 코드는 pages/api/comments.js 가 대체 함  ** Query string 데이터가 있는것 확인 (req), 근데 꺼내는 방법을 모름
export async function GET(req) {      // 여기 코드는 사용않함
    let query = req.article_idx;
    console.log('쿼리', query)
    try{
      const article = await db`SELECT * FROM articles WHERE article_idx=${String(query)}`;
      let { rows } = article;
      console.log('검증',rows);

      let result = Object.values(JSON.parse(JSON.stringify(rows)));             //  RowDataPacket 을 data (배열에 담긴 객체)로 최종 처리 
        return new Response(JSON.stringify({ result }))
    } catch(err) {
      console.log(err)
    }
}


export async function POST(req) {

   let body = await req.json()
  //  console.log('POST',body)

   try{
       await db`
           INSERT INTO comments(article_idx_comment, regist_userid_comment, nickName_comment, comment, regist_date_comment)
           Values(
           ${body.article_idx_comment},
           ${body.regist_userid_comment},
           ${body.nickName_comment}, 
           ${body.comment},
           ${body.regist_date_comment}
           )`;         
      console.log('댓글 1건이 등록되었습니다.')
       return new Response(JSON.stringify({msg: 'success'}))
   } catch(err) {
     console.log(err)
   }
}