import { db } from '@vercel/postgres'

// await db`
// UPDATE articles Set 
//    modify_userid=${body.modify_userid}, 
//    title=${body.title}, contents=${body.contents},
//    modify_date=${body.modify_date} 
//    WHERE article_idx=${body.article_idx}           
// `;         

export async function GET(req) {
  try{          
    const article = await db`
      SELECT articles.*, comment_length
      FROM articles
      LEFT JOIN (
        SELECT article_idx_comment, COUNT(*) AS comment_length
        FROM comments
        GROUP BY article_idx_comment
        ) AS comment_counts
        ON articles.article_idx = comment_counts.article_idx_comment
        ORDER BY articles.article_idx DESC;      
      `;
      let { rows } =  article;
      let result = Object.values(JSON.parse(JSON.stringify(rows)));             //  RowDataPacket 을 data (배열에 담긴 객체)로 최종 처리 
  
    return new Response(JSON.stringify({ result }))
  } catch(err) {
    console.log(err)
  }
}
  
export async function POST(req) {

    let body = await req.json()
    console.log(body);
    try{
      const rows = await db`SELECT * FROM articles WHERE article_idx=${body.id}`;
      let result = Object.values(JSON.parse(JSON.stringify(rows)));             //  RowDataPacket 을 data (배열에 담긴 객체)로 최종 처리 
      
      // console.log(...result)

      return new Response(JSON.stringify(...result))
    } catch(err) {
      console.log(err)
    } finally {

    }
}
  