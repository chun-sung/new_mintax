'use client';
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { SET_MEMBER_PANEL} from "../redux/reducers/userSlice"
import clsx from "clsx";

export default function MemPanel({mode}) {
    
	const { user } = useSelector((state) => state.user)    
	const [user_id, setUserId] = useState('')
	const [email, setEmail] = useState('')
	const [nickName, setNickName] = useState('')
	const [password, setPassword] = useState('')
	const [pwCheck, setPwCheck] = useState('')   
	const dispatch = useDispatch()
    
  return <>
    {/* 회원 가입 패널 */}
    { user?.member_panel == true ? 
			<div className="relative m-auto w-[320px] lg:w-[420px]">
			<div className={ mode?.value == 'lightMode' ? "absolute border-stone-400 border-[1px] bg-white w-[320px] lg:w-[380px] pt-4 pb-6 lg:mt-7 lg:left-[20px] top-[70px] lg:top-[90px] lg:p-5 h-180 shadow-2xl z-50 rounded"
					: "absolute border-stone-600 border-[1px] bg-gray-300 w-[320px] lg:w-[380px] pt-4 pb-6 lg:mt-7 lg:left-[20px] top-[70px] lg:top-[90px] lg:p-5 h-180 shadow-2xl z-50 rounded"
			}>
					<div className="text-center mb-2">
							{/* <span>전화번호 입력 후 확인을 눌러주세요</span><br /> */}
							<span className={ mode?.value == 'lightMode' ?	"text-md ml-[0px] lg:ml-[0px] text-black stop-dragging"
								: "text-md ml-[0px] lg:ml-[0px] text-gray-400 stop-dragging"
							}>회원 가입</span>
					</div>
					<div className="lg:ml-[20px] lg:w-96 mb-3">   
							<form>
									<div className="relative sm:mb-0 flex-grow w-full mb-2 ml-[30px] lg:ml-[20px]">
											<label htmlFor="id" className="leading-7 text-[12px] text-gray-400 mr-4">ID</label>
											<input autoComplete="off" type="text" id="id" name="id" 
												className={clsx("w-52 h-9 bg-gray-200 bg-opacity-40 rounded border border-gray-400 focus:border-indigo-100 focus:ring-2 focus:ring-indigo-400 focus:bg-transparent text-base outline-none text-gray-500 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out",
													{"text-white": mode === "darkMode"})}
													onChange={(e) => setUserId(e.target.value)} 
											/>
									</div>
									<div className="relative sm:mb-0 flex-grow w-full mb-2 mt-2 ml-[12px] lg:ml-[2px]">
											<label htmlFor="id" className="leading-7 text-[12px] text-gray-400 mr-4">Email</label>
											<input autoComplete="off" type="text" id="email" name="email" 
												className={clsx("w-52 h-9 bg-gray-200 bg-opacity-40 rounded border border-gray-400 focus:border-indigo-100 focus:ring-2 focus:ring-indigo-400 focus:bg-transparent text-base outline-none text-gray-500 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out",
													{"text-white": mode === "darkMode"})}
													onChange={(e) => setEmail(e.target.value)} 
											/>
									</div>
									<div className="relative sm:mb-0 flex-grow w-full mt-2 ml-[22px] lg:ml-[8px]">
											<label htmlFor="nickName" className="leading-7 text-[12px] text-gray-400 mr-4">별칭</label>
											<input autoComplete="off" type="text" id="nickName" name="nickName" 
												className={clsx("w-52 h-9 bg-gray-200 bg-opacity-40 rounded border border-gray-400 focus:border-indigo-100 focus:ring-2 focus:ring-indigo-400 focus:bg-transparent text-base outline-none text-gray-500 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out",
													{'text-white': mode === 'darkMode'})}
													onChange={(e) => setNickName(e.target.value)}
											/>
									</div>
									<div className="relative sm:mb-0 flex-grow w-full mt-2 ml-[9px] lg:ml-[-7px]">
											<label htmlFor="pw" className="leading-7 text-[12px] text-gray-400 mr-2">비밀번호</label>
											<input autoComplete="off" type="password" id="pw" name="password" 
												className={clsx("w-52 h-9 bg-gray-200 bg-opacity-40 rounded border border-gray-400 focus:border-indigo-100 focus:ring-2 focus:ring-indigo-400 focus:bg-transparent text-base outline-none text-gray-500 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out",
													{'text-white' : mode?.value === 'darkMode'})}
													onChange={(e) => setPassword(e.target.value)}
											/>
									</div>
									<div className="relative sm:mb-0 flex-grow w-full mt-2 ml-[9px] lg:ml-[-7px]">
											<label htmlFor="name2" className="leading-7 text-[12px] text-gray-400 mr-2">비번확인</label>
											<input autoComplete="off" type="password" id="name2" name="password2" 
												className={clsx("w-52 h-9 bg-gray-200 bg-opacity-40 rounded border border-gray-400 focus:border-indigo-100 focus:ring-2 focus:ring-indigo-400 focus:bg-transparent text-base outline-none text-gray-500 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out",
													{'text-white' : mode?.value === 'darkMode'}) }
													onChange={(e) => setPwCheck(e.target.value)}
											/>
									</div>
							</form>
					</div>
					<div className="mt-2 ml-[10px] lg:ml-[5px] text-center text-sm">
							<button className="p-1.5 px-4 shadow rounded mr-2 bg-blue-400 hover:bg-blue-500 text-white" 
							onClick={()=> {

									if(user_id.length == 0) {                        
											alert('ID를 입력하세요')
											return 
									} else if(password.length == 0) {
											alert('비밀번호를 입력하세요')
											return
									} else if(password !== pwCheck) {
											alert('비밀번호가 일치하지 않습니다.')   
											return                                             
									}
									let user = {
											user_id,
											nickName,
											password, 
											email
									}
									fetch('https://www.n-mintax.store/api/member', {
											method: 'POST',
											headers: {'Content-Type': 'application/json'},
											body: JSON.stringify(user)
									})
									.then((res) => {										
											return res.json();
									})
									.then(data => {
											if(data.msg == 'success') {
													alert('회원 가입이 완료되었습니다')   
													dispatch(SET_MEMBER_PANEL(false))   													
											} else if(data.msg == 'id_fail') {
													alert('이미 사용중인 아이디 입니다.')
											}
									}).catch(err => console.log(err))}}
							>확인</button>
							<button className="p-1.5 px-4 rounded shadow bg-red-400 hover:bg-red-500 text-white" 
							
									onClick={()=> dispatch(SET_MEMBER_PANEL(false))}
							>취소</button>
					</div>
			</div> 
    </div>  
    : null 
	}   
</>
}