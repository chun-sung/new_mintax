'use client'
import { useEffect, useState } from 'react';

export default function Subscribe_btn() {
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
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: 'BG5Ltcz-otKeKnTqo0rScq1oqFFjLQyeL0FkmYE8aRUK94TWupl89PzMnhS0eQJCQTgq42ZYW_MVOWgXt9NOFcQ',
      });

      // 구독 정보를 서버로 전송
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
        body: JSON.stringify(subscription),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(result)
      setIsSubscribed(false);
      alert('구독이 취소되었습니다.');
    }
  };

  return (
    <>
      { isSubscribed !== true ? 
        <button onClick={subscribeUser} disabled={isSubscribed}>   
          <img src='/bell_off.png' 
            className='inline bottom-[236px] lg:bottom-[-1px] right-[98px] lg:right-[0px] px-3 lg:px-1
            lg:inline lg:mb-[2px] w-[47px] lg:w-[25px] h-[25px] lg:h-[25px] border-[1px] border-gray-400 p-1 rounded-xl ml-[15px] bg-red-100 hover:bg-blue-300' />
            <span className='inline ml-[8px] lg:hidden text-sm'>:Notice </span>
        </button>
        : <button onClick={()=> { unsubscribeUser(); }}>
          {/* <span className='left-[200px] top-[462px] lg:hidden text-sm'>:Notice </span> */}
            <img src='/bell_on.png'
              className='inline bottom-[236px] lg:bottom-[-1px] right-[98px] lg:right-[0px] px-3.5 lg:px-1
              lg:inline lg:mb-[2px] w-[47px] lg:w-[25px] h-[25px] lg:h-[25px] border-[1px] border-gray-400 p-1 rounded-xl ml-[25px] bg-red-100 hover:bg-blue-300' />            
          </button>
      }        
    </>
  );
}