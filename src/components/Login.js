'use client'
import { useDispatch, useSelector } from "react-redux";
import { SET_LOGIN_WINDOW } from  "../redux/reducers/userSlice";

export default function Login({mode}) {

	const { user } = useSelector(state => state.user);
	const dispatch = useDispatch();

  return (
		<div className={ user.login !== true ? 'hidden' : mode == 'lightMode' ? "absolute border-stone-400 border-[1px] bg-white  w-[320px] lg:w-[380px] lg:mt-10 top-[140px] lg:top-[200px] p-5 h-58 lg:h-58 shadow-2xl z-10 rounded left-[50%] translate-x-[-50%]"
			: "absolute border-stone-600 border-[1px] bg-gray-700 w-[320px] lg:w-[380px] lg:mt-10 top-[140px] lg:top-[200px] p-5 h-58 lg:h-58 shadow-2xl z-10 rounded left-[50%] translate-x-[-50%]"
		}>
			<div className="text-center mb-2">                   
					<span className="text-md text-black">Welcome to MinTax</span>
			</div>
			<div className="lg:ml-[-28px] lg:w-96 mb-3 text-center">   
					<form>
							<div className="relative sm:mb-0 flex-grow w-full mb-2 ml-[-9px] lg:ml-[-2px]">
									<label htmlFor="full-name" className="leading-7 text-[12px] text-gray-400 mr-2">ID </label>
									<input type="text" id="full-name" name="user_id" className="w-52 h-9 bg-gray-200 bg-opacity-50 rounded border border-gray-400 focus:border-indigo-100 focus:ring-2 focus:ring-indigo-400 focus:bg-transparent text-md outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" 
									/>
							</div>
							<div className="relative sm:mb-0 flex-grow w-full mt-2 ml-[-13px] lg:ml-[-5px]">
									<label htmlFor="name" className="leading-7 text-[12px] text-gray-400 mr-2">PW </label>
									<input type="password" id="name" name="password" className="w-52 h-9 bg-gray-200 bg-opacity-50 ml-[0.5px] rounded border border-gray-400 focus:border-indigo-100 focus:ring-2 focus:ring-indigo-400 focus:bg-transparent text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" 
										onKeyUp={()=>{ window.event.keyCode === 13 ? loginEnter() : null }}
									/>
							</div>
					</form>
			</div>
			<div className="mt-2 ml-1 text-center text-sm">
					<button className="p-1.5 px-4 shadow rounded mr-2 bg-blue-400 hover:bg-blue-500 text-white" onClick={()=> { 
						return loginEnter()
					}}>확인</button>

					<button className="p-1.5 px-4 shadow rounded bg-red-400 hover:bg-red-500 text-white" onClick={()=> {
							dispatch(SET_LOGIN_WINDOW(false))
					}}>취소</button>
			</div>   
  	</div>
	);
}