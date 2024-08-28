'use client'
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { SET_MENU_BTN } from  "../redux/reducers/userSlice";

export default function Mobile_btn() {

    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();

    return (
        <Image className="absolute top-[20px] left-[15px] hover:scale-110 hover:border-[2px] border-red-300 lg:hidden block"                
            onClick={() => {
                dispatch(SET_MENU_BTN(!user.menu));
                console.log(user.menu)}
            }
                src="/hamburger.svg"
                width="40"
                height="40"
                alt="menu_button"
            />
    )
}