import { db } from '@vercel/postgres'
import { cookies } from 'next/dist/client/components/headers';

const token = cookies().get('accessToken');

export async function GET(req) {
  if(token?.value == '' || token?.value == undefined) {     // 엑세스 토큰 값 체크

    return new Response(JSON.stringify({msg : 'jwt_fail'}))

  } else {
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
}
  
export async function POST(req) {

  let body = await req.json()
  console.log('POST',body)
  // 클라이언트 /adminpage 에서 로그인 안한 상태를 체크하기 전에 아래 데이터가 먼저 보이고 이후 /notaccess로 강제 페이지 이동
  // 아래 코드 전에 토큰을 체크하는 과정이 먼저 선행되어 아래코드가 수행되지 않게 해야 한다.!!!

  try{
      const inquiry = await db`SELECT * from  customer_inquiry WHERE id=${''}`;              
      return new Response(JSON.stringify(inquiry))
  } catch(err) {
    console.log(err)
  }
}
  