import { db } from '@vercel/postgres'

// export async function GET(req) {
//     try{
//       const rows = await pool.query("SELECT * FROM articles ORDER BY article_idx DESC");
//       let result = Object.values(JSON.parse(JSON.stringify(rows)));             //  RowDataPacket 을 data (배열에 담긴 객체)로 최종 처리 
  
//       return new Response(JSON.stringify({ result }))
//     } catch(err) {

//     }
// }
  
export async function POST(req) {

    let body = await req.json()
    console.log('API Board write',body)
    try{
        await db`
            INSERT INTO articles(board_idx, regist_userid, title, content, regist_date)
            Values(
             ${body.board_idx},             
             ${body.regist_userid},              
             ${body.title},
             ${body.content}, 
             ${body.regist_date}) 
        `;         
      
        return new Response(JSON.stringify({msg: 'success'}))
    } catch(err) {
      console.log(err)
    } finally {
        
    }
}
  