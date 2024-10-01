'use client'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function Subscribe_btn() {
  
  const { user } = useSelector(state => state.user);  
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker.register('/sw.js').then(registration => {
        registration.pushManager.getSubscription().then(subscription => {
          setIsSubscribed(!!subscription);
        });
      });
    }
  }, []);

  const subscribeUser = async () => {
    
    if(user.user_id == null) {
      alert('로그인하기 바랍니다.')
      
    } else {

        if ('serviceWorker' in navigator && 'PushManager' in window) {
          const registration = await navigator.serviceWorker.ready;
          const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: 'BG5Ltcz-otKeKnTqo0rScq1oqFFjLQyeL0FkmYE8aRUK94TWupl89PzMnhS0eQJCQTgq42ZYW_MVOWgXt9NOFcQ',
          });
          console.log('섭스크립션 : ',subscription);

        // 구독 정보를 서버로 전송
        await fetch('/api/subscribe', {
          method: 'POST',
          body: JSON.stringify({user_id : user?.user_id}),
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        await fetch('/api/subscribe', {
          method: 'POST',
          body: JSON.stringify(subscription),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        setIsSubscribed(true);
        alert('구독이 되었습니다.');
      }

    }
  };

  const unsubscribeUser = async () => {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription({
      userVisibleOnly: true,
      applicationServerKey: 'BG5Ltcz-otKeKnTqo0rScq1oqFFjLQyeL0FkmYE8aRUK94TWupl89PzMnhS0eQJCQTgq42ZYW_MVOWgXt9NOFcQ',
    });
    
    if (subscription) {
      await subscription.unsubscribe();


      // 구독 취소 정보를 서버로 전송 (선택 사항)
     let result = await fetch('/api/unsubscribe', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(subscription)
      });
      console.log(result)
      setIsSubscribed(false);
      alert('구독이 취소되었습니다.');
    }
  };

  return (
    <>
      { isSubscribed !== true ? 
        <button onClick={isSubscribed !== true? subscribeUser : user.user_id == null ? alert('로그인하기 바랍니다.2') : null} disabled={isSubscribed}>   
          <img src='/bell_off.png' alt="bell_off"
            className='inline bottom-[236px] lg:bottom-[-1px] right-[98px] lg:right-[0px] px-3.5 lg:px-1
            lg:inline lg:mb-[2px] w-[47px] lg:w-[25px] h-[25px] lg:h-[23px] border-[1px] border-gray-300 p-1 rounded-xl ml-[10px] lg:ml-[23px] bg-white hover:bg-blue-300' />
            <span className='inline ml-[8px] lg:hidden text-sm'>:Notice </span>
        </button>
        : user.user_id !== null ? 
          <button onClick={()=> { unsubscribeUser(); }}>
            <img src='/bell_on.png' alt="bell_on"
              className='inline bottom-[236px] lg:bottom-[-1px] right-[98px] lg:right-[0px] px-3.5 lg:px-1
              lg:inline lg:mb-[2px] w-[47px] lg:w-[25px] h-[25px] lg:h-[23px] border-[1px] border-gray-300 p-1 rounded-xl ml-[10px] lg:ml-[23px] bg-white hover:bg-blue-300' />            
              <span className='ml-[8px] lg:hidden text-sm'>:Notice </span>
          </button>
        : <button onClick={()=> alert('로그인하기 바랍니다.')}>   
            <img src='/bell_off.png' alt="bell-off"
              className='inline bottom-[236px] lg:bottom-[-1px] right-[98px] lg:right-[0px] px-3.5 lg:px-1
              lg:inline lg:mb-[2px] w-[47px] lg:w-[25px] h-[25px] lg:h-[23px] border-[1px] border-gray-300 p-1 rounded-xl ml-[10px] lg:ml-[23px] bg-white hover:bg-blue-300' />
              <span className='inline ml-[8px] lg:hidden text-sm'>:Notice </span>
          </button>
      }        
    </>
  );
}