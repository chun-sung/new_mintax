import { db } from '@vercel/postgres'


export async function GET(req) {
  try{          
    const inquiry = await db`
        SELECT 
            ci.*,
            summary.total, 
            summary.total_complete, 
            summary.mis_complete
        FROM 
            customer_inquiry ci
        JOIN 
            (
                SELECT 
                    id, 
                    COUNT(*) AS total, 
                    SUM(CASE WHEN complete = true THEN 1 ELSE 0 END) AS total_complete, 
                    COUNT(*) - SUM(CASE WHEN complete = true THEN 1 ELSE 0 END) AS mis_complete
                FROM 
                    customer_inquiry
                GROUP BY 
                    id
            ) AS summary
        ON 
            ci.id = summary.id        
    `;
      let { rows } =  inquiry;
      let result = Object.values(JSON.parse(JSON.stringify(rows)));             //  RowDataPacket 을 data (배열에 담긴 객체)로 최종 처리 
      console.log('인쿼리', result)
    return new Response(JSON.stringify({ result }))
  } catch(err) {
    console.log(err)
  }
}
  
export async function POST(req) {

  let body = await req.json()
  console.log('POST',body)

  try{
      const inquiry = await db`SELECT * from  customer_inquiry WHERE id=${''}`;              
      return new Response(JSON.stringify(inquiry))
  } catch(err) {
    console.log(err)
  }
}
  