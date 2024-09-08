import { db } from '@vercel/postgres'

export async function POST(req) {      

   let body = await req.json()

    try{
      const rows = await db`DELETE FROM comments WHERE comment_idx=${body.comment_idx}`;

      console.log('결과',rows)

      if(rows.rowCount == 1) {
        console.log('댓글 1건 삭제 완료')
        return new Response(JSON.stringify({msg: 'success'}))
      }
    } catch(err) {
      console.log(err)
    } finally {

  }
}
  