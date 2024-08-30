'use client'
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { SET_LOGIN_WINDOW, SET_MEMBER_PANEL, SET_MENU_BTN } from  "../redux/reducers/userSlice";
import { useEffect, useState } from "react";


export default function Mobile_btn({mode}) {

	const { user } = useSelector(state => state.user);
	const dispatch = useDispatch();	

	return (<>
		{ mode == 'darkMode' ?
				<Image className="absolute top-[20px] left-[15px] hover:scale-110 hover:border-[2px] border-red-300 lg:hidden block"                
					onClick={() => {
							dispatch(SET_MENU_BTN(!user.menu));
							dispatch(SET_LOGIN_WINDOW(false));
							dispatch(SET_MEMBER_PANEL(false));
					}}
							src="/hamburger_white.svg"
							width="40"
							height="40"
							alt="menu_button"
					/>
				:
					<Image className="absolute top-[20px] left-[15px] hover:scale-110 hover:border-[2px] border-red-300 lg:hidden block"                
						onClick={() => {
								dispatch(SET_MENU_BTN(!user.menu));
								dispatch(SET_LOGIN_WINDOW(false));
								dispatch(SET_MEMBER_PANEL(false));
						}}
								src="/hamburger.svg"
								width="40"
								height="40"
								alt="menu_button"
					/>

		}
	</>)
}