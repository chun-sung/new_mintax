import { db } from '@vercel/postgres'

export async function POST(req) {      

   let body = await req.json()
    console.log("보디",body)
    try{
      const rows = await db`DELETE FROM articles WHERE article_idx=${body.article_idx}`;

      // console.log('결과',rows)

      if(rows.affectedRows == 1) {
        console.log('게시글 1건 삭제 완료')
        return new Response(JSON.stringify({msg: 'success'}))
      }
    } catch(err) {
      console.log(err)
    } finally {
      
  }
}
  