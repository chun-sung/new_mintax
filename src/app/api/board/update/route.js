import { db } from '@vercel/postgres'

export async function POST(req) {

   let body = await req.json()
   console.log(body)
   try{
       await db`
         UPDATE articles Set             
            title=${body.title}, 
            content=${body.contents}            
            WHERE article_idx=${body.article_idx}           
       `;         
     
      //  await db`
      //    UPDATE articles Set 
      //       modify_userid=${body.modify_userid}, 
      //       title=${body.title}, contents=${body.contents},
      //       modify_date=${body.modify_date} 
      //       WHERE article_idx=${body.article_idx}           
      //  `;         
     
       return new Response(JSON.stringify({msg: 'success'}))
   } catch(err) {
     console.log(err)
    } finally {
     
   } 
}
 