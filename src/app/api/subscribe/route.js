import webpush from 'web-push';



// export const config = {
//   runtime: 'edge', // Edge 런타임을 사용하여 빠른 응답 제공
// };



// VAPID 키 설정 (환경 변수로 관리)
// const publicVapidKey = process.env.VAPID_PUBLIC_KEY;
// const privateVapidKey = process.env.VAPID_PRIVATE_KEY;



webpush.setVapidDetails(
  'mailto:example@yourdomain.org', 
  'BG5Ltcz-otKeKnTqo0rScq1oqFFjLQyeL0FkmYE8aRUK94TWupl89PzMnhS0eQJCQTgq42ZYW_MVOWgXt9NOFcQ', 
  'autDzOsAfFXctxO5pg_pC-xuJcLf7aj3-qZKtl_N508'
);



export async function POST(req) {
  try {
    const subscription = await req.json();



    // 푸시 메시지 페이로드 생성
    const payload = JSON.stringify({
      title: '구독 완료',
      body: '구독이 완료되었습니다!',
    });



    // 즉시 푸시 알림 전송
    await webpush.sendNotification(subscription, payload);



    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error sending notification:', error);
    return new Response(JSON.stringify({ error: 'Error sending notification' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}