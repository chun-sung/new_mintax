'use client'
import { useDispatch, useSelector } from "react-redux";
import { SET_LOGIN_WINDOW, SET_LOGIN, SET_MENU_BTN } from  "../redux/reducers/userSlice";
import clsx from "clsx";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login({mode}) {

	const [user_id, setUserId] = useState('')
	const [password, setPassword] = useState('')   

	const { user } = useSelector(state => state.user);
	const dispatch = useDispatch();
	const router = useRouter();

	// 로그인 함수
	function loginEnter() {
		if(user_id == '') {
			alert('ID를 입력하세요')
			return 
		} else if(password == '') {
			alert('패스워드를 입력하세요')
			return
		}
		let userInfo = {user_id, password} 

		fetch('https://www.n-mintax.store/api/login', {
			method: 'POST',
			body: JSON.stringify(userInfo)
		})
		.then((res) => {
		return res.json();
		})
		.then(data => {
			// console.log('데이터',data)            
			if(data.msg == 'success') {

				const { user_id, nickName } = data;
				dispatch(SET_LOGIN({user_id, nickName}))
				dispatch(SET_LOGIN_WINDOW(false))				
				// router.push('/');          // mypage 이동이 불편할 수도...				
				
			} else if(data.msg == 'pw_fail') {
				
				alert('비밀번호가 틀립니다.')					
			} else if( data.msg == 'id_fail') {

				alert('존재하지 않는 회원 ID 입니다.')				
			}
		})
		.catch((err) => console.log(err))
	}

  return (
		<div className={ user.login !== true ? 'hidden' : mode == 'lightMode' ? "absolute border-stone-400 border-[1px] bg-white  w-[320px] lg:w-[380px] lg:mt-10 top-[140px] lg:top-[200px] p-5 h-58 lg:h-58 shadow-2xl z-10 rounded left-[50%] translate-x-[-50%]"
			: "absolute border-stone-600 border-[1px] bg-gray-700 w-[320px] lg:w-[380px] lg:mt-10 top-[140px] lg:top-[200px] p-5 h-58 lg:h-58 shadow-2xl z-10 rounded left-[50%] translate-x-[-50%]"
		}>
			<div className="text-center mb-2">                   
					<span className={ mode == 'lightMode' ? "text-md text-black"
						: "text-md text-gray-400"
					}>Welcome to MinTax</span>
			</div>
			<div className="lg:ml-[-28px] lg:w-96 mb-3 text-center">   
					<form>
							<div className="relative sm:mb-0 flex-grow w-full mb-2 ml-[-9px] lg:ml-[-2px]">
									<label htmlFor="full-name" className="leading-7 text-[12px] text-gray-400 mr-2">ID </label>
									<input type="text" id="full-name" name="user_id" 
										className={clsx("w-52 h-9 bg-gray-200 bg-opacity-50 rounded border border-gray-400 focus:border-indigo-100 focus:ring-2 focus:ring-indigo-400 focus:bg-transparent text-md outline-none text-gray-500 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out",
											{ "text-white" : mode === 'darkMode' })}
										onChange={(e) => setUserId(e.target.value)}
										defaultValue={user_id}
									/>
							</div>
							<div className="relative sm:mb-0 flex-grow w-full mt-2 ml-[-13px] lg:ml-[-5px]">
									<label htmlFor="name" className="leading-7 text-[12px] text-gray-400 mr-2">PW </label>
									<input type="password" id="name" name="password" 
										className={clsx("w-52 h-9 bg-gray-200 bg-opacity-50 ml-[0.5px] rounded border border-gray-400 focus:border-indigo-100 focus:ring-2 focus:ring-indigo-400 focus:bg-transparent text-base outline-none text-gray-500 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" ,
											 {"text-white" : mode === 'darkMode'})}
										onKeyUp={()=>{ window.event.keyCode === 13 ? loginEnter() : null }}
										onChange={(e) => setPassword(e.target.value)}
										defaultValue={password}
									/>
							</div>
					</form>
			</div>
			<div className="mt-2 ml-1 text-center text-sm">
					<button className="p-1.5 px-4 shadow rounded mr-2 bg-blue-400 hover:bg-blue-500 text-white" onClick={()=> {
						
						loginEnter();
					}}>확인</button>

					<button className="p-1.5 px-4 shadow rounded bg-red-400 hover:bg-red-500 text-white" onClick={()=> {

						dispatch(SET_LOGIN_WINDOW(false));				
					}}>취소</button>
			</div>   
  	</div>
	);
}