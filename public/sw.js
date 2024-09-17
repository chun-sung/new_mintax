self.addEventListener('push', (event) => {
    const data = event.data.json();
    console.log('Push received:', data);
  
  
    const options = {
      body: data.body,
      icon: '/logo192.png', // 아이콘 경로
      badge: '/Alarm.png', // 배지 경로
    };
  
  
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
});