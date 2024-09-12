import { db } from '@vercel/postgres'

export default async function handler(req, res) {

   const { article_idx } = req.query;   
   const number = article_idx.match(/\d+/);                         // 숫자 추출
   const article_number = parseInt(number[0], 10);

   try{      
      const rows = await db`
      SELECT p.*, c.*
      FROM articles p
      LEFT JOIN comments c ON p.article_idx = c.article_idx
      WHERE p.article_idx = ${article_number}`;
      
      let result = Object.values(JSON.parse(JSON.stringify(rows)));  //  RowDataPacket 을 data (배열에 담긴 객체)로 최종 처리 
      // console.log('결과',result)
      res.json(result[2])
      return;

   } catch(err) {
      console.log(err)
   } finally {
      
  }       
}