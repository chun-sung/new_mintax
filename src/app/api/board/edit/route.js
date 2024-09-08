import { db } from '@vercel/postgres'

export async function POST(req) {
   
   let body = await req.json()

    console.log('보디',Number(body));
    try{
      const rows = await db`SELECT * FROM articles WHERE article_idx=${body}` ;
      let result = Object.values(JSON.parse(JSON.stringify(rows)));             //  RowDataPacket 을 data (배열에 담긴 객체)로 최종 처리 
      console.log('결과',result[2])
      
      return new Response(JSON.stringify(result))
    } catch(err) {
      console.log(err)
    } finally {

  }
}
  