import { db } from '@vercel/postgres'


export async function POST(req) {

  let body = await req.json()
  console.log('POST',body)

  try{
      await db`
          INSERT INTO customer_inquiry (id,user_id, title, content, regist_date)
          Values(
          ${body.id},
          ${body.user_id},
          ${body.title},
          ${body.content},
          ${body.regist_date}
          )`;         
     console.log('상담 1건이 등록되었습니다.')
      return new Response(JSON.stringify({msg: 'success'}))
  } catch(err) {
    console.log(err)
  }
}
  