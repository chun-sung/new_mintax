'use client'
import { useDispatch, useSelector } from "react-redux";
import { SET_MENU_BTN } from  "../redux/reducers/userSlice";

export default function Modal () {

    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch()

    return (<>

    {/* 모달 효과 */}
        <div className={ user.menu == true ? `absolute bg-neutral-700 w-full h-full opacity-70 z-10` : null} onClick={()=>dispatch(SET_MENU_BTN(false))}></div>        
        <div className={ user.login == true ? `absolute bg-neutral-700 w-full h-full opacity-70 z-10` : null} 
            // onClick={()=>dispatch(SET_LOGIN_WINDOW(false))}
        ></div>   
        <div className={ user.member_panel == true ? `absolute bg-neutral-700 w-full h-full opacity-70 z-10` : null} 
            // onClick={()=>dispatch(SET_MEMBER_PANEL(false))}
        ></div>   
    </>)
}