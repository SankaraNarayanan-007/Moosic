const auth = {
    signup: () => {
        const u = document.getElementById('new-user').value;
        const e = document.getElementById('new-email').value;
        const p = document.getElementById('new-pass').value;
        
        if(u && e && p) {
            const userData = { password: p, email: e };
            localStorage.setItem(`moosic_user_${u}`, JSON.stringify(userData));
            alert("Account Registered! Please Login.");
            ui.toggleAuth();
        } else {
            alert("Please fill all details.");
        }
    },
    login: () => {
        const u = document.getElementById('user-id').value;
        const p = document.getElementById('user-pass').value;
        const rawData = localStorage.getItem(`moosic_user_${u}`);
        
        if(rawData) {
            const userData = JSON.parse(rawData);
            if(userData.password === p) {
                // TRACK CURRENT SESSION
                window.currentSessionUser = u; 
                
                document.getElementById('auth-overlay').classList.add('hidden');
                document.getElementById('main-app').classList.remove('hidden');
                
                document.getElementById('edit-username').value = u;
                document.getElementById('display-email').innerText = userData.email;
                
                const savedAvatar = localStorage.getItem(`moosic_avatar_${u}`);
                if(savedAvatar) document.getElementById('profile-img-display').src = savedAvatar;
                
                music.loadDefaults();
            } else {
                alert("Invalid Password");
            }
        } else {
            alert("User not found");
        }
    },
    logout: () => location.reload()
};