export async function POST(req, res) {
    try {
      if (req.method === 'POST') {
        // 서버에 구독 취소를 처리할 코드 (옵션)
        const subscription = req.body;
    
        // 필요하다면 구독 취소 정보를 저장하거나 처리하는 로직을 추가할 수 있습니다.
  
  
        return new Response(JSON.stringify({ message: '구독 취소 완료' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
  
  
      } else {
        return new Response(JSON.stringify({ message: 'Method not allowed' }), {
          status: 405,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    } catch (err) {
      console.log(err)
    }
  }
  