import { db } from '@vercel/postgres'


export async function GET(req) {
  try{          
    const inquiry = await db`SELECT * from  customer_inquiry`;
      let { rows } =  inquiry;
      let result = Object.values(JSON.parse(JSON.stringify(rows)));             //  RowDataPacket 을 data (배열에 담긴 객체)로 최종 처리 
  
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
  