// const { db } = require('../../../DB/db');
import { db } from '@vercel/postgres'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/dist/client/components/headers';

// SuccessLogin  (로그인 검증)
export async function GET(req) {
    
    try {
        const token = cookies().get('accessToken');
        // console.log('토큰',token.value)
        
        if(token?.value !== '') {     // 엑세스 토큰 값 체크 안됨

            let JWT_ACCESS_SECRET='springstar74'                
            const data = jwt.verify(token?.value, JWT_ACCESS_SECRET);            
            // console.log('데이터', data);                                   // { nickName: 'springstar', user_id: 'springstar@daum.net' . . .}
            // 위 토큰 검증 실패하면 아래 코드 실행 안됨

            const rows = await db`SELECT * FROM members WHERE user_id=${data.user_id}`;   
            let result = Object.values(JSON.parse(JSON.stringify(rows)));             //  RowDataPacket 을 data (배열에 담긴 객체)로 최종 처리               
            
            const [obj]   = result[2];                     // 배열 제거(구조분해 할당)
            let {password, ...others } = obj;              // 패스워드 분리
            let result2 = { msg:'success', ...others}      // msg 정보 추가              

            if(data?.user_id === result2?.user_id) {                                       

                return new Response(JSON.stringify(result2))   
            }                      
            return  // else 문은 필요하지 않다. jwt토큰이 맞지 않으면 에러 발생한다.     
        } 
        return new Response(JSON.stringify({msg: 'jwt_fail'}))   

    } catch (err) {
        console.log(err)    // 여기 에러코드를 보면 만료 인지 알 수 있다. ex> TokenExpiredError: jwt expired
                            // 에러가 난다는 것은 유효하지 않은 토큰이기 때문이다. (토큰 만료 또는 해킹)
        return new Response(JSON.stringify({msg: 'jwt_expired'}))
    } 
}
















// 로그인 검증 (토큰 확인)
// loginSuccess: async (req, res, next) => {

//     try {
//             let JWT_ACCESS_SECRET='dlksjfljlsjdlfj'            
//             const token = req.cookies.accessToken;
//             const data = jwt.verify(token, JWT_ACCESS_SECRET);
//             console.log('데이터',data);
//             // 위 토큰 검증 실패하면 아래 코드 실행 안됨
//             let result = await db.Member.findOne({ 
//                 raw: true,
//                 where: { user_id: data.user_id } 
//         });
//             // async 비동기로 인해 아래 코드는 적용이 안됨
//                 // result.msg = '성공';
//             let { password, ...others } = result;

//             let result2 = {msg:'성공', ...others}
//             // 여기서 패스워드 빼줘야 할 듯

//             if(data.user_id === result.user_id) {
//                 // res.json({msg: '성공'});
//                 // console.log(result2)

//                 res.json(result2);     
//                 // res.status(200).json(result)
//         } 
//             // else {
//             //     res.json({msg:'실패'})
//             // }
//             // else 문은 필요하지 않다. jwt토큰이 맞지 않으면 에러 발생한다.
//             return 

//     } catch (error) {
//         res.status(500).json(error);    
//     }           
// }