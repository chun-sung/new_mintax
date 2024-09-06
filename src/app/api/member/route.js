// const {pool} = require('../../DB/db');
import { db } from '@vercel/postgres'
import bcrypt from 'bcrypt'


// 회원 정보 API 제공 (GET)
export async function GET(req) {
    const user = await db`SELECT * FROM members`;
    let { rows }  =  user 
    console.log(rows)
    return new Response(JSON.stringify(rows))
}  

// 회원 가입 (POST)
export async function POST(req) {   

    let body = await req.json()
    console.log('Body.user_id', body.user_id)

    try {        
        const member = await db`SELECT * FROM members WHERE user_id=${body.user_id}`;    
        console.log('Member', member.rows)        
        
        if(member.rows.length == 1) {                                      // ID 중복 체크
                        
            return new Response(JSON.stringify({msg: 'id_fail'}))

        } else {        
    
            let hash = await bcrypt.hash(body.password, 10)

            await db`
                INSERT INTO members(user_id, nickName ,password, email)
                Values
                (${body.user_id}, ${body.nickName}, ${hash}, ${body.email}) 
            `;
            return new Response(JSON.stringify({msg: 'success'}))
        }
    } catch (err) {

        throw err;
    } finally {
        
    }
}