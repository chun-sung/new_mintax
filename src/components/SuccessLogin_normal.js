'use client'
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SET_LOGIN, SET_LOGIN_WINDOW } from "../redux/reducers/userSlice";
import { usePathname, useRouter } from "next/navigation";

// 새로고침 및 접속시에  
// token 이 유효하면  token 정보로 로그인을 유지시키고 ( 새로 고침시 )

// token 이 유효하지 않으면 ( 에러 발생시/token 인증 실패 ) 
//   1. 미들웨어에서 먼저 리다이랙션 한다.('/' 메인 페이지로 이동 )
//           - 미들웨어는 /mypage url 경로만 token 유무 만 1차 확인(2차 확인은 SuccessLogin )

//   2. /notaccess 로 리다이랙션 하고  (SuccessLogin)
//   3. Login 패널을 화면에 띠운다.    (SuccessLogin)

export default function SuccessLogin_normal() {
    
    let dispatch = useDispatch();
    let router = useRouter();
    let path = usePathname();
    useEffect(()=> {           
				axios({
						url: "https://www.n-mintax.store/api/login/success",
						method: "GET",
						withCredentials: true,            // 자격증명포함 (쿠키의 토큰을 가지고 간다.)
				})
				.then((result) => {  
						// console.log('토큰 결과', result)              
						if(result.data.msg == 'jwt_userId_fail'){
							console.log('미로그인 상태')
						}
						else if(result.data.msg == 'success') {
								const {id ,user_id, nickname} = result.data;
								dispatch(SET_LOGIN({ id, user_id, nickname }))                    
						} 	              
						// else if (path !== '/mypage') {          // 토큰 만료시 /mypage 가 아닐시에 프로그램 종료 
						// 																				// 로그인 한후 토큰 만료되어 불량 토큰이되면 아래 else if 문에 계속 걸리게 된다. 그것을 회피하기 위함!
						// 		return
						// }                
						else if(result.data.msg == 'jwt_expired'){
								alert('로그인 상태가 만료 되었습니다.');
								router.push('/');
								// dispatch(SET_LOGIN_WINDOW(true));
						} else if (result.data.msg == 'jwt_fail') {
							console.log('로그인 상태 아님');
						}
				}).catch( err => {                
						// router.push('/notaccess');   // 로그인 안된상태면 에러가 발생해서 /notaccess 로 이동 되는데.. 주석처리!!
						// dispatch(SET_LOGIN_WINDOW(true)) ;
						console.log(err)
				})
						
		},[])
        
    return (        
        <></>
    )
}